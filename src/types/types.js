import { StringTypes, NumberTypes, BooleanTypes } from './PrimeTypes';
import { ObjectTypes, ArrayTypes } from './ObjectLikeTypes';

export const Types = {
  string: (property = {}) => new StringTypes(property),
  number: (property = {}) => new NumberTypes(property),
  boolean: (property = {}) => new BooleanTypes(property),
  object: (property = {}) => new ObjectTypes(property),
  array: (property = {}) => new ArrayTypes(property),
};
