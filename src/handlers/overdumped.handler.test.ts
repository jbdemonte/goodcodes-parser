import { parse } from '../index';

test('without version tags', () => {
  const result = parse(`Addams Family, The (Beta) [o]`);
  expect(result.codes).toEqual(expect.objectContaining({ overdumped: true }));
});

test('with minor as +', () => {
  const result = parse(`Addams Family, The (Beta) [o1+C]`);
  expect(result.codes).toEqual(expect.objectContaining({ overdumped: { major: 1, minor: 1 } }));
});

['[o1]', '[o1C]'].forEach(tag => {
  test(`overdumped ${tag}`, () => {
    const result = parse(`Addams Family, The (Beta) ${tag}`);
    expect(result.codes).toEqual(expect.objectContaining({ overdumped: { major: 1, minor: 0 } }));
  });
});

test(`overdumped with minor ([o#+#C])`, () => {
  const result = parse(`Addams Family, The (Beta) [o12+34C]`);
  expect(result.codes).toEqual(expect.objectContaining({ overdumped: { major: 12, minor: 34 } }));
});
