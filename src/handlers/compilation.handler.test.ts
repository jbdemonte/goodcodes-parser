import { parse } from '../index';

test('undefined', () => {
  const result = parse("Micro Machines - Turbo Tournament '96 (V1.1) (E) (J-Cart) [h1C].gen");
  expect(result.codes.compilation).toEqual(undefined);
});

test('Compilation', () => {
  const result = parse('Sonic Classics (Compilation) (E) (REV00) - Skip to Dr.R by Leon (Hack).gen');
  expect(result.codes.compilation).toEqual(true);
});
