import { TypeBase } from './TypeBase';
import { throwError } from '../alert/alert';

/**
 * @description Super class of Primitive type
 */
class PrimeTypes extends TypeBase {
  /**
   * @description Check type based on isTypes
   * @param {any} value check value
   * @return {Boolean}
   */
  check(value) {
    if (this.__nullable && value === null) return true;

    if (this.isTypes(value)) {
      if (this.__pattern) return this.__pattern(value);
      else return true;
    }

    throwError('Types.check', this, value);
  }
}

/**
 * @description Types Class to check for Boolean type
 */
export class StringTypes extends PrimeTypes {
  /**
   * @description Define type check function
   * @param {Any} value
   * @return {Boolean}
   */
  isTypes(value) {
    return typeof value === 'string';
  }
}

/**
 * @description Types Class to check for Boolean type
 */
export class NumberTypes extends PrimeTypes {
  /**
   * @description Define type check function
   * @param {Any} value
   * @return {Boolean}
   */
  isTypes(value) {
    return typeof value === 'number';
  }
}

/**
 * @description Types Class to check for Boolean type
 */
export class BooleanTypes extends PrimeTypes {
  /**
   * @description Define type check function
   * @param {Any} value
   * @return {Boolean}
   */
  isTypes(value) {
    return typeof value === 'boolean';
  }
}
