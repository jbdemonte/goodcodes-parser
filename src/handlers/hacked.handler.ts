import { HackedValue } from '../typing';
import { CodeHandler } from './handler.types';

// todo: find what "C" stands for
export const hackedHandler: CodeHandler = {
  tags: [
    '[h]', // Hacked
    '[h#]',
    '[h#C]',
    '[h#+C]',
    '[h#+#C]',
    '[hI]', // Intro
    '[h#I]',
    '[h#I+C]',
    '[h#I+#C]',
    '[hIR]', // Intro Removed
    '[h#IR]',
    '[h#IR+C]',
    '[h#IR+#C]',
  ],
  key: 'hacked',
  title: 'Hacked ROM',
  description:
    "The ROM has been user modified, with examples being changing the internal header or country codes, applying a release group intro, or editing the game's content.",
  re: /^\[h(\d*)(IR?)?(?:(?:(\+)(\d*))?C)?]$/,
  cast(match) {
    if (match[1] || match[2] || match[4]) {
      const result: HackedValue = {
        major: parseInt(match[1] || 0, 10),
        minor: parseInt(match[4] || 0, 10) || (match[3] ? 1 : 0),
      };
      if (match[2] === 'I') {
        result.intro = true;
      } else if (match[2] === 'IR') {
        result.introRemoved = true;
      }
      return result;
    }
    return true;
  },
};
