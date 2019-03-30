import * as $$ from '../funcs/Funcs';

/**
 * @description Golgua Store Class
 */
export class GolguaDataStore {
  /**
   * @param {GolguaTypes} types Golgua Types Instance
   * @param {Any} defaultValue default value
   */
  constructor(types) {
    this.types = types;
    this.default_value = types.defaultValue();
    this.state = types.defaultValue();
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
