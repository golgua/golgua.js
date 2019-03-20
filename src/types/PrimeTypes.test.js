import { StringTypes, NumberTypes, BooleanTypes } from './PrimeTypes';
import chai from 'chai';

const assert = chai.assert;

/* eslint-env mocha */

describe('Primitive Types', () => {
  describe('String Types', () => {
    let strTypes;
    let normalStrTypes;

    before(() => {
      strTypes = new StringTypes({
        proc: v => v.length,
        default_value: 'Hello World!',
      });
      normalStrTypes = new StringTypes({});
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

        assert.hasAllKeys(strTypes, keys);
        assert.hasAllKeys(normalStrTypes, keys);
      });
    });

    context('default value', () => {
      it('can set', () => {
        assert.isNull(normalStrTypes.defaultValue());
        assert.equal(strTypes.defaultValue(), 'Hello World!');
      });
    });

    context('check function', () => {
      it('return check result and proc data', () => {
        const true_result1 = normalStrTypes.check('string');
        const false_result1 = normalStrTypes.check(1000);
        const true_result2 = strTypes.check('string');
        const false_result2 = strTypes.check(1000);

        assert.deepEqual(true_result1, { success: true, data: 'string' });
        assert.deepEqual(true_result2, { success: true, data: 6 });
        assert.deepEqual(false_result1, { success: false, data: 1000 });
        assert.deepEqual(false_result2, { success: false, data: 1000 });
      });
    });
  });

  describe('Number Types', () => {
    let numTypes;
    let normalNumTypes;

    before(() => {
      numTypes = new NumberTypes({ proc: v => `${v}`, default_value: '1000' });
      normalNumTypes = new NumberTypes({});
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

        assert.hasAllKeys(numTypes, keys);
        assert.hasAllKeys(normalNumTypes, keys);
      });
    });

    context('default value', () => {
      it('can set', () => {
        assert.isNull(normalNumTypes.defaultValue());
        assert.equal(numTypes.defaultValue(), '1000');
      });
    });

    context('check function', () => {
      it('return check result and proc data', () => {
        const true_result1 = normalNumTypes.check(1000);
        const false_result1 = normalNumTypes.check('test');
        const true_result2 = numTypes.check(1000);
        const false_result2 = numTypes.check('test');

        assert.deepEqual(true_result1, { success: true, data: 1000 });
        assert.deepEqual(true_result2, { success: true, data: '1000' });
        assert.deepEqual(false_result1, { success: false, data: 'test' });
        assert.deepEqual(false_result2, { success: false, data: 'test' });
      });
    });
  });

  describe('Boolean Types', () => {
    let boolTypes;
    let normalBoolTypes;

    before(() => {
      boolTypes = new BooleanTypes({
        proc: v => `${v}`,
        default_value: 'false',
      });
      normalBoolTypes = new BooleanTypes({});
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

        assert.hasAllKeys(boolTypes, keys);
        assert.hasAllKeys(normalBoolTypes, keys);
      });
    });

    context('default value', () => {
      it('can set', () => {
        assert.isNull(normalBoolTypes.defaultValue());
        assert.equal(boolTypes.defaultValue(), 'false');
      });
    });

    context('check function', () => {
      it('return check result and proc data', () => {
        const true_result1 = normalBoolTypes.check(true);
        const false_result1 = normalBoolTypes.check('test');
        const true_result2 = boolTypes.check(true);
        const false_result2 = boolTypes.check('test');

        assert.deepEqual(true_result1, { success: true, data: true });
        assert.deepEqual(true_result2, { success: true, data: 'true' });
        assert.deepEqual(false_result1, { success: false, data: 'test' });
        assert.deepEqual(false_result2, { success: false, data: 'test' });
      });
    });
  });
});
