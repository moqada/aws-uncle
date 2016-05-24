import dotenv from 'dotenv';

import Uncle from './Uncle';

/* eslint-disable node/no-unpublished-import, node/no-missing-import */
import configs from './configs.json';

/* eslint-enable */

dotenv.load();


/**
 * Handler for AWS Lambda
 *
 * @param {Event} event event at AWS
 * @param {Object} context context at AWS
 */
export function handler(event, context) {
  console.log('env: ', process.env);
  const uncle = new Uncle(configs);
  uncle.scold().then(() => context.done(null, 'done'));
}
