import * as $$ from '../funcs/Funcs';
import { GolguaError } from '../golgua/GolguaError';
import { GolguaTypesStore } from '../store/TypesStore';

/**
 * @description Types Super Class
 */
export class TypesBase {
  /**
   * @param {Object} property types property
   */
  constructor(property) {
    this.__id__ = $$.getUniqueId();
    this.__types__ = property.types;
    this.__kind__ = property.kind;
    this.__name__ = property.name;
    this.__empty__ = !!property.empty;
    this.__default__ = property.default || null;

    this.__dispatch__ =
      typeof property.dispatch === 'function' ? property.dispatch : null;
    this.__error__ =
      typeof property.error === 'function' ? property.error : null;

    if (this.__dispatch__ && !this.__name__) {
      throw new GolguaError('name is required to set dispatch');
    }
  }

  /**
   * @description check function interface
   */
  __check__() {}

  /**
   * @description dispatch data
   * @param {Any} value udpate value
   * @return {Boolean}
   */
  update(value) {
    if (this.__check__(value)) {
      if (!this.__dispatch__) {
        throw new GolguaError('The dispatch function has not been set.');
      }

      const state = GolguaTypesStore.Store[this.__name__];
      const data = this.__dispatch__($$.clone(state), value);

      GolguaTypesStore.updateStoreValue(this.__name__, data);

      return true;
    }

    if (this.__error__) this.__error__(value);

    return false;
  }

  /**
   * @description return default value
   * @return {Any}
   */
  defaultValue() {
    return $$.clone(this.__default__);
  }

  /**
   * @description return state value
   * @return {Any}
   */
  getState() {
    return $$.clone(GolguaTypesStore.Store[this.__name__]);
  }
}
