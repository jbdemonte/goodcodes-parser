import { parse } from '../index';

test('without version tags', () => {
  const result = parse(`Addams Family, The (Beta) [f]`);
  expect(result.codes).toEqual(expect.objectContaining({ fixed: true }));
});

test('with minor as +', () => {
  const result = parse(`Addams Family, The (Beta) [f1+C]`);
  expect(result.codes).toEqual(expect.objectContaining({ fixed: { major: 1, minor: 1 } }));
});

['[f1]', '[f1C]'].forEach(tag => {
  test(`fixed ${tag}`, () => {
    const result = parse(`Addams Family, The (Beta) ${tag}`);
    expect(result.codes).toEqual(expect.objectContaining({ fixed: { major: 1, minor: 0 } }));
  });
});

test(`fixed with minor ([f#+#C])`, () => {
  const result = parse(`Addams Family, The (Beta) [f12+34C]`);
  expect(result.codes).toEqual(expect.objectContaining({ fixed: { major: 12, minor: 34 } }));
});
