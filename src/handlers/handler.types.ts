import { Country, Language } from '../tools/internationalization.tools';
import { ChecksumValue, CodeKeys, FormatValue, HackedValue, TranslationValue, VersionedValue, VersionValue } from '../typing';

export type Caster = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: any,
) =>
  | boolean
  | number
  | undefined
  | VersionedValue
  | HackedValue
  | VersionValue
  | TranslationValue
  | ChecksumValue
  | FormatValue
  | Country[]
  | Language[];

export type CodeHandler = {
  tag?: string;
  tags?: string[];
  key?: CodeKeys;
  title: string;
  description: string;
  re: RegExp;
  cast?: Caster;
};
