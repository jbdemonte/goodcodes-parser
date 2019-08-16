import { getDefaultLanguage } from '../tools/internationalization.tools';
import { GoodCodeResult } from '../typing';

export function addDefaultLanguage(result: GoodCodeResult): void {
  if (result.codes.countries && !result.codes.languages && !result.codes.translation) {
    const language = getDefaultLanguage(result.codes.countries[0].code);
    if (language) {
      result.codes.languages = [{ ...language }];
    }
  }
}
