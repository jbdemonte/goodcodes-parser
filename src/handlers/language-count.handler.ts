import { CodeHandler } from './handler.types';

export const languageCountHandler: CodeHandler = {
  tag: '(M#)',
  key: 'languageCount',
  title: 'Language count',
  description: 'Number of languages (selectable by a menu)',
  re: /^\(M(\d+)\)$/,
  cast(match) {
    return parseInt(match[1], 10);
  },
};
