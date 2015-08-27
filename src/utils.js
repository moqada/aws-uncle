export function env(name) {
  return process.env[`AWS_UNCLE_${name}`];
}

export default {env};
