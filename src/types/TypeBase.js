import * as $$ from '../order/order';
import { throwError } from '../alert/alert';

/**
 * @description Types Super Class
 */
export class TypeBase {
  /**
   * @param {Object} param types property
   */
  constructor({ default_value = null, pattern, nullable, empty, types }) {
    this.__pattern = typeof pattern === 'function' ? pattern : null;
    this.__nullable = nullable === false ? false : true;
    this.__empty = !!empty;
    this.__types = types;

    try {
      if (this.check(default_value)) {
        this.__default_value = $$.clone(default_value);
      } else {
        throw new Error();
      }
    } catch (e) {
      throwError('TypeBase.default_value', this);
    }
  }

  /**
   * @description check function interface
   */
  check() {}

  /**
   * @description isTypes function interface
   */
  isTypes() {}

  /**
   * @description This function is return default value
   * @return {any}
   */
  defaultValue() {
    return $$.clone(this.__default_value);
  }
}
