import { getDefaultLanguage } from '../tools/internationalization.tools';
import { GoodCodeResult } from '../typing';

export function addDefaultLanguage(result: GoodCodeResult): void {
  if (!result.codes.languages) {
    if (result.codes.translation) {
      const { code, name } = result.codes.translation;
      result.codes.languages = [{ code, name, translation: true }];
    } else if (result.codes.countries) {
      const language = getDefaultLanguage(result.codes.countries[0].code);
      if (language) {
        result.codes.languages = [{ ...language, default: true }];
      }
    }
  }
}
