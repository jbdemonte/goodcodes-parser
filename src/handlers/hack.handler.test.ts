import { parse } from '../index';

test('Hack with original name', () => {
  const result = parse(`Teknoid (Arkanoid Hack).nes`);
  expect(result.codes.hack).toEqual(true);
});

test('Hack without original name', () => {
  const result = parse(`Blades of Steel - S. American Championship (Hack).nes`);
  expect(result.codes.hack).toEqual(true);
});

test('No hack', () => {
  const result = parse(`Wayne's World (U) [!].nes`);
  expect(result.codes.hack).toBe(undefined);
});
