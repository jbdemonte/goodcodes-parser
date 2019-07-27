import { parse } from '../index';

test('set the fileName', () => {
  const result = parse('Addams Family, The (Beta) [f].zip');
  expect(result.file).toEqual('Addams Family, The (Beta) [f].zip');
});

test('clean the fileName', () => {
  const result = parse('Addams Family, The (Beta) [f].zip');
  expect(result.cleaned).toEqual('Addams Family, The.zip');
});

test('set a rom', () => {
  const result = parse('Addams Family, The (Beta) [f].zip');
  expect(result.rom).toEqual('Addams Family, The');
});
