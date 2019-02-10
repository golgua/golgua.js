const IDs = {};

export const getUniqueId = () => {
  let id = '';

  do {
    id = `${new Date().getTime().toString(16)}${Math.random().toString(16)}`;
  } while (IDs[id]);

  IDs[id] = true;

  return id;
};

export const clone = value => {
  if (isPrimitive(value)) return value;

  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value);
  if (value instanceof Number) return new Number(value); // eslint-disable-line
  if (value instanceof String) return new String(value); // eslint-disable-line

  if (typeof value === 'object') {
    const copy = new value.constructor();

    for (const key in value) {
      copy[key] = clone(value[key]);
    }

    return copy;
  }

  return value;
};

export const size = value => {
  try {
    return Object.keys(value).length;
  } catch (e) {
    return 0;
  }
};

export const hasKey = (value, key) => {
  try {
    return key in value;
  } catch (e) {
    return false;
  }
};

export const isObject = value => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

export const isPrimitive = value => {
  if (!value) return true;

  switch (typeof value) {
    case 'string':
    case 'number':
    case 'symbol':
    case 'boolean':
      return true;
    default:
      return false;
  }
};

export const isEmpty = value => {
  try {
    return Object.keys(value).length === 0;
  } catch (e) {
    return value === null;
  }
};
