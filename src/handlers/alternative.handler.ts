import { CodeHandler } from './handler.types';

export const alternativeandler: CodeHandler = {
  tags: ['[a]', '[a#]', '[a#C]', '[a#+C]', '[a#+#C]', '(alt #)'],
  key: 'alternative',
  title: 'Alternative version',
  description:
    'The ROM is a copy of an alternative release of the game. Many games have been re-released to fix bugs or to eliminate Game Genie codes.',
  re: /^\[a(\d*)(?:(\+)?(\d+)?C)?]|\(alt\s*(\d+)\)$/i,
  cast(match) {
    if (match[1] || match[4]) {
      return {
        major: parseInt(match[1] || match[4] || 0, 10),
        minor: parseInt(match[3] || 0, 10) || (match[2] ? 1 : 0),
      };
    }
    return true;
  },
};
