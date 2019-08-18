import { addDefaultLanguage } from './default-language.handler';

test('add a default language by country', () => {
  const source: any = {
    codes: {
      countries: [{ code: 'U' }],
    },
  };
  addDefaultLanguage(source);
  expect(source.codes.languages).toEqual([{ code: 'Eng', name: 'English', default: true }]);
});

test('add only one default language even in case of multiple countries', () => {
  const source: any = {
    codes: {
      countries: [{ code: 'I' }, { code: 'U' }],
    },
  };
  addDefaultLanguage(source);
  expect(source.codes.languages).toEqual([{ code: 'Ita', name: 'Italian', default: true }]);
});

test('does not overwrite the existing languages if property is defined', () => {
  const source: any = {
    codes: {
      languages: [{ foo: 'bar' }],
      countries: [{ code: 'U' }],
    },
  };
  addDefaultLanguage(source);
  expect(source.codes.languages).toEqual([{ foo: 'bar' }]);
});

test('add language from translation', () => {
  const source: any = {
    codes: {
      translation: { code: 'Fre', name: 'French', foo: 'bar' },
      countries: [{ code: 'U' }],
    },
  };
  addDefaultLanguage(source);
  expect(source.codes.languages).toEqual([{ code: 'Fre', name: 'French', translation: true }]);
});

test('undefined', () => {
  const source: any = {
    codes: {},
  };
  addDefaultLanguage(source);
  expect(source.codes.languages).not.toBeDefined();
});
