import { CodeHandler } from './handler.types';

/**
 * Return a numeric version of A => 1, B => 2
 * @param letter
 * @return {number}
 */
function letterToVersion(letter: string) {
  return letter.toUpperCase().charCodeAt(0) - 64;
}

export const revisionHandler: CodeHandler = {
  tags: ['(REVXX)', '(PRGXX)'],
  key: 'revision',
  title: 'Revision number',
  description: '0 is the earliest.',
  re: /^\((?:REV|PRG)\s*(?:(\d+)|(?:\s+([a-z])))\)$/i,
  cast(match) {
    return match[2] ? letterToVersion(match[2]) : parseInt(match[1], 10);
  },
};
