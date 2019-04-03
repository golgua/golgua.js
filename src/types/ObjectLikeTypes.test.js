import { StringTypes, NumberTypes } from './PrimeTypes';
import { ObjectTypes, ArrayTypes } from './ObjectLikeTypes';
import chai from 'chai';

const assert = chai.assert;

/* eslint-env mocha */

describe('ObjectLikeTypes', () => {
  describe('ObjectTypes', () => {
    const types = {
      text: new StringTypes({}),
      id: new NumberTypes({}),
    };
    let normalObjTypes;

    before(() => {
      normalObjTypes = new ObjectTypes({ types });
    });

    context('types property', () => {
      it('can set', () => {
        const objTypes = new ObjectTypes({ types });
        const obj2Types = new ObjectTypes({ types: { test: v => !v } });
        assert.instanceOf(objTypes, ObjectTypes);
        assert.instanceOf(obj2Types, ObjectTypes);
      });

      it("can't set", () => {
        assert.throw(() => new ObjectTypes({ types: 1 }));
        assert.throw(() => new ObjectTypes({ types: {} }));
        assert.throw(() => new ObjectTypes({ types: { ms: 'test' } }));
        assert.throw(() => new ObjectTypes({ types: new StringTypes({}) }));
      });
    });

    context('check function', () => {
      it('return check result', () => {
        const value = { id: 1000, text: 'Test Text!!!' };

        assert.isTrue(normalObjTypes.__check__(value));
        assert.isFalse(normalObjTypes.__check__(''));
        assert.isFalse(normalObjTypes.__check__({}));
      });

      it('returns True when empty', () => {
        const objTypes = new ObjectTypes({ types, empty: true });
        assert.isTrue(objTypes.__check__({}));
      });
    });
  });

  describe('ArrayTypes', () => {
    const types = new StringTypes({});
    let normalArrayTypes;

    before(() => {
      normalArrayTypes = new ArrayTypes({ types });
    });

    context('types property', () => {
      it('can set', () => {
        const arrTypes = new ArrayTypes({ types: v => !v });
        assert.instanceOf(normalArrayTypes, ArrayTypes);
        assert.instanceOf(arrTypes, ArrayTypes);
      });

      it("can't set", () => {
        assert.throw(() => new ArrayTypes({ types: 0 }));
        assert.throw(() => new ArrayTypes({ types: '' }));
        assert.throw(() => new ArrayTypes({ types: [] }));
        assert.throw(() => new ArrayTypes({ types: null }));
      });
    });

    context('check function', () => {
      it('return check result and proc data', () => {
        const value = ['Test@Text', 'Hello World!'];

        assert.isTrue(normalArrayTypes.__check__(value));
        assert.isFalse(normalArrayTypes.__check__('TestText'));
        assert.isFalse(normalArrayTypes.__check__([]));
      });

      it('returns True when empty', () => {
        const arrTypes = new ArrayTypes({ types, empty: true });
        assert.isTrue(arrTypes.__check__([]));
      });
    });
  });
});
