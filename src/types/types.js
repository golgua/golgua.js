import { StringTypes, NumberTypes, BooleanTypes } from './PrimeTypes';
import { ObjectTypes, ArrayTypes } from './ObjectLikeTypes';

export const Types = {
  string: (property = {}) =>
    new StringTypes(Object.assign(property, { kind: 'string' })),
  number: (property = {}) =>
    new NumberTypes(Object.assign(property, { kind: 'number' })),
  boolean: (property = {}) =>
    new BooleanTypes(Object.assign(property, { kind: 'boolean' })),
  object: (property = {}) =>
    new ObjectTypes(Object.assign(property, { kind: 'object' })),
  array: (property = {}) =>
    new ArrayTypes(Object.assign(property, { kind: 'array' })),
};
