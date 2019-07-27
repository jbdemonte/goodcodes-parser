import { parse } from '../index';

test('without version tags', () => {
  const result = parse(`Addams Family, The (Beta) [a]`);
  expect(result.codes).toEqual(expect.objectContaining({ alternative: true }));
});

test('with minor as +', () => {
  const result = parse(`Addams Family, The (Beta) [a1+C]`);
  expect(result.codes).toEqual(expect.objectContaining({ alternative: { major: 1, minor: 1 } }));
});

['[a1]', '[a1C]', '(alt 1)'].forEach(tag => {
  test(`alternative ${tag}`, () => {
    const result = parse(`Addams Family, The (Beta) ${tag}`);
    expect(result.codes).toEqual(expect.objectContaining({ alternative: { major: 1, minor: 0 } }));
  });
});

test(`alternative with minor ([a#+#C])`, () => {
  const result = parse(`Addams Family, The (Beta) [a12+34C]`);
  expect(result.codes).toEqual(expect.objectContaining({ alternative: { major: 12, minor: 34 } }));
});
