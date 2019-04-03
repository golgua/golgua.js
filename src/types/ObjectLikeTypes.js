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
        if (
          typeof this.__types__[key] !== 'function' &&
          !(this.__types__[key] instanceof TypesBase)
        ) {
          throw new GolguaError(
            'Only functions or GolguaTypes can be set in the types property of ObjectTypes.'
          );
        }
      }
    } else {
      throw new GolguaError(
        'Only plain Object can be set in types property of ObjectTypes.'
      );
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
      const type = this.__types__[key];

      if (typeof type === 'function') {
        if (!type(value[key])) return false;
      } else if (!type.__check__(value[key])) {
        return false;
      }
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

    if (
      typeof this.__types__ !== 'function' &&
      !(this.__types__ instanceof TypesBase)
    ) {
      if ($$.isObject(this.__types__)) {
        this.__types__ = new ObjectTypes({ types: this.__types__ });
      } else {
        throw new GolguaError(
          'The types property of "ArrayTypes" can be set to function type or Golgua Types or Object type.'
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

    let type = this.__types__;

    if (!(typeof type === 'function')) {
      type = type.__check__.bind(type);
    }

    for (const i in value) {
      if (!type(value[i])) return false;
    }

    return true;
  }
}
