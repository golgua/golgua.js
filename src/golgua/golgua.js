import * as $$ from '../funcs/Funcs';
import { TypesBase } from '../types/TypesBase';
import { GolguaTypesStore } from '../store/TypesStore';
import { GolguaError } from './GolguaError';

/**
 * @description Make the framework subscribe to "Types"
 * @param {GolguaTypes} types Subscribe to "GolguaTypes"
 */
export const subscription = types => {
  if (!(types instanceof TypesBase)) {
    throw new GolguaError(
      'The value of the passed argument is invalid. Please pass GolguaTypesInstance.'
    );
  }

  GolguaTypesStore.setTypes(types);
};

/**
 * @description set event listener
 * @param {'update'|'error'} event event type
 * @param {Function} cb callback
 */
export const addEventListener = (event, cb) => {
  if (!event.match(/updated|fail/)) {
    throw new GolguaError('Unknown event.');
  }
  if (typeof cb !== 'function') {
    throw new GolguaError('Argument value is not a function.');
  }

  GolguaTypesStore.addCallback(event, cb);
};

/**
 * @description Get Store value
 * @return {Any}
 */
export const getStoreValue = () => {
  return $$.clone(GolguaTypesStore.Store);
};

/**
 * @description Update Store value according to argument type
 * @param {Any} value update value
 */
export const update = value => {
  if (value === null || value === undefined) {
    throw new GolguaError(
      'null or undefined is not accepted as a value to update.'
    );
  }

  GolguaTypesStore.update(value);
};
