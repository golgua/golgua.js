import { StringTypes, NumberTypes, BooleanTypes } from './PrimeTypes';
import chai from 'chai';

const assert = chai.assert;

/* eslint-env mocha */

describe('Primitive Types', () => {
  context('String Types', () => {
    context('default value', () => {
      it('can set', () => {
        const nullStrTypes = new StringTypes({});
        const strTypes = new StringTypes({ default_value: 'setting value.' });

        assert.isNull(nullStrTypes.defaultValue());
        assert.equal(strTypes.defaultValue(), 'setting value.');
      });

      it("can't set", () => {
        assert.throw(() => new StringTypes({ default_value: 0 }));
        assert.throw(() => new StringTypes({ default_value: false }));
        assert.throw(() => new StringTypes({ nullable: false }));
      });
    });

    context('check function', () => {
      let strTypes;
      let notNullStrTypes;

      before(() => {
        strTypes = new StringTypes({ pattern: v => v.length < 10 });
        notNullStrTypes = new StringTypes({
          nullable: false,
          default_value: '',
        });
      });

      it('when True', () => {
        assert.isTrue(strTypes.check('str'));
        assert.isTrue(strTypes.check(null));
      });

      it('when False', () => {
        assert.isFalse(strTypes.check('0123456789'));
      });

      it('when throw error', () => {
        assert.throw(() => strTypes.check(0));
        assert.throw(() => strTypes.check(false));
        assert.throw(() => notNullStrTypes.check(null));
      });
    });
  });

  context('Number Types', () => {
    context('default value', () => {
      it('can set', () => {
        const nullNumTypes = new NumberTypes({});
        const numTypes = new NumberTypes({ default_value: 1000 });

        assert.isNull(nullNumTypes.defaultValue());
        assert.equal(numTypes.defaultValue(), 1000);
      });

      it("can't set", () => {
        assert.throw(() => new NumberTypes({ default_value: '' }));
        assert.throw(() => new NumberTypes({ default_value: false }));
        assert.throw(() => new NumberTypes({ nullable: false }));
      });
    });

    context('check function', () => {
      let numTypes;
      let notNullNumTypes;

      before(() => {
        numTypes = new NumberTypes({ pattern: v => v < 1000 });
        notNullNumTypes = new NumberTypes({
          nullable: false,
          default_value: 0,
        });
      });

      it('when True', () => {
        assert.isTrue(numTypes.check(100));
        assert.isTrue(numTypes.check(null));
      });

      it('when False', () => {
        assert.isFalse(numTypes.check(100000));
      });

      it('when throw error', () => {
        assert.throw(() => numTypes.check(''));
        assert.throw(() => numTypes.check(false));
        assert.throw(() => notNullNumTypes.check(null));
      });
    });
  });

  context('Boolean Types', () => {
    context('default value', () => {
      it('can set', () => {
        const nullBoolTypes = new BooleanTypes({});
        const boolTypes = new BooleanTypes({ default_value: false });

        assert.isNull(nullBoolTypes.defaultValue());
        assert.equal(boolTypes.defaultValue(), false);
      });

      it("can't set", () => {
        assert.throw(() => new BooleanTypes({ default_value: 0 }));
        assert.throw(() => new BooleanTypes({ default_value: '' }));
        assert.throw(() => new BooleanTypes({ nullable: false }));
      });
    });

    context('check function', () => {
      let boolTypes;
      let notNullBoolTypes;

      before(() => {
        boolTypes = new BooleanTypes({ pattern: v => v === false });
        notNullBoolTypes = new BooleanTypes({
          nullable: false,
          default_value: false,
        });
      });

      it('when True', () => {
        assert.isTrue(boolTypes.check(false));
        assert.isTrue(boolTypes.check(null));
      });

      it('when False', () => {
        assert.isFalse(boolTypes.check(true));
      });

      it('when throw error', () => {
        assert.throw(() => boolTypes.check(0));
        assert.throw(() => boolTypes.check(''));
        assert.throw(() => notNullBoolTypes.check(null));
      });
    });
  });
});
