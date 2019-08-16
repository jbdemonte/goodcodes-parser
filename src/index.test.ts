import { parse } from './index';

test('File name', () => {
  const result = parse('Sonic The Hedgehog (W).gen');
  expect(result.file).toEqual('Sonic The Hedgehog (W).gen');
});

test('Cleaned File name', () => {
  const result = parse('Sonic The Hedgehog (W).gen');
  expect(result.cleaned).toEqual('Sonic The Hedgehog.gen');
});

test('ROM name', () => {
  const result = parse('Sonic The Hedgehog (W).gen');
  expect(result.rom).toEqual('Sonic The Hedgehog');
});

describe('unknown', () => {
  it('stay undefined', () => {
    const result = parse(` Bahamut Lagoon (J) [T+FreBeta4_Terminus].smc`);
    expect(result.unknown).not.toBeDefined();
  });

  it('add some unknown tags', () => {
    const result = parse(`Addams Family, The (Beta) (XYZ1.2) [b] [UI]`);
    expect(result.unknown).toEqual(expect.objectContaining(['(XYZ1.2)', '[UI]']));
  });
});

test('default language', () => {
  const result = parse('Sonic The Hedgehog (W).gen');
  expect(result.codes.languages).toEqual([{ code: 'Eng', name: 'English' }]);
});
