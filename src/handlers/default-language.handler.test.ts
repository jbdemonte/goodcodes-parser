import { addDefaultLanguage } from './default-language.handler';

test('add a default language', () => {
  const source: any = {
    codes: {
      countries: [{ code: 'U' }],
    },
  };
  addDefaultLanguage(source);
  expect(source.codes.languages).toEqual([{ code: 'Eng', name: 'English' }]);
});

test('add only one default language even in case of multiple countries', () => {
  const source: any = {
    codes: {
      countries: [{ code: 'I' }, { code: 'U' }],
    },
  };
  addDefaultLanguage(source);
  expect(source.codes.languages).toEqual([{ code: 'Ita', name: 'Italian' }]);
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

test('does not modify if translation is set', () => {
  const source: any = {
    codes: {
      translation: { foo: 'bar' },
      countries: [{ code: 'U' }],
    },
  };
  addDefaultLanguage(source);
  expect(source.codes.languages).not.toBeDefined();
});

test('undefined', () => {
  const source: any = {
    codes: {},
  };
  addDefaultLanguage(source);
  expect(source.codes.languages).not.toBeDefined();
});
