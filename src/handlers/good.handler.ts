import { CodeHandler } from './handler.types';

export const goodHandler: CodeHandler = {
  tag: '[!]',
  key: 'good',
  title: 'Verified good dump',
  description: 'The ROM is an exact copy of the original game; it has not had any hacks or modifications.',
  re: /^\[!]$/,
};
