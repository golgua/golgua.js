import * as $$ from '../order/order';
import { throwError } from '../alert/alert';
import { GolguaManager } from '../golgua/golgua';
import { updateState, createState } from '../golgua/golgua_funcs';

/**
 * @description Maker Class
 */
export class Maker {
  /**
   * @description maker constructor
   * @param {State} state State Class
   */
  constructor(state) {
    this.__state = createState(state, this.__callback_execute);
    this.__id = GolguaManager.addMaker(this);
    this.__callbacks = {};

    this.__callback_execute = (updatedValue, state) => {
      const cbs = this.__callbacks[state.__id];
      if (cbs) cbs.forEach(cb => cb(updatedValue));
    };
  }

  /**
   * @callback listenerCallback
   * @param {Any} updated_value updated value
   * @return {void}
   */

  /**
   * @param {listenerCallback} cb callback
   * @return {Function} subscribe
   */
  listen(cb) {
    return this.__setCallbacks(this.__state.__id, cb);
  }

  /**
   * @description Monitor only StateClass changes passed
   * @param {State} StateClass State Class
   * @param {listenerCallback} cb callback
   * @return {Function} subscribe
   */
  listenWithState(StateClass, cb) {
    const state = GolguaManager.searchState(StateClass, this.__state.__id);
    return this.__setCallbacks(state.__id, cb);
  }

  /**
   * @description Add Callback to __callbacks property.
   * @param {String} stateId ID owned by State instance
   * @param {listenerCallback} cb callback
   * @return {Function}
   */
  __setCallbacks(stateId, cb) {
    if (stateId && typeof cb !== 'function') {
      throwError(
        'The value passed is not a function or state id is invalid value.'
      );
    }

    const cbs = this.__callbacks[stateId] || [];

    cbs.push(cb);

    this.__callbacks[stateId] = cbs;

    return () => cbs.splice(cbs.indexOf(cb), 1);
  }

  /**
   * @description Update State
   * @param {Any} value update value
   */
  update(value) {
    updateState(value, this.__state, this.__callback_execute);
  }

  /**
   * @description Update only passed StateClass
   * @param {State} StateClass State Class
   * @param {Any} value update value
   */
  updateWithState(StateClass, value) {
    const state = GolguaManager.searchState(StateClass, this.__state.__id);

    if (!state) throwError('updateWithState');

    updateState(value, state, this.__callback_execute);
  }

  /**
   * @description return current state value
   * @return {Any}
   */
  getStateValue() {
    return $$.clone(this.__state.state);
  }
}

export const createMaker = StateClass => {
  return new Maker(StateClass);
};
