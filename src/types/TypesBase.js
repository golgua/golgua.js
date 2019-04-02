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
    this.__empty__ = !!property.empty;
    this.__name__ = property.name;
    this.__store__ = property.store || null;

    this.__dispatch__ =
      typeof property.dispatch === 'function' ? property.dispatch : null;

    if (this.__name__) {
      GolguaTypesStore.createStore(this.__name__, this.__store__);
    }

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
   * @param {String|Null} name store name
   * @return {Boolean}
   */
  update(value, name = null) {
    if (name && name !== this.__name__) return false;

    if (this.__check__(value)) {
      if (!this.__dispatch__) return true;

      const state = GolguaTypesStore.Store[this.__name__];
      const data = this.__dispatch__(state, value);

      GolguaTypesStore.updateStoreValue(this.__name__, data);

      return true;
    }

    return false;
  }

  /**
   * @description return state value
   * @return {Any}
   */
  getState() {
    return $$.clone(GolguaTypesStore.Store[this.__name__]);
  }
}
