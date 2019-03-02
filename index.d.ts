declare module "golgua" {
  export = Golgua;
}

declare namespace Golgua {
  var Types: {
    string: (property: TypesProperty<string>) => TypesInstance<string>;
    number: (property: TypesProperty<number>) => TypesInstance<number>;
    boolean: (property: TypesProperty<boolean>) => TypesInstance<boolean>;
    object: (
      property: TypesObjectLikeProperty<object>
    ) => TypesInstance<object>;
    array: (
      property: TypesObjectLikeProperty<Array<any>>
    ) => TypesInstance<Array<any>>;
  };

  interface TypesInstance<BaseType> {
    default_value(): BaseType;
    check(value: any): boolean;
  }

  interface TypesProperty<BaseType> {
    default_value?: BaseType;
    pattern?: (check_value: any) => boolean;
    nullable?: boolean;
  }

  interface TypesObjectLikeProperty<BaseType> extends TypesProperty<BaseType> {
    types: TypesInstance<string | number | boolean | object | Array<any>>;
    empty?: boolean;
  }

  class State<BaseType> {
    protected types: BaseType | { [key: string]: TypesInstance<BaseType> };

    state: BaseType | null;

    init(): void | Promise<any>;
    willUpdate(props: BaseType): BaseType;
    didUpdate(): void;
    updatedCatch(value: any, key: string | number, props: BaseType);
    defaultValue(): BaseType;
  }

  interface Maker {
    update(value: any): void;
    updateWithState(StateClass: State<any>, value: any): void;
    getStateValue(): any;
    listen(cb: (updated_value: any) => void): void;
    listenWithState(
      StateClass: State<any>,
      cb: (updated_value: any) => void
    ): void;
  }

  function createMaker(StateClass: State<any>): Maker;
  function searchMaker(StateClass: State<any>): Maker;
}
