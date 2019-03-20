import { Types } from '../types/Types';
import { subscription, update, updateWithTypes } from './Golgua';
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
      subscription(types);

      const result = update({
        string: 'Nick',
        number: 10,
        boolean: true,
        array: ['Buy shoes'],
      });

      assert.deepEqual(result, {
        success: true,
        data: { name: 'Nick', age: 10, male: true, task: ['Buy shoes'] },
      });
    });

    it('Throw Error', () => {
      assert.throw(() => subscription({}));
    });
  });

  context('update API', () => {
    before(() => subscription(types));

    it('can update Store Value', () => {
      const result = update({
        string: 'Nick',
        number: 10,
        boolean: true,
        array: ['Buy shoes'],
      });

      assert.deepEqual(result, {
        success: true,
        data: { name: 'Nick', age: 10, male: true, task: ['Buy shoes'] },
      });
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
    before(() => subscription(types));

    it('can update Store Value', () => {
      const result = updateWithTypes(types, {
        string: 'Nick',
        number: 10,
        boolean: true,
        array: ['Buy shoes'],
      });

      assert.deepEqual(result, {
        success: true,
        data: { name: 'Nick', age: 10, male: true, task: ['Buy shoes'] },
      });
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
});
