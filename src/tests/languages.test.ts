import { parse } from '../index';

test('undefined', () => {
  const result = parse('Alien Soldier (E) [b1].gen');
  expect(result.codes.languages).toEqual(undefined);
});

test('M2', () => {
  const result = parse('Metal Head (32X) (E) (M2) [!].gen');
  expect(result.codes.languages).toEqual(2);
});
