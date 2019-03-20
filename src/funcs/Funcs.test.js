import * as $$ from './Funcs';
import chai from 'chai';

/* eslint-env mocha */

const assert = chai.assert;

describe('Check Function Test', () => {
  context('isObject', () => {
    it('when True', () => {
      assert.isTrue($$.isObject({}));
    });

    it('when False', () => {
      assert.isFalse($$.isObject(1));
      assert.isFalse($$.isObject(''));
      assert.isFalse($$.isObject([]));
      assert.isFalse($$.isObject(null));
      assert.isFalse($$.isObject(undefined));
      assert.isFalse($$.isObject(function() {}));
    });
  });

  context('isPrimitive', () => {
    it('when True', () => {
      assert.isTrue($$.isPrimitive(100));
      assert.isTrue($$.isPrimitive('test'));
      assert.isTrue($$.isPrimitive(true));
      assert.isTrue($$.isPrimitive(Symbol('hello')));
      assert.isTrue($$.isPrimitive(null));
      assert.isTrue($$.isPrimitive(undefined));
    });

    it('when False', () => {
      assert.isFalse($$.isPrimitive({}));
      assert.isFalse($$.isPrimitive([]));
      assert.isFalse($$.isPrimitive(function() {}));
    });
  });

  context('isEmpty', () => {
    it('when True', () => {
      assert.isTrue($$.isEmpty({}));
      assert.isTrue($$.isEmpty([]));
      assert.isTrue($$.isEmpty(''));
      assert.isTrue($$.isEmpty(1));
      assert.isTrue($$.isEmpty(Symbol()));
      assert.isTrue($$.isEmpty(function() {}));
      assert.isTrue($$.isEmpty(null));
    });

    it('when False', () => {
      assert.isFalse($$.isEmpty({ foo: 'bar' }));
      assert.isFalse($$.isEmpty(['hello']));
      assert.isFalse($$.isEmpty('hello world'));
      assert.isFalse($$.isEmpty(undefined));
    });
  });
});

describe('Conversion Function Test', () => {
  context('clone function', () => {
    it('deep copy', () => {
      const obj = { mes: { text: 'Hello' }, list: ['World'] };
      const copy = $$.clone(obj);

      copy.mes.text = 'Hoge';
      copy.list[0] = 'Hoge';

      assert.isFalse(obj.mes.text === copy.mes.text);
      assert.isFalse(obj.list[0] === copy.list[0]);
    });

    it('shallow coy', () => {
      const func = function() {};
      const copy = $$.clone(func);

      assert.isTrue(func === copy);
    });
  });
});

describe('other test', () => {
  context('getUniqueId function', () => {
    it('return unique value', () => {
      const list = {};
      let times = 10000;

      while (times--) {
        list[$$.getUniqueId()] = true;
      }

      const len = Object.keys(list).length;

      assert.equal(len, 10000);
    });
  });

  context('size funcrion', () => {
    it('object length', () => {
      assert.equal($$.size({ a: 1, b: 2 }), 2);
      assert.equal($$.size([1, 2, 33]), 3);
      assert.equal($$.size(null), 0);
      assert.equal($$.size(false), 0);
    });
  });
});

/* eslint-disable */
