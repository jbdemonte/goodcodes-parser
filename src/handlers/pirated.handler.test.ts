import { parse } from '../index';

test('without version tags', () => {
  const result = parse(`Addams Family, The (Beta) [p]`);
  expect(result.codes).toEqual(expect.objectContaining({ pirated: true }));
});

test('with minor as +', () => {
  const result = parse(`Addams Family, The (Beta) [p1+C]`);
  expect(result.codes).toEqual(expect.objectContaining({ pirated: { major: 1, minor: 1 } }));
});

['[p1]', '[p1C]'].forEach(tag => {
  test(`pirated ${tag}`, () => {
    const result = parse(`Addams Family, The (Beta) ${tag}`);
    expect(result.codes).toEqual(expect.objectContaining({ pirated: { major: 1, minor: 0 } }));
  });
});

test(`pirated with minor ([p#+#C])`, () => {
  const result = parse(`Addams Family, The (Beta) [p12+34C]`);
  expect(result.codes).toEqual(expect.objectContaining({ pirated: { major: 12, minor: 34 } }));
});
