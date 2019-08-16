import { Language } from '../tools/languages.tools';
import { CodeKeys, FormatValue, HackedValue, VersionedValue, VersionValue } from '../typing';
import { CountriesValue } from './countries.handler';

export type Caster = (
  match: any,
) => boolean | number | undefined | VersionedValue | HackedValue | VersionValue | FormatValue | CountriesValue | Language[];

export type CodeHandler = {
  tag?: string;
  tags?: string[]; // todo: l'un ou l'autre mais au moins un
  key: CodeKeys;
  title: string;
  description: string;
  re: RegExp;
  cast?: Caster;
};
