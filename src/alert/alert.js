import { Messages } from './messages';

const getMessage = (str, ...args) => {
  const keys = str.split('.');
  const len = keys.length - 1;

  let target = Messages;

  for (let i = 0; i < len; ++i) {
    if (target[keys[i]]) target = target[keys[i]];
    else return str;
  }

  if (!(typeof target[keys[len]] === 'function')) return str;

  return target[keys[len]](...args);
};

export const throwError = (key, ...args) => {
  throw new Error(getMessage(key, ...args));
};

export const consoleError = (key, ...args) => {
  console.error(getMessage(key, ...args));
};

export const consoleWran = (key, ...args) => {
  console.warn(getMessage(key, ...args));
};
