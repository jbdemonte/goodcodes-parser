import { parseCode } from './codes';
import { cleanFileName, removeExtension } from './tools/file.tools';
import { GoodCodeResult } from './typing';

const codeRE = /((?:\[[^\]]+])|(?:\([^)]+\)))/g;

export function parse(file: string): GoodCodeResult {
  const cleaned = cleanFileName(file);
  const result: GoodCodeResult = {
    file,
    cleaned,
    rom: removeExtension(cleaned),
    codes: {},
    unknown: [],
  };

  const codes = file.match(codeRE) || [];

  codes.forEach(code => {
    const value = parseCode(code);
    if (value) {
      result.codes = { ...result.codes, ...value };
    } else {
      result.unknown.push(code);
    }
  });

  return result;
}
