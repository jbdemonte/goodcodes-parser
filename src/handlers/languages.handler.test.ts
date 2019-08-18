import { parse } from '../index';

test('short tag', () => {
  const result = parse('Example (Ita).nes');
  expect(result.codes.languages).toEqual([{ code: 'Ita', name: 'Italian' }]);
});

test('long name', () => {
  const result = parse('Example (Italian).nes');
  expect(result.codes.languages).toEqual([{ code: 'Ita', name: 'Italian' }]);
});

test('Multiple languages coma separated', () => {
  const result = parse('Example (Jap, Por).nes');
  expect(result.codes.languages).toEqual([{ code: 'Jap', name: 'Japanese' }, { code: 'Por', name: 'Portuguese' }]);
});

test('Multiple languages spaced separated', () => {
  const result = parse('Takahashi Meijin no Bouken Shima IV (Russian Eng) [p1][!].nes');
  expect(result.codes.languages).toEqual([{ code: 'Rus', name: 'Russian' }, { code: 'Eng', name: 'English' }]);
});

test('Multiple languages spaced separated containing spaces', () => {
  const result = parse('Example (Simplified Chinese Traditional Chinese).nes');
  expect(result.codes.languages).toEqual([{ code: 'SChi', name: 'Simplified Chinese' }, { code: 'TChi', name: 'Traditional Chinese' }]);
});

test('Special case of Portuguese', () => {
  const result = parse('Example (Brazilian Portuguese, Portuguese).nes');
  expect(result.codes.languages).toEqual([{ code: 'Bra', name: 'Brazilian Portuguese' }, { code: 'Por', name: 'Portuguese' }]);
});

test('return undefined', () => {
  const result = parse('Action 52 (Active Enterprises) [!].nes');
  expect(result.codes.languages).not.toBeDefined();
});
