import { CodeHandler } from './handler.types';

export const formatHandler: CodeHandler = {
  tags: ['(PAL)', '(NTSC)'],
  key: 'format',
  title: 'Format type',
  description: 'Format type (PAL, NTSC)',
  re: /^\((PAL|NTSC)\)$/,
  cast(match) {
    return {
      [match[1].toLowerCase()]: true,
    };
  },
};
