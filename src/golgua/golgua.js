import * as $$ from '../order/order';
import { State } from '../state/state';
import { throwError } from '../alert/alert';

/**
 * @description Golgua Manager Class. Singleton Class.
 */
class GolguaClass {
  /**
   * @description initialize propertypes
   */
  constructor() {
    this.makers = {};
    this.states = {};
  }

  /**
   * @description Add an instance of Maker to the list
   * @param {Maker} maker maker instance
   * @return {String} unique id
   */
  addMaker(maker) {
    const id = $$.getUniqueId();
    this.makers[id] = maker;
    return id;
  }

  /**
   * @description Add an instance of State to the list
   * @param {State} state state instance
   * @param {State} parent parent state instance
   * @return {String} unique id
   */
  addState(state, parent = null) {
    const id = $$.getUniqueId();
    this.states[id] = { state, parent };
    return id;
  }

  /**
   * @description Find a Maker instance with StateClass
   * @param {State} StateClass state class
   * @return {Maker}
   */
  searchMaker(StateClass) {
    if (State.isPrototypeOf(StateClass)) {
      for (const id in this.makers) {
        if (this.makers[id].__state instanceof StateClass) {
          return this.makers[id];
        }
      }
    }

    throwError('GolguaManager.searchMaker');
  }

  /**
   * @description Find a State instance with StateClass
   * @param {State} StateClass state class
   * @param {String} id ID owned by State instance
   * @return {State}
   */
  searchState(StateClass, id = null) {
    if (State.isPrototypeOf(StateClass)) {
      for (const key in this.states) {
        const info = this.states[key];

        if (info.state instanceof StateClass) {
          if (!id || id === info.parent.__id) {
            return info.state;
          }
        }
      }
    }

    throwError('GolguaManager.searchState');
  }

  /**
   * @description Get all State instances of StateClass passed in
   * @param {State} StateClass state class
   * @param {String} id ID owned by State instance
   * @return {State[]}
   */
  searchStateAll(StateClass, id = null) {
    const list = [];

    for (const key in this.states) {
      const info = this.states[key];
      if (info.state instanceof StateClass) {
        if (!id || id === info.parent.__id) {
          list.push(info.state);
        }
      }
    }

    return list;
  }

  /**
   * @description Get Maker or State from the passed value
   * @param {String} id unique id
   * @return {Maker|State|null}
   */
  searchById(id) {
    if (this.makers[id]) return this.makers[id];
    else if (this.states[id]) return this.states[id];

    return null;
  }
}

export const GolguaManager = new GolguaClass();
