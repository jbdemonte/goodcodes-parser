import { cleanFileName, removeExtension } from './file.tools';

describe('cleanFileName', () => {
  test('remove the numeric prefix', () => {
    const result = cleanFileName('1234 - Bahamut Lagoon.smc');
    expect(result).toEqual('Bahamut Lagoon.smc');
  });

  test('remove the tags', () => {
    const result = cleanFileName('Bahamut Lagoon (J) (Alpha) [T+FreBeta4_Terminus].smc');
    expect(result).toEqual('Bahamut Lagoon.smc');
  });

  test('remove the extra spaces', () => {
    const result = cleanFileName('     Bahamut Lagoon     .smc');
    expect(result).toEqual('Bahamut Lagoon.smc');
  });
});

describe('removeExtension', () => {
  test('remove the extension', () => {
    const result = removeExtension('Bahamut Lagoon.smc');
    expect(result).toEqual('Bahamut Lagoon');
  });

  test('does not modify if has no extension', () => {
    const result = removeExtension('Bahamut Lagoon');
    expect(result).toEqual('Bahamut Lagoon');
  });
});
