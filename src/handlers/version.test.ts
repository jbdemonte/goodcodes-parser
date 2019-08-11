import { parse } from '../index';

describe('as numeric', () => {
  test('undefined', () => {
    const result = parse('Mega Games 6 (Vol 1) (E) [!].gen');
    expect(result.codes.version).toEqual(undefined);
  });

  test('V1', () => {
    const result = parse('Test (V1).gen');
    expect(result.codes.version).toEqual({ stable: { major: 1, minor: 0, patch: 0 } });
  });

  test('V0.9', () => {
    const result = parse('Barver Battle Saga - The Space Fighter (V0.9) (Ch).gen');
    expect(result.codes.version).toEqual({ stable: { major: 0, minor: 9, patch: 0 } });
  });

  test('V1.2.3', () => {
    const result = parse('Test (V1.2.3).gen');
    expect(result.codes.version).toEqual({ stable: { major: 1, minor: 2, patch: 3 } });
  });
});

describe('as alpha-numeric', () => {
  describe('without versioning', () => {
    test('undefined', () => {
      const result = parse('Street Fighter Alpha 2 (E) [!].smc');
      expect(result.codes.version).toEqual(undefined);
    });

    test('Alpha', () => {
      const result = parse('Spider-Man (Alpha) [b1].smc');
      expect(result.codes.version).toEqual({ alpha: { major: 1, minor: 0, patch: 0 } });
    });

    test('Beta', () => {
      const result = parse('Star Fox 2 (Beta) [a1].smc');
      expect(result.codes.version).toEqual({ beta: { major: 1, minor: 0, patch: 0 } });
    });

    test('Pre-Release', () => {
      const result = parse('Power Piggs of the Dark Age (Pre-Release) [h1+C].smc');
      expect(result.codes.version).toEqual({ preRelease: { major: 1, minor: 0, patch: 0 } });
    });

    test('Prototype', () => {
      const result = parse('Rap Basketball (U) (Prototype).smc');
      expect(result.codes.version).toEqual({ prototype: { major: 1, minor: 0, patch: 0 } });
    });

    test('Proto', () => {
      const result = parse('Rap Basketball (U) (Proto).smc');
      expect(result.codes.version).toEqual({ prototype: { major: 1, minor: 0, patch: 0 } });
    });

    test('old', () => {
      const result = parse('Test (U) (old).smc');
      expect(result.codes.version).toEqual({ old: { major: 1, minor: 0, patch: 0 } });
    });
  });

  describe('with versioning', () => {
    test('Alpha 1.2.3', () => {
      const result = parse('Spider-Man (Alpha 1.2.3) [b1].smc');
      expect(result.codes.version).toEqual({ alpha: { major: 1, minor: 2, patch: 3 } });
    });

    test('Beta 2', () => {
      const result = parse('Star Fox 2 (Beta 2) [a1].smc');
      expect(result.codes.version).toEqual({ beta: { major: 2, minor: 0, patch: 0 } });
    });

    test('Pre-Release 3.6', () => {
      const result = parse('Power Piggs of the Dark Age (Pre-Release 3.6) [h1+C].smc');
      expect(result.codes.version).toEqual({ preRelease: { major: 3, minor: 6, patch: 0 } });
    });

    test('Prototype 4.5.6', () => {
      const result = parse('Rap Basketball (U) (Prototype 4.5.6).smc');
      expect(result.codes.version).toEqual({ prototype: { major: 4, minor: 5, patch: 6 } });
    });

    test('Proto 12.23.34', () => {
      const result = parse('Rap Basketball (U) (Proto 12.23.34).smc');
      expect(result.codes.version).toEqual({ prototype: { major: 12, minor: 23, patch: 34 } });
    });

    test('old', () => {
      const result = parse('Test (U) (old).smc');
      expect(result.codes.version).toEqual({ old: { major: 1, minor: 0, patch: 0 } });
    });
  });
});
