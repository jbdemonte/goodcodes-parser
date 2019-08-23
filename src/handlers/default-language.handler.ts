import { getDefaultLanguage, Language } from '../tools/internationalization.tools';
import { GoodCodeResult } from '../typing';

export function addDefaultLanguage(result: GoodCodeResult): void {
  if (!result.codes.languages) {
    if (result.codes.translation) {
      const { code, name } = result.codes.translation;
      result.codes.languages = [{ code, name, translation: true }];
    } else if (result.codes.countries) {
      const languages = result.codes.countries
        .map(country => {
          const language = getDefaultLanguage(country.code);
          if (language) {
            return { ...language, default: true } as Language;
          }
        })
        .filter((language => language) as (x: any) => x is Language);
      result.codes.languages = languages.filter(language => language === languages.find(item => item.code === language.code));
    }
  }
}
