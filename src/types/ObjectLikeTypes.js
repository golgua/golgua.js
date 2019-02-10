import * as $$ from '../order/order';
import { TypeBase } from './TypeBase';
import { throwError } from '../alert/alert';

/**
 * @description Super class of ObjectLike type
 */
export class ObjectLikeTypes extends TypeBase {
  /**
   * @description This function checks the value passed in the passed 'types'.
   * @param {Any} value Value to check
   * @param {TypesBase} types Types instance
   * @return {Boolean}
   */
  checkByTypes(value, types) {
    if (types.check(value)) {
      if (this.__pattern) return this.__pattern(value);
      else return true;
    }

    return false;
  }
}

/**
 * @description Types Class to check for Object type
 */
export class ObjectTypes extends ObjectLikeTypes {
  /**
   * @param {Object} property types property
   */
  constructor(property) {
    super(property);

    if (
      $$.isObject(this.__types) &&
      !$$.isEmpty(this.__types) &&
      !(this.__types instanceof TypeBase)
    ) {
      for (const key in this.__types) {
        if (!(this.__types[key] instanceof TypeBase)) {
          throwError('ObjectTypes.typesMember', key);
        }
      }
    } else {
      throwError('ObjectTypes.types');
    }
  }

  /**
   * @description Define type check function
   * @param {Any} value
   * @return {Boolean}
   */
  isTypes(value) {
    return $$.isObject(value);
  }

  /**
   * @description Check type based on isTypes
   * @param {any} value check value
   * @return {Boolean}
   */
  check(value) {
    if (this.__nullable && value === null) return true;

    if (this.isTypes(value)) {
      if ($$.isEmpty(value)) return this.__empty;

      for (const key in this.__types) {
        if (!this.checkByTypes(value[key], this.__types[key])) return false;
      }

      return true;
    }

    throwError('Types.check', this, value);
  }
}

/**
 * @description Types Class to check for Array type
 */
export class ArrayTypes extends ObjectLikeTypes {
  /**
   * @param {Object} property types property
   */
  constructor(property) {
    super(property);

    if (!(this.__types instanceof TypeBase)) {
      throwError('ArrayTypes.types');
    }
  }

  /**
   * @description Define type check function
   * @param {Any} value
   * @return {Boolean}
   */
  isTypes(value) {
    return Array.isArray(value);
  }

  /**
   * @description Check type based on isTypes
   * @param {any} value check value
   * @return {Boolean}
   */
  check(value) {
    if (this.__nullable && value === null) return true;

    if (this.isTypes(value)) {
      if ($$.isEmpty(value)) return this.__empty;

      for (const i in value) {
        if (!this.checkByTypes(value[i], this.__types)) return false;
      }

      return true;
    }

    throwError('Types.check', this);
  }
}
