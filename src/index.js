import dotenv from 'dotenv';

import Uncle from './Uncle';
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
  const uncle = new Uncle(configs);
  uncle.scold().then(() => context.done(null, 'done'));
}
