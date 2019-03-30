import * as $$ from '../funcs/Funcs';

/**
 * @description Golgua Store Class
 */
export class GolguaDataStore {
  /**
   * @param {GolguaTypes} types Golgua Types Instance
   * @param {String} name store key name
   */
  constructor(types, name) {
    this.types = types;
    this.default_value = types.defaultValue();
    this.state = types.defaultValue();
    this.name = name;
  }

  /**
   * @description Reset state to the default value
   */
  reset() {
    this.state = this.default_value;
  }

  /**
   * @description update state
   * @param {any} value update value
   * @return {{ success:Boolean, data:any }}
   */
  update(value) {
    const { success, data } = this.types.check(value);

    if (success) this.state = $$.clone(data);

    return { success, data };
  }

  /**
   * @description Return store value
   * @return {Any}
   */
  getValue() {
    return $$.clone(this.state);
  }
}
