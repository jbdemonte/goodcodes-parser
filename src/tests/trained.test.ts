import { parse } from '../index';

test('without version tags', () => {
  const result = parse(`Addams Family, The (Beta) [t]`);
  expect(result.codes).toEqual(expect.objectContaining({ trained: true }));
});

test('with minor as +', () => {
  const result = parse(`Addams Family, The (Beta) [t1+C]`);
  expect(result.codes).toEqual(expect.objectContaining({ trained: { major: 1, minor: 1 } }));
});

['[t1]', '[t1C]'].forEach(tag => {
  test(`trained ${tag}`, () => {
    const result = parse(`Addams Family, The (Beta) ${tag}`);
    expect(result.codes).toEqual(expect.objectContaining({ trained: { major: 1, minor: 0 } }));
  });
});

test(`trained with minor ([t#+#C])`, () => {
  const result = parse(`Addams Family, The (Beta) [t12+34C]`);
  expect(result.codes).toEqual(expect.objectContaining({ trained: { major: 12, minor: 34 } }));
});
