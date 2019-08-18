import { Language, languages } from '../tools/internationalization.tools';
import { TranslationValue } from '../typing';
import { CodeHandler } from './handler.types';

const map: { [key: string]: Language } = {};

languages.forEach(language => {
  map[standardize(language.code)] = language;
  map[standardize(language.name)] = language;
});

function standardize(code: string): string {
  return code.toLowerCase().replace(/[^a-z]/g, '');
}

export const translationHandler: CodeHandler = {
  tags: ['[T+XXX]', '[T-XXX]'],
  key: 'translation',
  title: 'Translation',
  description: 'T+ : Most recent translation, T- : Obsolete translation',
  re: /^\[T([+-])([a-z]+)([0-9.]+(%?))?_?(.*)\]$/i,
  cast(match): TranslationValue {
    const latest = match[1] === '+';
    const language: Language | undefined = map[standardize(match[2])];

    const percent = (match[4] ? match[3] : '') || '';
    const version = (match[4] ? '' : match[3]) || '';
    const author = match[5] || '';

    return {
      ...(language || { code: match[2], name: match[2] }),
      percent,
      version,
      author,
      latest,
    };
  },
};
