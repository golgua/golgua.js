import { StringTypes, NumberTypes } from './PrimeTypes';
import { ObjectTypes, ArrayTypes } from './ObjectLikeTypes';
import chai from 'chai';

const assert = chai.assert;

/* eslint-env mocha */

describe('ObjectLikeTypes', () => {
  describe('ObjectTypes', () => {
    const types = {
      text: new StringTypes({
        default_value: 'Hello World!',
        proc: s => s.slice(0, 9),
      }),
      id: new NumberTypes({ default_value: 0, proc: id => (id < 10 ? id : 0) }),
    };
    let objTypes;
    let normalObjTypes;

    before(() => {
      objTypes = new ObjectTypes({
        types,
        default_value: { num: 1000, str: 'test' },
        proc: v => ({ num: v.id, str: v.text }),
      });
      normalObjTypes = new ObjectTypes({ types });
    });

    context('Class Variable', () => {
      it('have them', () => {
        const keys = [
          'id',
          'default_value',
          'proc',
          'empty',
          'types',
          'kind',
        ].map(s => `__${s}__`);

        assert.hasAllKeys(objTypes, keys);
      });
    });

    context('types property', () => {
      it('can set', () => {
        const objTypes = new ObjectTypes({ types });
        assert.instanceOf(objTypes, ObjectTypes);
      });

      it("can't set", () => {
        assert.throw(() => new ObjectTypes({ types: 1 }));
        assert.throw(() => new ObjectTypes({ types: {} }));
        assert.throw(() => new ObjectTypes({ types: { ms: 'test' } }));
        assert.throw(() => new ObjectTypes({ types: new StringTypes({}) }));
      });
    });

    context('check function', () => {
      it('return check result and proc data', () => {
        const value = { id: 1000, text: 'Test Text!!!' };
        const true_result1 = normalObjTypes.check(value);
        const false_result1 = normalObjTypes.check('bad value');
        const true_result2 = objTypes.check(value);
        const false_result2 = objTypes.check('bad value');

        assert.deepEqual(true_result1, {
          success: true,
          data: { id: 0, text: 'Test Text' },
        });
        assert.deepEqual(false_result1, { success: false, data: 'bad value' });
        assert.deepEqual(true_result2, {
          success: true,
          data: { num: 0, str: 'Test Text' },
        });
        assert.deepEqual(false_result2, { success: false, data: 'bad value' });
      });
    });
  });

  describe('ArrayTypes', () => {
    const types = new StringTypes({
      default_value: 'Hello World!',
      proc: s => s.slice(0, 5),
    });
    let arrayTypes;
    let normalArrayTypes;

    before(() => {
      arrayTypes = new ArrayTypes({
        types,
        default_value: 'Default',
        proc: v => v.join(','),
      });
      normalArrayTypes = new ArrayTypes({ types });
    });

    context('Class Variable', () => {
      it('have them', () => {
        const keys = [
          'id',
          'default_value',
          'proc',
          'empty',
          'types',
          'kind',
        ].map(s => `__${s}__`);

        assert.hasAllKeys(arrayTypes, keys);
      });
    });

    context('types property', () => {
      it('can set', () => {
        assert.instanceOf(arrayTypes, ArrayTypes);
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
        const true_result1 = normalArrayTypes.check(value);
        const false_result1 = normalArrayTypes.check('bad value');
        const true_result2 = arrayTypes.check(value);
        const false_result2 = arrayTypes.check('bad value');

        assert.deepEqual(true_result1, {
          success: true,
          data: ['Test@', 'Hello'],
        });
        assert.deepEqual(false_result1, { success: false, data: 'bad value' });
        assert.deepEqual(true_result2, {
          success: true,
          data: 'Test@,Hello',
        });
        assert.deepEqual(false_result2, { success: false, data: 'bad value' });
      });
    });
  });
});
