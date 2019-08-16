import { Language, languages, standardizeLanguages } from '../tools/internationalization.tools';
import { CodeHandler } from './handler.types';

const map: { [key: string]: Language } = {};

languages.forEach(language => {
  map[language.code.toLowerCase()] = language;
  map[standardizeLanguages(language.name)] = language;
});

export const languagesHandler: CodeHandler = {
  tags: ['(X)', '(X Y)', '(X, Y, ...)'],
  key: 'languages',
  title: 'Language list',
  description: 'List of language for a ROM',
  re: /^\(([a-z, ]+)\)$/i,
  cast(match) {
    return standardizeLanguages(match[1])
      .split(/[,\s]+/)
      .map(tag => tag.trim())
      .map(tag => (map[tag] ? { ...map[tag] } : null))
      .filter((language => language) as (x: any) => x is Language);
  },
};
