import * as $$ from '../funcs/Funcs';
import { TypesBase } from './TypesBase';

/**
 * @description Types Class to check for Object type
 */
export class ObjectTypes extends TypesBase {
  /**
   * @param {Object} property types property
   */
  constructor(property) {
    super(property);

    if (
      $$.isObject(this.__types) &&
      !$$.isEmpty(this.__types) &&
      !(this.__types instanceof TypesBase)
    ) {
      for (const key in this.__types) {
        if (!(this.__types[key] instanceof TypesBase)) {
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
    if (
      !$$.isObject(value) ||
      Object.keys(value).length !== Object.keys(this.__types)
    ) {
      return { success: false, data: value };
    }

    if ($$.isEmpty(value) && this.__empty) {
      return { success: true, data: {} };
    }

    for (const key in this.__types) {
      const types = this.__types[key];
      const result = types.check(value[key]);

      if (!result.success) return { success: false, data: value };
    }

    const data = this.__proc ? this.__proc(value) : value;

    return { success: true, data };
  }

  /**
   * @description return default value
   * @return {Object}
   */
  defaultValue() {
    if (this.__default_value) return $$.clone(this.__default_value);

    const default_value = {};

    for (const key in this.__types) {
      default_value[key] = this.__types[key].defaultValue();
    }

    this.__default_value = default_value;

    return $$.clone(this.__default_value);
  }
}

/**
 * @description Types Class to check for Array type
 */
export class ArrayTypes extends TypesBase {
  /**
   * @param {Object} property types property
   */
  constructor(property) {
    super(property);

    if (!(this.__types instanceof TypesBase)) {
      throw new Error(
        'The types of "ArrayTypes" must be Golgua Types Instance.'
      );
    }
  }

  /**
   * @description Check type based on isTypes
   * @param {any} value check value
   * @return {Boolean}
   */
  check(value) {
    if (Array.isArray(value)) {
      if ($$.isEmpty(value) && this.__empty) {
        return { success: true, data: [] };
      }

      for (const key in value) {
        const result = this.__types.check(value[key]);
        if (!result.success) return { success: false, data: value };
      }

      return { success: true, data: this.__proc ? this.__proc(value) : value };
    }

    return { success: false, data: value };
  }

  /**
   * @description return default value
   * @return {Array}
   */
  defaultValue() {
    if (this.__default_value) return $$.clone(this.__default_value);

    const default_value = [this.__types.defaultValue()];

    this.__default_value = default_value;

    return this.__default_value;
  }
}
