import * as $$ from '../funcs/Funcs';
import { TypesBase } from './TypesBase';
import { GolguaError } from '../golgua/GolguaError';

/**
 * @description Super Class
 */
export class ObjectLikeTypes extends TypesBase {}

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
      $$.isObject(this.__types__) &&
      !$$.isEmpty(this.__types__) &&
      !(this.__types__ instanceof TypesBase)
    ) {
      for (const key in this.__types__) {
        if (!(this.__types__[key] instanceof TypesBase)) {
          throw new GolguaError();
        }
      }
    } else {
      throw new GolguaError();
    }
  }

  /**
   * @description Check type based on isTypes
   * @param {any} value check value
   * @return {Boolean}
   */
  __check__(value) {
    if (!$$.isObject(value)) return false;
    if ($$.isEmpty(value)) return this.__empty__;
    if ($$.size(value) !== $$.size(this.__types__)) return false;

    for (const key in this.__types__) {
      if (!this.__types__[key].__check__(value[key])) return false;
    }

    return true;
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

    if (!(this.__types__ instanceof TypesBase)) {
      if ($$.isObject(this.__types__)) {
        this.__types__ = new ObjectTypes({ types: this.__types__ });
      } else {
        throw new GolguaError(
          'The types of "ArrayTypes" must be Golgua Types Instance.'
        );
      }
    }
  }

  /**
   * @description Check type based on isTypes
   * @param {any} value check value
   * @return {Boolean}
   */
  __check__(value) {
    if (!Array.isArray(value) || ($$.isEmpty(value) && !this.__empty__)) {
      return false;
    }

    for (const i in value) {
      if (!this.__types__.__check__(value[i])) return false;
    }

    return true;
  }
}
