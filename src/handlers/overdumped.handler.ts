import { CodeHandler } from './handler.types';
import { buildStandardizedVersionCaster } from './tools';

export const overdumpedHandler: CodeHandler = {
  tags: ['[o]', '[o#]', '[o#C]', '[o#+C]', '[o#+#C]'],
  key: 'overdumped',
  title: 'Overdumped ROM',
  description:
    "The ROM contains more data than the original game. This extra data is useless and doesn't affect the game at all; it just makes the ROM bigger.",
  ...buildStandardizedVersionCaster('o'),
};
