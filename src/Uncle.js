import minimatch from 'minimatch';
import Jungle from 'node-jungle';
import utils from 'node-jungle/lib/utils';

import notifiers from './notifiers';


/**
 * Uncle
 */
export default class Uncle {

  /**
   * constructor
   *
   * @param {Object[]} configs List of Config
   */
  constructor(configs) {
    this.configs = configs;
    this.jungle = new Jungle();
  }

  /**
   * Check AWS Services
   *
   * @return {Promise}
   */
  check() {
    return Promise.all(this.configs.map(target => {
      if (this[target.type]) {
        return this[target.type](target);
      }
      return null;
    })).then(results => {
      return results.filter(result => result.names.length > 0);
    });
  }

  /**
   * Send notification when check results is unexpected
   *
   * @return {Promise}
   */
  scold() {
    return new Promise((resolve, reject) => {
      this.check().then(results => {
        if (results.length > 0) {
          const msg = this.createScoldingMessage(results);
          notifiers.hipchat(msg).catch(err => {
            reject(err);
          }).then(() => resolve(true));
        } else {
          resolve(true);
        }
      });
    });
  }

  /**
   * Return scolding message
   *
   * @param {Object[]} results List of check results
   * @return {string}
   */
  createScoldingMessage(results) {
    const list = results.map(result => {
      return `- ${result.type}: ${result.names.join(', ')}`;
    });
    return `@all hey guys, UNEXPECTED SERVERS are running!
${list.join('\n')}
http://img.tiqav.com/1Mr.jpg`;
  }

  /**
   * Exclude
   *
   * @param {Object[]} instances object list of aws-sdk response
   * @param {Object} condition condition of exclude
   * @param {Function} getter function for getting instance value
   * @return {Object[]}
   */
  exclude(instances, condition, getter) {
    return instances.filter(ins => {
      return !Object.keys(condition).some(key => {
        const con = condition[key];
        const val = getter(ins, key);
        if (val === undefined) {
          return false;
        }
        return (Array.isArray(con) ? con : [con]).some(c => minimatch(val, c));
      });
    });
  }

  /**
   * Check for Elastic Beanstalk
   *
   * @param {Object} target Config object
   * @return {Promise}
   */
  eb(target) {
    return this.jungle.eb.getEnvironments(target.filter).then(instances => {
      const names = this.exclude(instances, target.exclude, (i, key) => {
        if (key === 'name') {
          return i.EnvironmentName;
        } else if (key === 'cname') {
          return i.CNAME;
        }
        return undefined;
      }).map(i => i.EnvironmentName);
      return {type: 'EB', names};
    });
  }

  /**
   * Check for EC2
   *
   * @param {Object} target Config object
   * @return {Promise}
   */
  ec2(target) {
    return this.jungle.ec2.getInstances(target.filter).then(instances => {
      const names = this.exclude(instances, target.exclude, (i, key) => {
        if (key === 'name') {
          return utils.getTagValue(i.Tags, 'Name') || '';
        }
        return undefined;
      }).map(i => utils.getTagValue(i.Tags, 'Name') || '');
      return {type: 'EC2', names};
    });
  }

  /**
   * Check for EMR
   *
   * @param {Object} target Config object
   * @return {Promise}
   */
  emr(target) {
    return this.jungle.emr.getClusters(target.filter).then(instances => {
      const names = this.exclude(instances, target.exclude, (i, key) => {
        if (key === 'name') {
          return i.Name;
        } else if (key === 'stateName') {
          return i.Status.State;
        }
        return undefined;
      }).map(i => i.Name);
      return {type: 'EMR', names};
    });
  }

  /**
   * Check for RDS
   *
   * @param {Object} target Config object
   * @return {Promise}
   */
  rds(target) {
    return this.jungle.rds.getInstances(target.filter).then(instances => {
      const names = this.exclude(instances, target.exclude, (i, key) => {
        if (key === 'name') {
          return i.DBInstanceIdentifier;
        }
        return undefined;
      }).map(i => i.DBInstanceIdentifier);
      return {type: 'RDS', names};
    });
  }
}
