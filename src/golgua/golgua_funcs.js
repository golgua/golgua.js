import * as $$ from '../order/order';
import { State } from '../state/state';
import { throwError } from '../alert/alert';
import { TypeBase } from '../types/TypeBase';
import { GolguaManager } from '../golgua/golgua';

const stateInit = (state, cb, parent) => {
  state.__id = GolguaManager.addState(state, parent);
  state.state = state.defaultValue();
  state.__state = state.defaultValue();

  const promise = state.init();

  if (promise instanceof Promise) {
    promise.then(v => updateState(v, state, cb));
  }

  return state;
};

export const createState = (StateClass, cb, parent = null) => {
  if (State.isPrototypeOf(StateClass)) {
    const state = new StateClass();
    const types = state.types;

    if (types instanceof TypeBase) return stateInit(state, cb, parent);

    if ($$.isObject(types) && !$$.isEmpty(types)) {
      for (const key in types) {
        const type = types[key];

        if (State.isPrototypeOf(type)) {
          types[key] = createState(type, cb, state);
        } else if (!(type instanceof TypeBase)) {
          throwError('createState.types', key, types[key]);
        }
      }

      return stateInit(state, cb, parent);
    }

    throwError('createState.types');
  }

  throwError('createState.stateClass', StateClass);
};

export const updateState = (value, state, cb) => {
  const types = state.types;
  const newStateValue = state.willUpdate(value);
  const childStates = [];

  if (newStateValue === null) return state.__state;

  if (types instanceof TypeBase) {
    if (!types.check(newStateValue)) {
      state.updatedCatch(newStateValue, null, newStateValue);
      return state.__state;
    }
  } else {
    if ($$.isEmpty(newStateValue)) {
      throwError('updateState.invalid_value', newStateValue);
    }

    for (const key in newStateValue) {
      const val = newStateValue[key];

      if (!$$.hasKey(types, key)) throwError('updateState.invalid_types', val);

      if (types[key] instanceof State) {
        childStates.push(() => {
          newStateValue[key] = updateState(val, types[key], cb);
        });
      } else if (!types[key].check(val)) {
        state.updatedCatch(val, key, newStateValue);
        return state.__state;
      }
    }
  }

  childStates.forEach(f => f());

  state.state = newStateValue;
  state.__state = $$.clone(newStateValue);

  state.didUpdate();

  cb && cb($$.clone(newStateValue), state);

  return newStateValue;
};
