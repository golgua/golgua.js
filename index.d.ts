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
    defaultValue(): BaseType;
    check(value: any): boolean;
  }

  interface TypesProperty<BaseType> {
    default_value?: BaseType;
    proc?: (value: any) => any;
  }

  interface TypesObjectLikeProperty<BaseType> extends TypesProperty<BaseType> {
    types: TypesInstance<string | number | boolean | object | Array<any>>;
    empty?: boolean;
  }

  type updateResult = { success: boolean; data: any }

  function subscription(types: TypesInstance<any>);
  function update(input_value: any): updateResult;
  function udateWithTypes(types: TypesInstance<any>, input_value: any ): updateResult;
  function setUpdateListener( callback: (store_value: object) => void );
}
