import * as $$ from '../order/order';
import { TypeBase } from '../types/TypeBase';

/**
 * @description State Super Class
 */
export class State {
  /**
   * @description State constructor
   */
  constructor() {
    this.__id = null;
    this.__default_value = null;
    this.__state = null;
    this.state = null;
  }

  /**
   * @description lifecycle - Called when State Class is instantiated
   */
  init() {}

  /**
   * @description lifecycle - Called when maker's update method is executed
   * @param {Any} props Value passed in maker's update method
   * @return {Any}
   */
  willUpdate(props) {
    return props;
  }

  /**
   * @description lifecycle - Called when state update is complete
   */
  didUpdate() {}

  /**
   * @description lifecycle - Called when state update failed
   * @param {Any} value Value when update failed
   * @param {Any} key Key when update failed
   * @param {Any} props Value returned by willUpdate method
   */
  updatedCatch(value, key, props) {}

  /**
   * @description return default value
   * @return {Any}
   */
  defaultValue() {
    if (this.__default_value !== null) return $$.clone(this.__default_value);

    const types = this.types;

    if (types instanceof TypeBase) {
      this.__default_value = types.defaultValue();
    } else {
      this.__default_value = {};

      for (const key in types) {
        this.__default_value[key] = types[key].defaultValue();
      }
    }

    return $$.clone(this.__defaultValue);
  }
}
