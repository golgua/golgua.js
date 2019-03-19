import * as $$ from '../funcs/Funcs';

/**
 * @description Types Super Class
 */
export class TypesBase {
  /**
   * @param {Object} param types property
   */
  constructor({ default_value = null, empty, types, proc }) {
    this.__default_value = $$.clone(default_value);
    this.__proc = typeof proc === 'function' ? proc : null;
    this.__empty = !!empty;
    this.__types = types;
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
