import { parse } from '../index';

test('undefined', () => {
  const result = parse('Super Pro Fighter Q+ BIOS [a1].gen');
  expect(result.codes.translation).toEqual(undefined);
});

test('translation simple, latest', () => {
  const result = parse('Flintstones, The (U) [T+Rus].gen');
  expect(result.codes.translation).toEqual({ name: 'Russian', code: 'Rus', latest: true, author: '', percent: '', version: '' });
});

test('translation with percent', () => {
  const result = parse("Disney's Aladdin (U) [T+Ger98.5%].gen");
  expect(result.codes.translation).toEqual({ name: 'German', code: 'Ger', percent: '98.5%', latest: true, author: '', version: '' });
});

test('translation with author', () => {
  const result = parse('Lost Vikings, The (Beta) [h1C][T+Ser_Mad Fox].gen');
  expect(result.codes.translation).toEqual({ name: 'Serbian', code: 'Ser', author: 'Mad Fox', latest: true, percent: '', version: '' });
});

test('translation with author without _', () => {
  const result = parse('Alien 3 (U) [T+Ger099beta].gen');
  expect(result.codes.translation).toEqual({ name: 'German', code: 'Ger', author: 'beta', version: '099', latest: true, percent: '' });
});

test('translation with author & percent', () => {
  const result = parse('Langrisser II (J) (REV01) [T+Eng100%_HiryuuHonyaku&NoPrgress].gen');
  expect(result.codes.translation).toEqual({
    name: 'English',
    code: 'Eng',
    author: 'HiryuuHonyaku&NoPrgress',
    percent: '100%',
    latest: true,
    version: '',
  });
});

test('Obsolete translation', () => {
  const result = parse('Advanced Daisenryaku (J) (REV01) [T-Eng40%_NebelwurferHQ].gen');
  expect(result.codes.translation).toEqual({ name: 'English', code: 'Eng', author: 'NebelwurferHQ', percent: '40%', latest: false, version: '' });
});

test('unknown translation', () => {
  const result = parse('"Castlevania II - Simon\'s Quest (U) [T+Esperanto].nes');
  expect(result.codes.translation).toEqual({ name: 'Esperanto', code: 'Esperanto', latest: true, author: '', percent: '', version: '' });
});
