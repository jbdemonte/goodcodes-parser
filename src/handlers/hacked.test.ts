import { parse } from '../index';

describe('without intro', () => {
  test('without version tags', () => {
    const result = parse(`Addams Family, The (Beta) [h]`);
    expect(result.codes).toEqual(expect.objectContaining({ hacked: true }));
  });

  test('with minor as +', () => {
    const result = parse(`Addams Family, The (Beta) [h1+C]`);
    expect(result.codes).toEqual(expect.objectContaining({ hacked: { major: 1, minor: 1 } }));
  });

  ['[h1]', '[h1C]'].forEach(tag => {
    test(`hacked ${tag}`, () => {
      const result = parse(`Addams Family, The (Beta) ${tag}`);
      expect(result.codes).toEqual(expect.objectContaining({ hacked: { major: 1, minor: 0 } }));
    });
  });

  test(`hacked with minor ([h#+#C])`, () => {
    const result = parse(`Addams Family, The (Beta) [h12+34C]`);
    expect(result.codes).toEqual(expect.objectContaining({ hacked: { major: 12, minor: 34 } }));
  });
});

describe('with intro', () => {
  test('without version tags', () => {
    const result = parse(`Addams Family, The (Beta) [hI]`);
    expect(result.codes).toEqual(expect.objectContaining({ hacked: { major: 0, minor: 0, intro: true } }));
  });

  test('version tags', () => {
    const result = parse(`Addams Family, The (Beta) [h1I]`);
    expect(result.codes).toEqual(expect.objectContaining({ hacked: { major: 1, minor: 0, intro: true } }));
  });

  test('version tags with +', () => {
    const result = parse(`Addams Family, The (Beta) [h2I+C]`);
    expect(result.codes).toEqual(expect.objectContaining({ hacked: { major: 2, minor: 1, intro: true } }));
  });

  test('version tags with minor', () => {
    const result = parse(`Addams Family, The (Beta) [h2I+3C]`);
    expect(result.codes).toEqual(expect.objectContaining({ hacked: { major: 2, minor: 3, intro: true } }));
  });
});

describe('with intro remove', () => {
  test('without version tags', () => {
    const result = parse(`Addams Family, The (Beta) [hIR]`);
    expect(result.codes).toEqual(expect.objectContaining({ hacked: { major: 0, minor: 0, introRemoved: true } }));
  });

  test('version tags', () => {
    const result = parse(`Addams Family, The (Beta) [h1IR]`);
    expect(result.codes).toEqual(expect.objectContaining({ hacked: { major: 1, minor: 0, introRemoved: true } }));
  });

  test('version tags with +', () => {
    const result = parse(`Addams Family, The (Beta) [h2IR+C]`);
    expect(result.codes).toEqual(expect.objectContaining({ hacked: { major: 2, minor: 1, introRemoved: true } }));
  });

  test('version tags with minor', () => {
    const result = parse(`Addams Family, The (Beta) [h2IR+3C]`);
    expect(result.codes).toEqual(expect.objectContaining({ hacked: { major: 2, minor: 3, introRemoved: true } }));
  });
});
