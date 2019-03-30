import { GolguaDataStore } from './DataStore';
import { StringTypes } from '../types/PrimeTypes';
import chai from 'chai';

/* eslint-env mocha */

const assert = chai.assert;

describe('Golgua Store Test', () => {
  let Store;

  beforeEach(() => {
    const types = new StringTypes({ default_value: 'default value' });
    Store = new GolguaDataStore(types);
  });

  context('Store Value Test', () => {
    it('has default values set', () => {
      assert.deepEqual(Store.getValue(), 'default value');
    });

    it('can set value', () => {
      const result = Store.update('updated text');
      assert.deepEqual({ success: true, data: 'updated text' }, result);
    });

    it('can set default value', () => {
      Store.update('updated text');
      Store.reset();
      assert.deepEqual(Store.getValue(), 'default value');
    });
  });
});
