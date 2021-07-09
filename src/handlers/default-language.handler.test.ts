import { addDefaultLanguage } from './default-language.handler';
import { GoodCodeResult } from '../typing';

test('add a default language by country', () => {
  const source = {
    codes: {
      countries: [{ code: 'U' }],
    },
  } as GoodCodeResult;
  addDefaultLanguage(source);
  expect(source.codes.languages).toEqual([{ code: 'Eng', name: 'English', default: true }]);
});

test('add multiple default language', () => {
  const source = {
    codes: {
      countries: [{ code: 'J' }, { code: 'U' }],
    },
  } as GoodCodeResult;
  addDefaultLanguage(source);
  expect(source.codes.languages).toEqual([{ code: 'Jap', name: 'Japanese', default: true }, { code: 'Eng', name: 'English', default: true }]);
});

test('does not duplicate default language', () => {
  const source = {
    codes: {
      countries: [{ code: 'UK' }, { code: 'U' }],
    },
  } as GoodCodeResult;
  addDefaultLanguage(source);
  expect(source.codes.languages).toEqual([{ code: 'Eng', name: 'English', default: true }]);
});

test('does not overwrite the existing languages if property is defined', () => {
  const source = {
    codes: {
      languages: [{ code: 'ChT', name: 'Traditional Chinese' }],
      countries: [{ code: 'China' }],
    },
  } as GoodCodeResult;
  addDefaultLanguage(source);
  expect(source.codes.languages).toEqual([{ code: 'ChT', name: 'Traditional Chinese' }]);
});

test('add language from translation', () => {
  const source = {
    codes: {
      translation: { code: 'Fre', name: 'French' },
      countries: [{ code: 'U' }],
    },
  } as GoodCodeResult;
  addDefaultLanguage(source);
  expect(source.codes.languages).toEqual([{ code: 'Fre', name: 'French', translation: true }]);
});

test('undefined', () => {
  const source = {
    codes: {},
  } as GoodCodeResult;
  addDefaultLanguage(source);
  expect(source.codes.languages).not.toBeDefined();
});
