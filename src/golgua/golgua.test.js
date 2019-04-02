import { Types } from '../types/Types';
import { GolguaTypesStore } from '../store/TypesStore';
import {
  update,
  subscription,
  getStoreValue,
  addEventListener,
} from './Golgua';
import chai from 'chai';

/* eslint-env mocha */

const assert = chai.assert;

describe('Golgua API Test', () => {
  const types = Types.object({
    name: 'user',
    types: {
      string: Types.string(),
      number: Types.number(),
      boolean: Types.boolean(),
      array: Types.array({ types: Types.string() }),
    },
    dispatch: (store, v) => ({
      name: v.string,
      age: v.number,
      male: v.boolean,
      task: v.array,
    }),
  });

  beforeEach(() => {
    GolguaTypesStore.reset();
    subscription(types);
  });

  context('subscription API', () => {
    it('Successful subscription', () => {
      subscription(types, 'test');
      assert.ok('success', 'Successful subscription');
    });

    it('Throw Error', () => {
      assert.throw(() => subscription({}));
    });
  });

  context('getStoreValue function', () => {
    it('returns state value', () => {
      assert.deepEqual(getStoreValue(), { user: null });
    });
  });

  context('update API', () => {
    it('can update Store Value', () => {
      update({
        string: 'Nick',
        number: 10,
        boolean: true,
        array: ['Buy shoes'],
      });

      assert.deepEqual(getStoreValue(), {
        user: { name: 'Nick', age: 10, male: true, task: ['Buy shoes'] },
      });
    });

    it("can't update Store Value", () => {
      update({
        number: 'Nick',
        string: 10,
        array: true,
        boolean: ['Buy shoes'],
      });

      assert.deepEqual(getStoreValue(), { user: null });
    });
  });

  context('setUpdateListener API', () => {
    context('When updated event', () => {
      it('will execute the configured callback', done => {
        addEventListener('updated', (value, type_name, store) => {
          assert.deepEqual(store, { user: value });
          assert.equal('user', type_name);
          done();
        });

        update({
          string: 'Nick',
          number: 10,
          boolean: true,
          array: ['Buy shoes'],
        });
      });

      it('does not execute callbacks', () => {
        addEventListener('updated', () => {
          throw new Error('The callback should not be executed.');
        });

        update({
          str: 'Nick',
          num: 10,
          bool: true,
          array: ['Buy shoes'],
        });

        assert.ok('ok');
      });
    });
    context('When fail event', () => {
      it('will execute the configured callback', done => {
        const update_value = {
          number: 'Nick',
          string: 10,
          array: true,
          boolean: ['Buy shoes'],
        };

        addEventListener('fail', value => {
          assert.deepEqual(update_value, value);
          done();
        });

        update(update_value);
      });

      it('does not execute callbacks', () => {
        addEventListener('fail', () => {
          throw new Error('The callback should not be executed.');
        });

        update({
          string: 'Nick',
          number: 10,
          boolean: true,
          array: ['Buy shoes'],
        });

        assert.ok('ok');
      });
    });
  });
});
