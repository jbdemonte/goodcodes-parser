import { parse } from '../index';

test('undefined', () => {
  const result = parse('Alien Soldier (E) [b1].gen');
  expect(result.codes.revision).toEqual(undefined);
});

test('(REV03)', () => {
  const result = parse('Alien 3 (UE) (REV03) [h1C][o1].gen');
  expect(result.codes.revision).toEqual(3);
});

test('(REVA)', () => {
  const result = parse('Action 52 (Active Enterprises) (REVA) [!].nes');
  expect(result.codes.revision).toEqual(1);
});

test('(Rev D)', () => {
  const result = parse('Alien 3 (UE) (Rev D) [h1C][o1].gen');
  expect(result.codes.revision).toEqual(4);
});

test('(PRG0)', () => {
  const result = parse('Untouchables, The (U) (PRG0) [!].nes');
  expect(result.codes.revision).toEqual(0);
});

test('(PRG1)', () => {
  const result = parse('Untouchables, The (U) (PRG1) [!].nes');
  expect(result.codes.revision).toEqual(1);
});
