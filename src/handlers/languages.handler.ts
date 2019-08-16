import { Language, languages } from '../tools/languages.tools';
import { CodeHandler } from './handler.types';

const map: { [key: string]: Language } = {};

const standardizeRE = new RegExp(
  languages
    .filter(language => language.name.indexOf(' ') >= 0)
    .map(language => `(${language.name.toLowerCase()})`)
    .join('|'),
  'g',
);

function standardize(name: string): string {
  return name.toLowerCase().replace(standardizeRE, tag => tag.replace(/\s+/, '-'));
}

languages.forEach(language => {
  map[language.code.toLowerCase()] = language;
  map[standardize(language.name)] = language;
});

export const languagesHandler: CodeHandler = {
  tags: ['(X)', '(X Y)', '(X, Y, ...)'],
  key: 'languages',
  title: 'Language list',
  description: 'List of language for a ROM',
  re: /^\(([a-z, ]+)\)$/i,
  cast(match) {
    return standardize(match[1])
      .toLowerCase()
      .split(/[,\s]+/)
      .map(tag => tag.trim())
      .map(tag => (map[tag] ? { ...map[tag] } : null))
      .filter((language => language) as (x: any) => x is Language);
  },
};
