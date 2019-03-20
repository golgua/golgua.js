import * as $$ from '../funcs/Funcs';

/**
 * @description Types Super Class
 */
export class TypesBase {
  /**
   * @param {Object} param types property
   */
  constructor({ default_value = null, empty, types, proc, kind }) {
    this.__id__ = $$.getUniqueId();
    this.__default_value__ = $$.clone(default_value);
    this.__proc__ = typeof proc === 'function' ? proc : null;
    this.__empty__ = !!empty;
    this.__types__ = types;
    this.__kind__ = kind;
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
    return $$.clone(this.__default_value__);
  }
}
