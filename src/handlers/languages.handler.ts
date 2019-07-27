import { CodeHandler } from './handler.types';

export const languagesHandler: CodeHandler = {
  tag: '(M#)',
  key: 'languages',
  title: 'Multilanguage',
  description: 'Number of languages (selectable by a menu)',
  re: /^\(M(\d+)\)$/,
  cast(match) {
    return parseInt(match[1], 10);
  },
};
