import { CodeHandler } from './handler.types';

export const pendingHandler: CodeHandler = {
  tag: '[!p]',
  key: 'pending',
  title: 'Pending dump',
  description: 'This is the closest dump to the original game to date, but the proper ROM is still waiting to be dumped.',
  re: /^\[!p]$/,
};
