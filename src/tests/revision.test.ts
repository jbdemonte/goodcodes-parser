import { parse } from '../index';

test('undefined', () => {
  const result = parse('Alien Soldier (E) [b1].gen');
  expect(result.codes.revision).toEqual(undefined);
});

test('REV03', () => {
  const result = parse('Alien 3 (UE) (REV03) [h1C][o1].gen');
  expect(result.codes.revision).toEqual(3);
});
