import { CodeHandler } from './handler.types';

export const checksumHandler: CodeHandler = {
  tags: ['[c]', '[x]'],
  key: 'checksum',
  title: 'Checksum',
  description: 'Genesis only, ROM provide a good / bad checksum.',
  re: /^\[(c|x)]$/,
  cast(match) {
    return (match[1] as string).toLowerCase() === 'c' ? { good: true } : { bad: true };
  },
};
