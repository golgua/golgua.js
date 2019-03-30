import { GolguaDataStore } from './DataStore';

/**
 * @description Store Class managing Golgua Types
 */
class TypesStore {
  /**
   * @description Initialize
   */
  constructor() {
    this.Stores = {};
    this.callback = null;
    this.names = [];
  }

  /**
   * @description Register Golgua Types to subscribe
   * @param {GolguaTypes} types Golgua Types Instance
   * @param {String} name Store key name
   */
  setTypes(types, name) {
    const store = this.Stores[types.__kind__] || {};
    store[types.__id__] = new GolguaDataStore(types, name);
    this.Stores[types.__kind__] = store;
    this.names.push(name);
  }

  /**
   * @description
   * @param {GolguaTypes} types Golgua Types Instance
   * @return {GolguaDataStore}
   */
  getTypes(types) {
    const kind_store = this.Stores[types.__kind__];
    return kind_store ? kind_store[types.__id__] : null;
  }

  /**
   * @description Set callback to be executed at Store update
   * @param {Function} cb callback
   */
  setCallback(cb) {
    this.callback = cb;
  }

  /**
   * @description update store value
   * @param {any} value update value
   * @return {{ success: Boolean, data:any }}
   */
  updateAllTypes(value) {
    const kind = typeof value;
    const kind_store = this.Stores[kind];

    if (!kind_store) return { success: false, data: value };

    for (const type_id in kind_store) {
      const { success, data } = kind_store[type_id].update(value);

      if (success) {
        if (this.callback) this.callback(this.getStoreValue());
        return { success: true, data };
      }
    }

    return { success: false, data: value };
  }

  /**
   * @description Update passed types
   * @param {GolguaTypes} types Golgua Types Instance
   * @param {any} value update value
   * @return {{ success: Boolean, data:any }}
   */
  updateTypes(types, value) {
    const kind = typeof value;
    const kind_store = this.Stores[kind];
    const store = kind_store[types.__id__];

    if (!store) return { success: false, data: value };

    const result = store.update(value);

    if (result.success && this.callback) this.callback(this.getStoreValue());

    return result;
  }

  /**
   * @description Return All Types Store Value
   * @return {Object}
   */
  getStoreValue() {
    const store_value = {};

    for (const kind in this.Stores) {
      const kind_store = this.Stores[kind];

      for (const types_id in kind_store) {
        const store = kind_store[types_id];
        store_value[store.name] = store.getValue();
      }
    }

    return store_value;
  }

  /**
   * @description Return Store value of passed GolguaTypes
   * @param {GolguaTypes} types Golgua Types instance\
   * @return {Any|Null}
   */
  getStoreValueWithTypes(types) {
    const kind_store = this.Stores[types.__kind__];

    if (kind_store && kind_store[types.__id__]) {
      return kind_store[types.__id__].getValue();
    }

    return null;
  }
}

/**
 * @description Singleton Class
 */
const GolguaTypesStore = new TypesStore();

export { GolguaTypesStore };
