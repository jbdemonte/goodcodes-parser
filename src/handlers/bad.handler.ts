import { CodeHandler } from './handler.types';
import { buildStandardizedVersionCaster } from './tools';

export const badHandler: CodeHandler = {
  tags: ['[b]', '[b#]', '[b#C]', '[b#+C]', '[b#+#C]'],
  key: 'bad',
  title: 'Bad dump',
  description:
    "A ROM image which has been corrupted because the original game is very old, because of a faulty dumper (bad connection) or during its upload to a release server. These ROMs often have graphic errors or sometimes don't work at all.",
  ...buildStandardizedVersionCaster('b'),
};
