export const Messages = {
  TypeBase: {
    default_value: type =>
      `default_value is not defined or an illegal value is set. Please define default_value with correct value.
        Acceptable types are: ${type.constructor.name}
      `,
  },

  Types: {
    check: (types, value) =>
      `Type is invalid. 
        By ${types.constructor.name} Class. 
        input value : ${JSON.stringify(value)}
      `,
  },

  ObjectTypes: {
    typesMember: key => `${key} is not Types instance.`,
    types: () =>
      `The value you can set for the types property of ObjectTypes is object containing Types instance only.`,
  },

  ArrayTypes: {
    types: () =>
      `The value you can set for the types property of ArrayTypes is Types instance only.`,
  },

  createState: {
    stateClass: value =>
      `A value not inheriting State Class was passed as an argument. Please pass in Class which inherited State Class as argument.
      Passed value : ${JSON.stringify(value)}
      `,
    types: (key, value) =>
      key
        ? `${key} is not a Types Object.
        Types can be a Types object or a State Class.
        Passed Value : ${JSON.stringify(value)}
      `
        : `Types must be plain objects containing Types objects or Types objects.`,
  },

  updateWithState: () =>
    `The passed StateClass is not in this maker or it is not registered.`,

  updateState: {
    invalid_types: value =>
      `The value returned by "willUpdate" is because it does not contain a value in types or contains an unrelated value.
      Returned value : ${JSON.stringify(value)}
      `,
    invalid_value: value =>
      `The value passed in is a non-object value or an empty object.
      Passed value : ${JSON.stringify(value)}`,
  },

  GolguaManager: {
    searchMaker: () => `We could not get Maker.`,

    searchState: () => `We could not get State.`,
  },
};
