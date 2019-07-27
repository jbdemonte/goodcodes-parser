import { CodeHandler } from './handler.types';

export const compilationHandler: CodeHandler = {
  tag: '(Compilation)',
  key: 'compilation',
  title: 'Compilation',
  description: 'The ROM is a dump of a compilation',
  re: /^\(Compilation\)$/,
};
