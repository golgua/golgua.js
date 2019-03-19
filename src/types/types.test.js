import { Types } from './Types';
import { StringTypes, NumberTypes, BooleanTypes } from './PrimeTypes';
import { ObjectTypes, ArrayTypes } from './ObjectLikeTypes';
import chai from 'chai';

const assert = chai.assert;

/* eslint-env mocha */

describe('Types Test', () => {
  it('create type instance', () => {
    assert.instanceOf(Types.string(), StringTypes);
    assert.instanceOf(Types.number(), NumberTypes);
    assert.instanceOf(Types.boolean(), BooleanTypes);
    assert.instanceOf(
      Types.object({ types: { message: Types.string() } }),
      ObjectTypes
    );
    assert.instanceOf(Types.array({ types: Types.string() }), ArrayTypes);
  });
});
