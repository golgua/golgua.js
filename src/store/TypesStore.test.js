import { GolguaTypesStore } from './TypesStore';
import { Types } from '../types/Types';
import chai from 'chai';

const assert = chai.assert;

/* eslint-env mocha */

describe('Golgua Types Store Test', () => {
  beforeEach(() => {
    GolguaTypesStore.reset();
  });

  context('Methods Test', () => {
    it('can set Types', () => {
      const types = Types.string({ default_value: 'Hello World!' });
      GolguaTypesStore.setTypes(types, 'string');
      assert.ok('setted types');
    });

    it('can set callback', () => {
      GolguaTypesStore.setCallback(() => {});
      assert.ok('setted callback');
    });

    it('can get store value', () => {
      const str_types = Types.string({ default_value: 'Hello' });
      const num_types = Types.number({ default_value: 102 });
      GolguaTypesStore.setTypes(str_types, 'str');
      GolguaTypesStore.setTypes(num_types, 'num');

      const store_value = GolguaTypesStore.getStoreValue();

      assert.deepEqual({ str: 'Hello', num: 102 }, store_value);
    });

    it('can get store value with types', () => {
      const str_types = Types.string({ default_value: 'Hello' });
      const num_types = Types.number({ default_value: 102 });
      GolguaTypesStore.setTypes(str_types, 'str');
      GolguaTypesStore.setTypes(num_types, 'num');

      const store_value = GolguaTypesStore.getStoreValueWithTypes(num_types);

      assert.deepEqual({ num: 102 }, store_value);
    });
  });
});
