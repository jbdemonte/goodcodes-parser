import { LanguageValue } from '../typing';
import { CodeHandler } from './handler.types';

type LanguageDescriptor = { key: string; name: string; re: RegExp };

const languages: LanguageDescriptor[] = [
  { key: 'Alb', name: 'Albanian' },
  { key: 'Ara', name: 'Arabic' },
  { key: 'Bra', name: 'Brazilian Portuguese' },
  { key: 'Chi', name: 'Chinese' },
  { key: 'ChS', name: 'Simplified Chinese' },
  { key: 'SChi', name: 'Simplified Chinese' },
  { key: 'ChT', name: 'Traditional Chinese' },
  { key: 'TChi', name: 'Traditional Chinese' },
  { key: 'Cro', name: 'Croatia' },
  { key: 'Dan', name: 'Danish' },
  { key: 'Dut', name: 'Dutch' },
  { key: 'Eng', name: 'English' },
  { key: 'Fin', name: 'Finnish' },
  { key: 'Fre', name: 'French' },
  { key: 'Ger', name: 'German' },
  { key: 'Gre', name: 'Greek' },
  { key: 'Heb', name: 'Hebrew' },
  { key: 'Ita', name: 'Italian' },
  { key: 'Jap', name: 'Japanese' },
  { key: 'Kor', name: 'Korean' },
  { key: 'Lat', name: 'Latvian' },
  { key: 'Lit', name: 'Lithuanian' },
  { key: 'Nor', name: 'Norwegian' },
  { key: 'Pol', name: 'Polish' },
  { key: 'Por', name: 'Portuguese' },
  { key: 'Rom', name: 'Romanian' },
  { key: 'Rum', name: 'Rumanian' },
  { key: 'Rus', name: 'Russian' },
  { key: 'Ser', name: 'Serbian' },
  { key: 'Spa', name: 'Spanish' },
  { key: 'Swe', name: 'Swedish' },
  { key: 'Tai', name: 'Thai' },
  { key: 'Tur', name: 'Turkish' },
  { key: 'Uru', name: 'Uruguay Spanish' },
].map(language => ({ ...language, re: new RegExp('^(' + language.key + ')([0-9.]+(%?))?_?(.*)$') }));

export const languageHandler: CodeHandler = {
  tags: ['[T+XXX]', '[T-XXX]'],
  key: 'language',
  title: 'Translation',
  description: 'T+ : Most recent translation, T- : Obsolete translation',
  re: /^\[T([+-])(.+)\]$/,
  cast(match) {
    const latest = match[1] === '+';
    const code: string = match[2];
    const reducer = (result: LanguageValue | null, language: LanguageDescriptor) => {
      if (result) {
        return result;
      }
      const codeMatch = code.match(language.re);
      if (codeMatch) {
        return {
          code: language.key.toLowerCase(),
          name: language.name,
          percent: (codeMatch[3] ? codeMatch[2] : '') || '',
          version: (codeMatch[3] ? '' : codeMatch[2]) || '',
          author: codeMatch[4] || '',
          latest,
        };
      }
      return null;
    };
    return languages.reduce(reducer, null) || {};
  },
};
