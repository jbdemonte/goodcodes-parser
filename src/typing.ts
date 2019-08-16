import { Country, Language } from './tools/internationalization.tools';

export type BoolKey = 'good' | 'pending' | 'compilation';

export type NumberKey = 'revision' | 'languageCount';

export type VersionedKey = 'alternative' | 'fixed' | 'overdumped' | 'pirated' | 'bad' | 'trained' | 'hacked';

export type VersionKey = 'stable' | 'alpha' | 'beta' | 'preRelease' | 'prototype' | 'demo' | 'sample' | 'old';

export type CodeKeys = BoolKey | VersionedKey | NumberKey | 'version' | 'format' | 'translation' | 'countries' | 'languages';

export type VersionedValue = { major: number; minor: number };

export type DeepVersionedValue = VersionedValue & { patch: number };

export type HackedValue = VersionedValue & { intro?: boolean; introRemoved?: boolean };

export type VersionValue = { [key in VersionKey]?: DeepVersionedValue };

export type FormatValue = { pal: true } | { ntsc: true };

export type translationValue = {
  latest: boolean;
  code: string;
  name: string;
  percent: string;
  author: string;
  version: string;
};

type NumberResult = {
  [key in NumberKey]: number;
};

type BoolResult = {
  [key in BoolKey]: boolean;
};

type VersionedResult = {
  [key in VersionedKey]: boolean | VersionedValue;
};

type BaseResult = {
  hacked: boolean | HackedValue;
  version: VersionValue;
  format: FormatValue;
  translation: translationValue;
  countries: Country[];
  languages: Language[];
};

export type CodeResult = Partial<BoolResult & NumberResult & VersionedResult & BaseResult>;

export type GoodCodeResult = {
  file: string;
  cleaned: string;
  rom: string;
  codes: CodeResult;
  unknown: string[];
};
