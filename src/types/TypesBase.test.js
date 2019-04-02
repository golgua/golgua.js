import { TypesBase } from './TypesBase';
import chai from 'chai';

const assert = chai.assert;

/* eslint-env mocha */

describe('TypesBase Class Test', () => {
  let baseTypes;

  before(() => {
    baseTypes = new TypesBase({});
  });

  context('Class Variable', () => {
    it('have them', () => {
      const keys = [
        'id',
        'default',
        'dispatch',
        'empty',
        'types',
        'kind',
        'name',
        'error',
      ].map(s => `__${s}__`);

      assert.hasAllKeys(baseTypes, keys);
    });
  });

  context('defaultValue function', () => {
    it('return default value', () => {
      const defaultTypes = new TypesBase({ default: 'HelloWorld!' });
      assert.equal(defaultTypes.defaultValue(), 'HelloWorld!');
    });

    it('makes a deep copy', () => {
      const value = { hello: 10 };
      const defaultTypes = new TypesBase({ default: value });

      assert.notEqual(defaultTypes.defaultValue(), value);
    });
  });

  context('set property', () => {
    context('when you define the dispatch funciton', () => {
      it('must have a name', () => {
        assert.throw(() => {
          new TypesBase({ dispatch: (store, value) => value });
        });
      });
    });
  });
});
