/**
 * Return Environment value that added specific prefix
 *
 * @param {string} name Environment name
 * @return {string|undefined}
 */
export function env(name) {
  return process.env[`AWS_UNCLE_${name}`];
}

export default {env};
