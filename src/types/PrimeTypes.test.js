import { StringTypes, NumberTypes, BooleanTypes } from './PrimeTypes';
import chai from 'chai';

const assert = chai.assert;

/* eslint-env mocha */

describe('Primitive Types', () => {
  describe('String Types', () => {
    context('check function', () => {
      it('return Boolean', () => {
        const normalStrTypes = new StringTypes({});

        assert.isTrue(normalStrTypes.__check__('string'));
        assert.isFalse(normalStrTypes.__check__(1000));
      });
    });
  });

  describe('Number Types', () => {
    context('check function', () => {
      it('return Boolean', () => {
        const normalNumTypes = new NumberTypes({});

        assert.isTrue(normalNumTypes.__check__(1000));
        assert.isFalse(normalNumTypes.__check__('string'));
      });
    });
  });

  describe('Boolean Types', () => {
    context('check function', () => {
      it('return Boolean', () => {
        const normalBoolTypes = new BooleanTypes({});

        assert.isTrue(normalBoolTypes.__check__(false));
        assert.isFalse(normalBoolTypes.__check__('string'));
      });
    });
  });
});
