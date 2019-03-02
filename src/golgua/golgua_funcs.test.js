import chai from 'chai';
import { State } from '../state/state';
import { createState, updateState } from './golgua_funcs';
import { Types } from '../types/types';

/* eslint-disable */

const assert = chai.assert;

describe('golgua_funcs', () => {
  class TestState extends State {
    constructor() {
      super();
      this.types = Types.string();
    }
  }

  context('createState', () => {
    it('return State instance', () => {
      const state = createState(TestState);
      assert.instanceOf(state, TestState);
    });

    it('throw error', () => {
      class ThrowState extends State {}
      assert.throw(() => createState(ThrowState));
      assert.throw(() => createState({}));
    });

    it('set initialize value', done => {
      class InitState extends State {
        constructor() {
          super();
          this.types = Types.string();
        }

        init() {
          return new Promise(re => {
            setTimeout(re, 100, 'initialize value');
          });
        }
      }

      createState(InitState, (value, state) => {
        assert.equal(state.state, value);
        assert.equal(state.__state, value);
        done();
      });
    });
  });

  context('updateState', () => {
    it('return updated value', () => {
      const state = createState(TestState);
      const value = updateState('updated value', state);

      assert.equal(state.state, value);
      assert.equal(state.__state, value);
    });

    it('callback is executed', done => {
      const state = createState(TestState);

      updateState('updated value', state, (updated_value, _state) => {
        assert.equal(state, _state);
        assert.equal(updated_value, 'updated value');
        done();
      });
    });

    it('throw error', () => {
      const state = createState(TestState);
      assert.throw(() => updateState(0, state));
      assert.throw(() => updateState(false, state));
      assert.throw(() => updateState('hoge', null));
    });
  });
});

/* eslint-disable */
