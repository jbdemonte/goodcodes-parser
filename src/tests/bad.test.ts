import { parse } from '../index';

test('without version tags', () => {
  const result = parse(`Addams Family, The (Beta) [b]`);
  expect(result.codes).toEqual(expect.objectContaining({ bad: true }));
});

test('with minor as +', () => {
  const result = parse(`Addams Family, The (Beta) [b1+C]`);
  expect(result.codes).toEqual(expect.objectContaining({ bad: { major: 1, minor: 1 } }));
});

['[b1]', '[b1C]'].forEach(tag => {
  test(`bad ${tag}`, () => {
    const result = parse(`Addams Family, The (Beta) ${tag}`);
    expect(result.codes).toEqual(expect.objectContaining({ bad: { major: 1, minor: 0 } }));
  });
});

test(`bad with minor ([b#+#C])`, () => {
  const result = parse(`Addams Family, The (Beta) [b12+34C]`);
  expect(result.codes).toEqual(expect.objectContaining({ bad: { major: 12, minor: 34 } }));
});
