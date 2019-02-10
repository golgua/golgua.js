import chai from 'chai';
import { GolguaManager } from './golgua';
import { Maker } from '../maker/maker';
import { Types } from '../types/types';
import { State } from '../state/state';

/* eslint-disable */

const assert = chai.assert;

describe('GolguaManager Test', () => {
  class TestState extends State {
    constructor() {
      super();
      this.types = Types.string();
    }
  }

  let maker = null;
  let state = null;

  beforeEach(() => {
    GolguaManager.makers = {};
    GolguaManager.states = {};

    maker = new Maker(TestState);
    state = maker.__state;
  });

  context('addMaker', () => {
    it('can add', () => {
      const id = GolguaManager.addMaker(maker);

      assert.isString(id);
      assert.equal(GolguaManager.makers[id], maker);
    });
  });

  context('addState', () => {
    it('can add', () => {
      const id = GolguaManager.addState(state);

      assert.isString(id);
      assert.deepEqual(GolguaManager.states[id], { state, parent: null });
    });
  });

  context('searchMaker', () => {
    it('can get', () => {
      const _maker = GolguaManager.searchMaker(TestState);
      assert.equal(maker, _maker);
    });

    it('throw error', () => {
      assert.throw(() => GolguaManager.searchMaker(null));
      assert.throw(() => GolguaManager.searchMaker(State));
    });
  });

  context('searchState', () => {
    it('can get', () => {
      const _state = GolguaManager.searchState(TestState);
      assert.equal(state, _state);
    });

    it('throw error', () => {
      assert.throw(() => GolguaManager.searchState(null));
      assert.throw(() => GolguaManager.searchState(State));
    });
  });

  context('searchStateAll', () => {
    it('can get', () => {
      new Maker(TestState);
      new Maker(TestState);
      new Maker(TestState);

      const list = GolguaManager.searchStateAll(TestState);

      assert.lengthOf(list, 4);
    });

    it('empty list', () => {
      class Test2State extends State {}
      const list = GolguaManager.searchStateAll(Test2State);
      assert.isEmpty(list);
    });
  });

  context('searchById', () => {
    it('can get maker', () => {
      const _maker = GolguaManager.searchById(maker.__id);
      assert.equal(maker, _maker);
    });

    it('can get state', () => {
      const _state = GolguaManager.searchById(state.__id);
      assert.deepEqual(_state, { state, parent: null });
    });
  });
});

/* eslint-disable */
