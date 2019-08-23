import { CodeHandler } from './handler.types';

const nes = [
  'Camerica',
  'Aladdin',
  'Wisdom Tree',
  'AVE',
  'HES',
  'Color Dreams',
  'Tengen',
  'Panesian',
  'Joy Van',
  'Sachen',
  'Sachen-HES',
  'Sachen-Hacker',
  'Hacker',
];

export const ignoredHandler: CodeHandler = {
  tags: ['(Camerica)', '(Aladdin)'],
  title: 'Ignored tags',
  description: 'Company name, special devices....',
  re: new RegExp(`^\\(${nes.join('|')}\\)$`, 'i'),
};
