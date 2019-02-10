import chai from 'chai';
import { Maker } from './maker';
import { State } from '../state/state';
import { Types } from '../types/types';

/* eslint-disable */

const assert = chai.assert;

describe('Maker Test', () => {
  class TestState extends State {
    constructor() {
      super();
      this.types = {
        message: Types.string({ default_value: 'default_message' }),
      };
    }
  }

  context('update State', () => {
    class UpdateTestState extends State {
      constructor() {
        super();

        this.types = {
          string: Types.string({ default_value: 'hello' }),
          number: Types.number({ default_value: 0 }),
          boolean: Types.boolean({ default_value: false }),
          object: Types.object({ types: { hello: Types.string() } }),
          array: Types.array({ types: Types.string() }),
        };
      }
    }

    const update_value = {
      string: 'hoge',
      number: 12,
      boolean: true,
      object: { hello: 'hello' },
      array: ['test'],
    };

    it('callback is executed', done => {
      const maker = new Maker(UpdateTestState);

      maker.listen(value => {
        assert.deepEqual(value, update_value);
        done();
      });

      const sub = maker.update(update_value);
      assert.isFunction(sub);
    });

    it('callback is executed', done => {
      const maker = new Maker(UpdateTestState);

      maker.listen(value => {
        assert.deepEqual(value, update_value);
        done();
      });

      maker.update(update_value);
    });

    it('callback is not executed', () => {
      const maker = new Maker(UpdateTestState);
      const sub = maker.listen(value => {
        throw new Error('callback is executed');
      });
      sub();
      maker.update(update_value);
    });

    it('state has been updated', () => {
      const maker = new Maker(UpdateTestState);
      const before = maker.getStateValue();

      maker.update(update_value);

      assert.notDeepEqual(before, maker.getStateValue());
    });

    it('state is not updated', () => {
      const maker = new Maker(UpdateTestState);
      maker.listen(value => {
        throw new Error("it's wrong for callback to be executed.");
      });
      maker.update(null);
    });

    context('throw error', () => {
      const maker = new Maker(UpdateTestState);

      it('is invalid type', () => {
        assert.throw(() => {
          maker.update({
            string: update_value.array,
            number: update_value.object,
            boolean: update_value.string,
            object: update_value.number,
            array: update_value.boolean,
          });
        });
      });

      it('contains unrelated values', () => {
        const unrelated_values = Object.assign({}, update_value);
        unrelated_values.hoge = 'hogeghoge';
        assert.throw(() => maker.update(unrelated_values));
      });

      it('passed empty value or not object value', () => {
        assert.throw(() => maker.update({}));
        assert.throw(() => maker.update(123));
        assert.throw(() => maker.update('test'));
      });
    });
  });

  context('Update State with TypesClass', () => {
    class TypesTestState extends State {
      constructor() {
        super();

        this.types = {
          info: TestState,
        };
      }
    }

    const update_value = {
      info: {
        message: 'hello world!!',
      },
    };

    it('updated value', done => {
      const maker = new Maker(TypesTestState);

      maker.listen(value => {
        assert.deepEqual(value, update_value);
        done();
      });

      maker.update(update_value);
    });
  });
});

/* eslint-disable */
