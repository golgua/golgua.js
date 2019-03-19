import { TypesBase } from '../types/TypesBase';
import { GolguaDataStore } from '../store/Store';

/**
 * @description Keep GolguaTypes to subscribe
 */
const GolguaTypesStore = {};

/**
 * @description Make the framework subscribe to "Types"
 * @param {GolguaTypes} types Subscribe to "GolguaTypes"
 */
export const subscription = types => {
  if (types instanceof TypesBase) {
    const typesStore = GolguaTypesStore[types.type] || {};
    const typesID = types.__id__;

    typesStore[typesID] = {
      types,
      store: new GolguaDataStore(types),
    };
    GolguaTypesStore[types.type] = typesStore;
  } else {
    throw new Error(
      'The value of the passed argument is invalid. Please pass GolguaTypesInstance.'
    );
  }
};

/**
 * @description Update Store value according to argument type
 * @param {Any} value update value
 * @return {{ success:Boolean, data:Any }}
 */
export const update = value => {
  if (value === null) {
    throw new Error('null is not accepted as a value to update.');
  }

  const typesStore = GolguaTypesStore[typeof value];

  if (!typesStore) throw new Error('It looks like an unregistered type.');

  for (const key in typesStore) {
    const { types, store } = typesStore[key];
    const result = types.check(value);

    if (result.success) {
      store.update(result.data);
      return { success: true, data: store.getValue() };
    }
  }

  return { success: false, data: value };
};

/**
 * @description Update a specific type of value
 * @param {GolguaTypes} types Golgua Types to update
 * @param {Any} value update value
 * @return {{ success:Boolean, data:Any }}
 */
export const updateWithTypes = (types, value) => {
  if (types instanceof TypesBase) {
    throw new Error(
      'The value of the passed argument is invalid. Please pass GolguaTypesInstance.'
    );
  }

  const typesStore = GolguaTypesStore[types.type];

  if (!typesStore && !typesStore[types.__id__]) {
    throw new Error('It seems to be a type that has not been registered yet.');
  }

  const { store } = typesStore[types.__id__];
  const result = types.check(value);

  if (result.success) {
    store.update(result.data);
    return { success: true, data: store.getValue() };
  } else return result;
};
