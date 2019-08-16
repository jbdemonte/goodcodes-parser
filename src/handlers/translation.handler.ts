import { Language, languages } from '../tools/languages.tools';
import { translationValue } from '../typing';
import { CodeHandler } from './handler.types';

type TranslationDescriptor = Language & { re: RegExp };

const translations: TranslationDescriptor[] = languages.map(language => ({
  ...language,
  re: new RegExp('^(' + language.code + ')([0-9.]+(%?))?_?(.*)$'),
}));

export const translationHandler: CodeHandler = {
  tags: ['[T+XXX]', '[T-XXX]'],
  key: 'translation',
  title: 'Translation',
  description: 'T+ : Most recent translation, T- : Obsolete translation',
  re: /^\[T([+-])(.+)\]$/,
  cast(match) {
    const latest = match[1] === '+';
    const code: string = match[2];
    const reducer = (result: translationValue | null, translation: TranslationDescriptor) => {
      if (result) {
        return result;
      }
      const codeMatch = code.match(translation.re);
      if (codeMatch) {
        return {
          code: translation.code.toLowerCase(),
          name: translation.name,
          percent: (codeMatch[3] ? codeMatch[2] : '') || '',
          version: (codeMatch[3] ? '' : codeMatch[2]) || '',
          author: codeMatch[4] || '',
          latest,
        };
      }
      return null;
    };
    return translations.reduce(reducer, null) || {};
  },
};
