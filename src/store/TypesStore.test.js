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
    context('setTypes function', () => {
      it('can set Types', () => {
        const types = Types.string({ name: 'test', store: 'Hello' });
        GolguaTypesStore.setTypes(types);
        assert.deepEqual(GolguaTypesStore.Store, { test: 'Hello' });
      });
    });

    context('addCallback function', () => {
      it('can set callback', () => {
        GolguaTypesStore.addCallback('updated', () => {});
        GolguaTypesStore.addCallback('fail', () => {});
        assert.ok('setted callback');
      });
    });

    context('updateStoreValue', () => {
      it('can execute callback of updated event', done => {
        GolguaTypesStore.addCallback('updated', () => done());
        GolguaTypesStore.updateStoreValue('test', 'Hello');
      });

      it('can update the Store Value', () => {
        const before = GolguaTypesStore.Store.test;
        GolguaTypesStore.updateStoreValue('test', 'Hello');
        const after = GolguaTypesStore.Store.test;

        assert.notEqual(before, after);
      });
    });
  });
});
