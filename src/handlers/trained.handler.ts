import { CodeHandler } from './handler.types';
import { buildStandardizedVersionCaster } from './tools';

export const trainedHandler: CodeHandler = {
  tags: ['[t]', '[t#]', '[t#C]', '[t#+C]', '[t#+#C]'],
  key: 'trained',
  title: 'Trained version',
  description:
    'A trainer (special code which executes before starting the actual game) has been added to the ROM. It allows the player to access cheats from a menu or ingame.',
  ...buildStandardizedVersionCaster('t'),
};
