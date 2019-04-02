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
        'store',
        'dispatch',
        'empty',
        'types',
        'kind',
        'name',
      ].map(s => `__${s}__`);

      assert.hasAllKeys(baseTypes, keys);
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
