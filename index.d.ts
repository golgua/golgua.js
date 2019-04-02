declare module 'golgua' {
  export = Golgua;
}

declare namespace Golgua {
  var Types: {
    string: (property?: TypesProperty<string>) => TypesInstance<string>;
    number: (property?: TypesProperty<number>) => TypesInstance<number>;
    boolean: (property?: TypesProperty<boolean>) => TypesInstance<boolean>;
    object: (
      property?: TypesObjectLikeProperty<object>
    ) => TypesInstance<object>;
    array: (
      property?: TypesObjectLikeProperty<Array<any>>
    ) => TypesInstance<Array<any>>;
  };

  interface TypesInstance<BaseType> {
    update(value: any);
    getState(): any;
  }

  interface TypesProperty<BaseType> {
    name?: string;
    dispatch?: (store: any, value: BaseType) => any;
    store?: any;
  }

  interface TypesObjectLikeProperty<BaseType> extends TypesProperty<BaseType> {
    types: TypesInstance<BaseType>;
    empty?: boolean;
  }

  function subscription(types: TypesInstance<any>);
  function update(input_value: any, store_name: string);
  function getStoreValue(): object;
  function addEventListener(
    event: 'updated',
    callback: (store: any, updated_store: { name: string; value: any }) => void
  );
  function addEventListener(
    event: 'fail',
    callback: (value: any, store_name: string | null) => void
  );
}
