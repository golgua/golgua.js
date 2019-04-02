import { TypesBase } from './TypesBase';

/**
 * @description Super class of Primitive type
 */
class PrimeTypes extends TypesBase {}

/**
 * @description Types Class to check for Boolean type
 */
export class StringTypes extends PrimeTypes {
  /**
   * @description Check type based on isTypes
   * @param {Any} value
   * @return {Boolean}
   */
  __check__(value) {
    return typeof value === 'string';
  }
}

/**
 * @description Types Class to check for Boolean type
 */
export class NumberTypes extends PrimeTypes {
  /**
   * @description Check type based on isTypes
   * @param {Any} value
   * @return {Boolean}
   */
  __check__(value) {
    return typeof value === 'number';
  }
}

/**
 * @description Types Class to check for Boolean type
 */
export class BooleanTypes extends PrimeTypes {
  /**
   * @description Check type based on isTypes
   * @param {Any} value
   * @return {Boolean}
   */
  __check__(value) {
    return typeof value === 'boolean';
  }
}
