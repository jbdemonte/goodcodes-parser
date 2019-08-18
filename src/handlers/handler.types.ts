import { Country, Language } from '../tools/internationalization.tools';
import { CodeKeys, FormatValue, HackedValue, TranslationValue, VersionedValue, VersionValue } from '../typing';

export type Caster = (
  match: any,
) => boolean | number | undefined | VersionedValue | HackedValue | VersionValue | TranslationValue | FormatValue | Country[] | Language[];

export type CodeHandler = {
  tag?: string;
  tags?: string[]; // todo: l'un ou l'autre mais au moins un
  key: CodeKeys;
  title: string;
  description: string;
  re: RegExp;
  cast?: Caster;
};
