import { CodeHandler } from './handler.types';
import { buildStandardizedVersionCaster } from './tools';

export const fixedHandler: CodeHandler = {
  tags: ['[f]', '[f#]', '[f#C]', '[f#+C]', '[f#+#C]'],
  key: 'fixed',
  title: 'Fixed dump',
  description: 'A fixed dump is a ROM that has been altered to run better on a flashcart or an emulator.',
  ...buildStandardizedVersionCaster('f'),
};
