import { parse } from '../index';

test('undefined', () => {
  const result = parse('Super Pro Fighter Q+ BIOS [a1].smc');
  expect(result.codes.countries).toEqual(undefined);
});

test('simple country', () => {
  const result = parse('Sonic The Hedgehog (W) (REV00) [h1C].gen');
  expect(result.codes.countries).toEqual([{ code: 'W', name: 'World' }]);
});

test('compound countries', () => {
  const result = parse("Knuckles' Chaotix (32X) (JU) [f1].32x");
  expect(result.codes.countries).toEqual([{ code: 'J', name: 'Japan' }, { code: 'U', name: 'USA' }]);
});

test('avoid country mismatch', () => {
  // Alpha should not be taken as (A)
  const result = parse('WWF Wrestlemania Arcade (Alpha) [!].gen');
  expect(result.codes.countries).toEqual(undefined);
});

test('full country names', () => {
  const result = parse('Great Volleyball (USA, Europe).zip');
  expect(result.codes.countries).toEqual([{ code: 'U', name: 'USA' }, { code: 'E', name: 'Europe' }]);
});

test('does not overmatch', () => {
  const result = parse('example (AZ).zip');
  expect(result.codes.countries).toEqual(undefined);
});

test('identify long before short', () => {
  const result = parse('example (UK).32x');
  expect(result.codes.countries).toEqual([{ code: 'UK', name: 'United Kingdom' }]);
});
