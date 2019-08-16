import { parseCode } from './codes';
import { addDefaultLanguage } from './handlers/default-language.handler';
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
  };

  const codes = file.match(codeRE) || [];

  codes.forEach(code => {
    const value = parseCode(code);
    if (value) {
      result.codes = { ...result.codes, ...value };
    } else {
      if (!result.unknown) {
        result.unknown = [];
      }
      result.unknown.push(code);
    }
  });

  addDefaultLanguage(result);

  return result;
}
