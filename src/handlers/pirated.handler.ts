import { CodeHandler } from './handler.types';
import { buildStandardizedVersionCaster } from './tools';

export const piratedHandler: CodeHandler = {
  tags: ['[p]', '[p#]', '[p#C]', '[p#+C]', '[p#+#C]'],
  key: 'pirated',
  title: 'Pirated version',
  description:
    'A dump of a pirated version of a game. These ROMs often have their copyright messages or company names removed or corrupted. Also, many ROMs contain "intro" screens with the name and symbols of the pirate group that have released them.',
  ...buildStandardizedVersionCaster('p'),
};
