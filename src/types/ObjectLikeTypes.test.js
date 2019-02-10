import { Types } from './types';
import { ObjectTypes, ArrayTypes } from './ObjectLikeTypes';
import chai from 'chai';

const assert = chai.assert;

describe('ObjectLikeTypes', () => {
  context('ObjectTypes', () => {
    const types = {
      text: Types.string({ pattern: v => v.length < 10 }),
      id: Types.number(),
    };

    context('types property', () => {
      it('can set', () => {
        const objTypes = new ObjectTypes({ types });
        assert.instanceOf(objTypes, ObjectTypes);
      });

      it("can't set", () => {
        assert.throw(() => new ObjectTypes({ types: 1 }));
        assert.throw(() => new ObjectTypes({ types: {} }));
        assert.throw(() => new ObjectTypes({ types: { ms: 'test' } }));
        assert.throw(() => new ObjectTypes({ types: Types.string() }));
      });
    });

    context('default value', () => {
      it('can set', () => {
        const nullObjTypes = new ObjectTypes({ types });
        const objTypes = new ObjectTypes({
          types,
          default_value: { text: 'test', id: 1000 },
        });
        const emptyObjTypes = new ObjectTypes({
          types,
          empty: true,
          default_value: {},
        });

        assert.isNull(nullObjTypes.defaultValue());
        assert.deepEqual(objTypes.defaultValue(), { text: 'test', id: 1000 });
        assert.deepEqual(emptyObjTypes.defaultValue(), {});
      });

      it("can't set", () => {
        assert.throw(() => new ObjectTypes({ types, nullable: false }));
        assert.throw(() => new ObjectTypes({ types, default_value: {} }));
        assert.throw(
          () => new ObjectTypes({ types, default_value: { text: '' } })
        );
        assert.throw(
          () => new ObjectTypes({ types, default_value: { id: 0 } })
        );
      });
    });

    context('check function', () => {
      let objTypes;
      let emptyObjTypes;

      before(() => {
        objTypes = new ObjectTypes({ types });
        emptyObjTypes = new ObjectTypes({
          types,
          empty: true,
          nullable: false,
          default_value: {},
        });
      });

      it('when True', () => {
        assert.isTrue(objTypes.check({ text: 'hello', id: 82 }));
        assert.isTrue(objTypes.check(null));
        assert.isTrue(emptyObjTypes.check({}));
      });

      it('when False', () => {
        assert.isFalse(objTypes.check({}));
        assert.isFalse(objTypes.check({ text: '0123456789', id: 13 }));
      });

      it('when throw error', () => {
        assert.throw(() => objTypes.check(10));
        assert.throw(() => objTypes.check({ text: 'hello' }));
        assert.throw(() => objTypes.check({ id: 13 }));
        assert.throw(() => emptyObjTypes.check(null));
      });
    });
  });

  context('ArrayTypes', () => {
    const types = Types.string({ pattern: v => v.length < 10 });

    context('types property', () => {
      it('can set', () => {
        const arrayTypes = new ArrayTypes({ types });
        assert.instanceOf(arrayTypes, ArrayTypes);
      });

      it("can't set", () => {
        assert.throw(() => new ArrayTypes({ types: 0 }));
        assert.throw(() => new ArrayTypes({ types: [] }));
        assert.throw(() => new ArrayTypes({ types: null }));
        assert.throw(() => new ArrayTypes({ types: { ms: Types.string() } }));
      });
    });

    context('default value', () => {
      it('can set', () => {
        const nullArrayTypes = new ArrayTypes({ types });
        const arrayTypes = new ArrayTypes({
          types,
          default_value: ['test', 'test2'],
        });
        const emptyArrayTypes = new ArrayTypes({
          types,
          empty: true,
          default_value: [],
        });

        assert.isNull(nullArrayTypes.defaultValue());
        assert.deepEqual(arrayTypes.defaultValue(), ['test', 'test2']);
        assert.deepEqual(emptyArrayTypes.defaultValue(), []);
      });

      it("can't set", () => {
        assert.throw(() => new ArrayTypes({ types, default_value: [] }));
        assert.throw(() => new ArrayTypes({ types, default_value: 0 }));
        assert.throw(() => new ArrayTypes({ types, default_value: {} }));
        assert.throw(() => new ArrayTypes({ types, nullable: false }));
        assert.throw(
          () => new ArrayTypes({ types, default_value: ['0123456789'] })
        );
      });
    });

    context('check function', () => {
      let arrayTypes;
      let emptyArrayTypes;

      before(() => {
        arrayTypes = new ArrayTypes({ types });
        emptyArrayTypes = new ArrayTypes({
          types,
          empty: true,
          nullable: false,
          pattern: v => v.length < 1,
          default_value: [],
        });
      });

      it('when True', () => {
        assert.isTrue(arrayTypes.check(['test']));
        assert.isTrue(arrayTypes.check(null));
        assert.isTrue(emptyArrayTypes.check([]));
      });

      it('when False', () => {
        assert.isFalse(arrayTypes.check([]));
        assert.isFalse(arrayTypes.check(['0123456789']));
        assert.isFalse(emptyArrayTypes.check(['1', '2']));
      });

      it('when throw error', () => {
        assert.throw(() => arrayTypes.check(123));
        assert.throw(() => arrayTypes.check([123]));
        assert.throw(() => arrayTypes.check(['test', 123]));
        assert.throw(() => emptyArrayTypes.check(null));
      });
    });
  });
});
