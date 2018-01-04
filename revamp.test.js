const revamp = require('./index');
const fromJS = require('immutable').fromJS

const srcSample1 = {
  a: 42,
  b: 'hello',
  c: 'world',
  d: ['ping', 'pong'],
  e: {
    f: 'nested'
  }
}

describe('extract falsy values testing', () => {

  test('extract from null source', () => {
    const res = revamp.extract(null, ['a', 'b', 'c'])
    expect(res).toEqual({})
  });

  test('extract with null shape', () => {
    const res = revamp.extract(srcSample1, null)
    expect(res).toEqual({})
  });

  test('extract non-existing key in source', () => {
    const res = revamp.extract(srcSample1, {
      nonExisting: 'z'
    })
    expect(res).toEqual({nonExisting: undefined})
  });

  test('extract key in non-object source (string)', () => {
    const res = revamp.extract(srcSample1, { nonExisting: 'b.c'})
    expect(res).toEqual({nonExisting: undefined})
  });

  test('extract key in non-object source (value)', () => {
    const res = revamp.extract(srcSample1, { nonExisting: 'a.b'})
    expect(res).toEqual({nonExisting: undefined})
  });

  test('extract non-existing nested key in source', () => {
    const res = revamp.extract(srcSample1, {
      nonExistingNested: 'e.z'
    })
    expect(res).toEqual({nonExistingNested: undefined})
  });

})

describe('extract usage examples', () => {

  test('simple extract', () => {
    const src = {
      a: 'ping',
      b: 42,
      c: 'unwanted'
    }
    const expected = {
      a: 'ping',
      b: 42
    }
    expect(revamp.extract(src, {
      a: 'a', b: 'b'
    })).toEqual(expected)
  });

  test('extract single key', () => {
    const res = revamp.extract(srcSample1, {a: 'a'})
    expect(res).toEqual({a: 42})
  });

  test('extract and rename single key', () => {
    const res = revamp.extract(srcSample1, {fortyTwo: 'a'})
    expect(res).toEqual({fortyTwo: 42})
  });

  test('extract and rename multiple keys', () => {
    const res = revamp.extract(srcSample1, {h: 'b', w: 'c'})
    expect(res).toEqual({h: 'hello', w: 'world'})
  });

  test('extract and rename nested key', () => {
    const res = revamp.extract(srcSample1, {nestedKeyNewName: 'e.f'})
    expect(res).toEqual({nestedKeyNewName: 'nested'})
  });

  test('extract and rename multiple keys (existing or not)', () => {
    const res = revamp.extract(srcSample1, {
      nestedKeyNewName: 'e.f',
      fortyTwo: 'a',
      nonExisting: 'z',
      nonExistingNested: 'e.f.z.y'
    })
    expect(res).toEqual({
      nestedKeyNewName: 'nested',
      fortyTwo: 42,
      nonExisting: undefined,
      nonExistingNested: undefined
    })
  });

  test('extract and rename multiple keys (even from array)', () => {
    const src = {
      a: 42,
      b: {
        w:'pong'
      },
      c: ['hello','world'],
      d: 'another value'
    };
    const res = revamp.extract(src, {
      fortyTwo: 'a',
      ping: 'b.w',
      arrayVal: 'c.0'
    })
    expect(res).toEqual({
      fortyTwo: 42,
      ping: 'pong',
      arrayVal: 'hello'
    })
  });

})


describe('pick falsy values testing', () => {

  test('pick from null source', () => {
    const res = revamp.pick(null, ['a', 'b', 'c'])
    expect(res).toEqual({})
  });

  test('pick with null picker', () => {
    const res = revamp.pick({a: 42, b: 'hello'}, null)
    expect(res).toEqual({})
  });

  test('pick with empty picker', () => {
    const res = revamp.pick({a: 42, b: 'hello'}, [])
    expect(res).toEqual({})
  });

  test('pick non-existing key in source', () => {
    const res = revamp.pick({a: 42, b: 'hello'}, ['c'])
    expect(res).toEqual({c: undefined})
  });

  test('pick with non-array picker (no matching values in picker)', () => {
    const res = revamp.pick({a: 42, b: 'hello'}, {a:42})
    expect(res).toEqual({})
  });

  test('pick with non-array picker (works, but not recommended as result can be confusing)', () => {
    const res = revamp.pick({a: 42, b: 'hello'}, {a:'b'})
    expect(res).toEqual({b: 'hello'})
  });

});

describe('pick usage examples', () => {

  test('pick single value from source', () => {
    const res = revamp.pick(srcSample1, ['a'])
    expect(res).toEqual({a: 42})
  });

  test('pick string from source', () => {
    const res = revamp.pick(srcSample1, ['b'])
    expect(res).toEqual({b: 'hello'})
  });

  test('pick array from source', () => {
    const res = revamp.pick(srcSample1, ['d'])
    expect(res).toEqual({d: ['ping', 'pong']})
  });

  test('pick object from source', () => {
    const res = revamp.pick(srcSample1, ['e'])
    expect(res).toEqual({e: {f: 'nested'}})
  });

  test('pick multiple keys from source', () => {
    const res = revamp.pick(srcSample1, ['b', 'c'])
    expect(res).toEqual({b: 'hello', c: 'world'})
  });

  test('pick all keys from source', () => {
    const res = revamp.pick(srcSample1, ['a', 'b', 'c', 'd', 'e'])
    expect(res).toEqual(srcSample1)
  });
});