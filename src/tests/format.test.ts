import { parse } from '../index';

test('undefined', () => {
  const result = parse("Micro Machines - Turbo Tournament '96 (V1.1) (E) (J-Cart) [h1C].gen");
  expect(result.codes.format).toEqual(undefined);
});

test('PAL', () => {
  const result = parse('Super Metroid - Expert Edition (PAL) by Dark Knight Kain (Hack).smc');
  expect(result.codes.format).toEqual({ pal: true });
});

test('NTSC', () => {
  const result = parse('Super Metroid - Expert Edition (NTSC) by Dark Knight Kain (Hack).smc');
  expect(result.codes.format).toEqual({ ntsc: true });
});
