import * as $$ from '../funcs/Funcs';
import { TypesBase } from './TypesBase';

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
          throw new Error('ObjectTypes.typesMember');
        }
      }
    } else {
      throw new Error('ObjectTypes.types');
    }
  }

  /**
   * @description Check type based on isTypes
   * @param {any} value check value
   * @return {Boolean}
   */
  check(value) {
    if (!$$.isObject(value)) return { success: false, data: value };
    if ($$.isEmpty(value)) return { success: this.__empty__, data: {} };
    if ($$.size(value) !== $$.size(this.__types__)) {
      return { success: false, data: value };
    }

    let data = {};

    for (const key in this.__types__) {
      const types = this.__types__[key];
      const result = types.check(value[key]);

      if (!result.success) return { success: false, data: value };

      data[key] = result.data;
    }

    data = this.__proc__ ? this.__proc__(data) : data;

    return { success: true, data };
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
        throw new Error(
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
  check(value) {
    if (
      !Array.isArray(value) || // not array
      ($$.isEmpty(value) && !this.__empty__) || // bad empty
      $$.size(value) !== $$.size(this.__types__) // failed type
    ) {
      return { success: false, data: value };
    }

    let data = [];

    for (const i in value) {
      const result = this.__types__.check(value[i]);

      if (!result.success) return { success: false, data: value };

      data.push(result.data);
    }

    data = this.__proc__ ? this.__proc__(data) : data;

    return { success: true, data };
  }
}
