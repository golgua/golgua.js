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
    this.Store[types.__name__] = types.defaultValue();
  }

  /**
   * @description update store value
   * @param {any} value update value
   */
  update(value) {
    const kind_store = this.Types[typeof value];

    for (const type_id in kind_store) {
      if (kind_store[type_id].update(value)) return;
    }

    this.callbacks.fail.forEach(cb => cb(value));
  }

  /**
   * @description update store value
   * @param {String} name types name
   * @param {Any} value updated value
   */
  updateStoreValue(name, value) {
    this.Store[name] = value;
    this.callbacks.updated.forEach(cb => cb(value, name, this.Store));
  }
}

/**
 * @description Singleton Class
 */
const GolguaTypesStore = new TypesStore();

export { GolguaTypesStore };
