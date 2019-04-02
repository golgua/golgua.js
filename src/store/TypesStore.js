/**
 * @description Store Class managing Golgua Types
 */
class TypesStore {
  /**
   * @description Initialize
   */
  constructor() {
    this.reset();
  }

  /**
   * @description Restore Store to its initial state
   */
  reset() {
    this.Store = {};
    this.Types = {};
    this.callbacks = {
      fail: [],
      updated: [],
    };
  }

  /**
   * @description set event callback
   * @param {'updated'|'fail'} event event type
   * @param {Function} cb callback
   */
  addCallback(event, cb) {
    this.callbacks[event].push(cb);
  }

  /**
   * @description Register Golgua Types to subscribe
   * @param {GolguaTypes} types Golgua Types Instance
   */
  setTypes(types) {
    const kind_store = this.Types[types.__kind__] || {};
    kind_store[types.__id__] = types;
    this.Types[types.__kind__] = kind_store;
  }

  /**
   * @description Create Store from names of Types
   * @param {String} name store name
   * @param {Any} default_value default store value
   */
  createStore(name, default_value) {
    this.Store[name] = default_value;
  }

  /**
   * @description update store value
   * @param {any} value update value
   * @param {String|Null} name store name
   */
  update(value, name) {
    const kind_store = this.Types[typeof value];

    for (const type_id in kind_store) {
      if (kind_store[type_id].update(value, name)) return;
    }

    this.callbacks.fail.forEach(cb => cb(value, name));
  }

  /**
   * @description update store value
   * @param {String} name types name
   * @param {Any} value updated value
   */
  updateStoreValue(name, value) {
    this.Store[name] = value;
    this.callbacks.updated.forEach(cb => cb(this.Store, { name, value }));
  }
}

/**
 * @description Singleton Class
 */
const GolguaTypesStore = new TypesStore();

export { GolguaTypesStore };
