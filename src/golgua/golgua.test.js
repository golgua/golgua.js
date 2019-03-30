import { Types } from '../types/Types';
import {
  subscription,
  update,
  updateWithTypes,
  setUpdateListener,
} from './Golgua';
import chai from 'chai';

/* eslint-env mocha */

const assert = chai.assert;

describe('Golgua API Test', () => {
  const types = Types.object({
    types: {
      string: Types.string(),
      number: Types.number(),
      boolean: Types.boolean(),
      array: Types.array({ types: Types.string() }),
    },
    proc: v => ({
      name: v.string,
      age: v.number,
      male: v.boolean,
      task: v.array,
    }),
  });

  context('subscription API', () => {
    it('Successful subscription', () => {
      subscription(types, 'test');
      assert.ok('success', 'Successful subscription');
    });

    it('Throw Error', () => {
      assert.throw(() => subscription({}));
      assert.throw(() => subscription(types));
    });
  });

  context('update API', () => {
    before(() => subscription(types, 'update_api'));

    it('can update Store Value', () => {
      const result = update({
        string: 'Nick',
        number: 10,
        boolean: true,
        array: ['Buy shoes'],
      });

      assert.deepEqual(
        {
          success: true,
          data: { name: 'Nick', age: 10, male: true, task: ['Buy shoes'] },
        },
        result
      );
    });

    it("can't update Store Value", () => {
      const result = update({
        number: 'Nick',
        string: 10,
        array: true,
        boolean: ['Buy shoes'],
      });

      assert.deepEqual(result, {
        success: false,
        data: {
          number: 'Nick',
          string: 10,
          array: true,
          boolean: ['Buy shoes'],
        },
      });
    });
  });

  context('updateWithTypes API', () => {
    before(() => subscription(types, 'update_with_types_api'));

    it('can update Store Value', () => {
      const result = updateWithTypes(types, {
        string: 'Nick',
        number: 10,
        boolean: true,
        array: ['Buy shoes'],
      });

      assert.deepEqual(
        {
          success: true,
          data: { name: 'Nick', age: 10, male: true, task: ['Buy shoes'] },
        },
        result
      );
    });

    it("can't update Store Value", () => {
      const result = updateWithTypes(types, {
        number: 'Nick',
        string: 10,
        array: true,
        boolean: ['Buy shoes'],
      });

      assert.deepEqual(result, {
        success: false,
        data: {
          number: 'Nick',
          string: 10,
          array: true,
          boolean: ['Buy shoes'],
        },
      });
    });
  });

  context('setUpdateListener API', () => {
    before(() => subscription(types, 'user'));

    it('will execute the configured callback', done => {
      setUpdateListener(store_value => {
        assert.deepEqual(store_value, {
          user: { name: 'Nick', age: 10, male: true, task: ['Buy shoes'] },
        });

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
      setUpdateListener(() => {
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
});
