import { Types } from './Types';
import { StringTypes, NumberTypes, BooleanTypes } from './PrimeTypes';
import { ObjectTypes, ArrayTypes } from './ObjectLikeTypes';
import chai from 'chai';
import { TypesBase } from './TypesBase';

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

  it('inherits from TypesBase', () => {
    assert.instanceOf(Types.string(), TypesBase);
    assert.instanceOf(Types.number(), TypesBase);
    assert.instanceOf(Types.boolean(), TypesBase);
    assert.instanceOf(
      Types.object({ types: { message: Types.string() } }),
      TypesBase
    );
    assert.instanceOf(Types.array({ types: Types.string() }), TypesBase);
  });
});
