import { CodeHandler } from './handler.types';

export const hackHandler: CodeHandler = {
  tags: ['(Hack)', '(XXX Hack)'],
  key: 'hack',
  title: 'Hack of another ROM',
  description: 'This ROM is a hack of another ROM.',
  re: /^\(.*Hack\)$/i,
};
