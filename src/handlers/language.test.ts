import { parse } from '../index';

describe('de', () => {
  test('undefined', () => {
    const result = parse('Super Pro Fighter Q+ BIOS [a1].gen');
    expect(result.codes.language).toEqual(undefined);
  });

  test('language simple, latest', () => {
    const result = parse('Flintstones, The (U) [T+Rus].gen');
    expect(result.codes.language).toEqual({ name: 'Russian', code: 'rus', latest: true, author: '', percent: '', version: '' });
  });

  test('language with percent', () => {
    const result = parse("Disney's Aladdin (U) [T+Ger98.5%].gen");
    expect(result.codes.language).toEqual({ name: 'German', code: 'ger', percent: '98.5%', latest: true, author: '', version: '' });
  });

  test('language with author', () => {
    const result = parse('Lost Vikings, The (Beta) [h1C][T+Ser_Mad Fox].gen');
    expect(result.codes.language).toEqual({ name: 'Serbian', code: 'ser', author: 'Mad Fox', latest: true, percent: '', version: '' });
  });

  test('language with author without _', () => {
    const result = parse('Alien 3 (U) [T+Ger099beta].gen');
    expect(result.codes.language).toEqual({ name: 'German', code: 'ger', author: 'beta', version: '099', latest: true, percent: '' });
  });

  test('language with author & percent', () => {
    const result = parse('Langrisser II (J) (REV01) [T+Eng100%_HiryuuHonyaku&NoPrgress].gen');
    expect(result.codes.language).toEqual({
      name: 'English',
      code: 'eng',
      author: 'HiryuuHonyaku&NoPrgress',
      percent: '100%',
      latest: true,
      version: '',
    });
  });

  test('Obsolete translation', () => {
    const result = parse('Advanced Daisenryaku (J) (REV01) [T-Eng40%_NebelwurferHQ].gen');
    expect(result.codes.language).toEqual({ name: 'English', code: 'eng', author: 'NebelwurferHQ', percent: '40%', latest: false, version: '' });
  });
});
