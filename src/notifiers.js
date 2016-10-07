import Hipchatter from 'hipchatter';

import {env} from './utils';


/**
 * Notify to HipChat
 *
 * @param {string} message notification message
 * @return {Promise}
 */
export function hipchat(message) {
  return new Promise((resolve, reject) => {
    new Hipchatter(env('HIPCHAT_AUTH_TOKEN')).notify(env('HIPCHAT_ROOM_ID'), {
      color: 'red',
      message,
      message_format: 'text',
      notify: true,
      token: env('HIPCHAT_ROOM_TOKEN')
    }, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

export default {hipchat};
