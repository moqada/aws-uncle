import dotenv from 'dotenv';

import Job from './Job';
import Uncle from './Uncle';
import {env} from './utils';
import configs from './configs.json';

dotenv.load();


/**
 * Handler for AWS Lambda
 *
 * @param {Event} event event at AWS
 * @param {Object} context context at AWS
 */
export function handler(event, context) {
  console.log('env: ', process.env);
  const job = new Job(env('JOBCTL_BUCKET_NAME'), env('JOBCTL_KEY_NAME'), {
    execInterval: env('NOTIFY_INTERVAL'),
    jobInterval: env('JOB_INTERVAL')
  });
  job.execute(event, context, ctx => {
    const uncle = new Uncle(configs);
    uncle.scold().then(() => ctx.done(null, 'done'));
  });
}
