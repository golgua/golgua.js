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
    if (
      !$$.isObject(value) ||
      Object.keys(value).length !== Object.keys(this.__types__).length
    ) {
      return { success: false, data: value };
    }

    if ($$.isEmpty(value) && this.__empty) {
      return { success: true, data: {} };
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

  /**
   * @description return default value
   * @return {Object}
   */
  defaultValue() {
    if (this.__default_value__) return $$.clone(this.__default_value__);

    const default_value = {};

    for (const key in this.__types__) {
      default_value[key] = this.__types__[key].defaultValue();
    }

    this.__default_value__ = default_value;

    return $$.clone(this.__default_value__);
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
    if (Array.isArray(value)) {
      if ($$.isEmpty(value) && this.__empty) {
        return { success: true, data: [] };
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

    return { success: false, data: value };
  }

  /**
   * @description return default value
   * @return {Array}
   */
  defaultValue() {
    if (this.__default_value__) return $$.clone(this.__default_value__);

    const default_value = [this.__types__.defaultValue()];

    this.__default_value__ = default_value;

    return this.__default_value__;
  }
}
