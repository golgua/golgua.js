import { TypesBase } from '../types/TypesBase';
import { GolguaTypesStore } from '../store/TypesStore';
/**
 * @description Make the framework subscribe to "Types"
 * @param {GolguaTypes} types Subscribe to "GolguaTypes"
 * @param {String} name Store key name
 */
export const subscription = (types, name) => {
  if (typeof name !== 'string') {
    throw new Error('Please set a name. This is required.');
  }
  if (GolguaTypesStore.names.indexOf(name) !== -1) {
    throw new Error('It is already registered name.');
  }
  if (!(types instanceof TypesBase)) {
    throw new Error(
      'The value of the passed argument is invalid. Please pass GolguaTypesInstance.'
    );
  }

  GolguaTypesStore.setTypes(types, name);
};

/**
 *
 * @param {Function} cb callback
 */
export const setUpdateListener = cb => {
  if (typeof cb !== 'function') {
    throw new Error('Argument value is not a function.');
  }

  GolguaTypesStore.setCallback(cb);
};

/**
 * @description Get Store value
 * @param {GolguaTypes} types Golgua Types to get Store value
 * @return {Any}
 */
export const getStoreValue = (types = null) => {
  if (types) {
    if (!(types instanceof TypesBase)) {
      throw new Error(
        'The only value that can be set to the argument is GolguaTypesInstance'
      );
    }

    return GolguaTypesStore.getStoreValueWithTypes(types);
  }

  return GolguaTypesStore.getStoreValue();
};

/**
 * @description Update Store value according to argument type
 * @param {Any} value update value
 * @return {{ success:Boolean, data:Any }}
 */
export const update = value => {
  if (value === null || value === undefined) {
    throw new Error('null or undefined is not accepted as a value to update.');
  }

  return GolguaTypesStore.updateAllTypes(value);
};

/**
 * @description Update a specific type of value
 * @param {GolguaTypes} types Golgua Types to update
 * @param {Any} value update value
 * @return {{ success:Boolean, data:Any }}
 */
export const updateWithTypes = (types, value) => {
  if (!(types instanceof TypesBase)) {
    throw new Error(
      'The value of the passed argument is invalid. Please pass GolguaTypesInstance.'
    );
  }

  return GolguaTypesStore.updateTypes(types, value);
};
