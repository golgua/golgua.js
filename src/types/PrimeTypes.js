import { TypesBase } from './TypesBase';

/**
 * @description Super class of Primitive type
 */
class PrimeTypes extends TypesBase {
  /**
   * @description Check type based on isTypes
   * @param {any} value check value
   * @return {Boolean}
   */
  check(value) {
    if (this.isTypes(value)) {
      const data = this.__proc ? this.__proc(value) : value;
      return { success: true, data };
    }

    return { success: false, data: value };
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
