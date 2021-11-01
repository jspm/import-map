import { deepStrictEqual } from 'assert';
import { resolveConditional } from '@jspm/import-map';

function conditionEquals (actual, expected) {
  deepStrictEqual(actual, expected);
  deepStrictEqual(Object.keys(actual), Object.keys(expected));
}

export default function () {
  // basic example
  conditionEquals(resolveConditional({
    default: './default',
    other: './other'
  }), './default');

  // include and exclude
  conditionEquals(resolveConditional({ a: './a', b: { b: './b' } }, { include: ['b'] }), { a: './a', b: './b' });
  conditionEquals(resolveConditional({ a: './a', b: { b: './b' } }, { exclude: ['b'] }), { a: './a' });
  conditionEquals(resolveConditional({ a: './a', b: { b: './b' } }, { exclude: ['b'], include: ['a'] }), './a');
  conditionEquals(resolveConditional({ a: { b: './b', a: './a' }, b: { b: './b' } }, { include: ['a'] }), { b: './b', a: './a' });
  conditionEquals(resolveConditional({ b: { b: './b' }, a: { b: './b', a: './a' } }, { include: ['a'] }), { b: './b', a: './a' });

  // covers
  conditionEquals(resolveConditional({ b: { b: './b' }, a: { b: './b', a: './a' }, c: './c', d: './d' }, { covers: [['a', 'b']] }), { b: './b', a: './a' });
  conditionEquals(resolveConditional({ b: { b: './b' }, a: { b: './b', a: './a' }, c: './c', d: './d' }, { exclude: ['b'], covers: [['a', 'b']] }), { a: './a' });
  conditionEquals(resolveConditional({ b: { b: './b' }, a: { b: './b', a: './a' }, c: './c', d: './d' }, { exclude: ['b'], covers: [['a', 'b', 'c']] }), { a: './a', c: './c' });
}
