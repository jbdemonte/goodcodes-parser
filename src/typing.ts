import { Country, Language } from './tools/internationalization.tools';

export type BoolKey = 'good' | 'pending' | 'compilation' | 'hack';

export type NumberKey = 'revision' | 'languageCount';

export type VersionedKey = 'alternative' | 'fixed' | 'overdumped' | 'pirated' | 'bad' | 'trained' | 'hacked';

export type VersionKey = 'stable' | 'alpha' | 'beta' | 'preRelease' | 'prototype' | 'demo' | 'sample' | 'old';

export type CodeKeys = BoolKey | VersionedKey | NumberKey | 'version' | 'format' | 'checksum' | 'translation' | 'countries' | 'languages';

export interface VersionedValue {
  major: number;
  minor: number;
}

export interface DeepVersionedValue extends VersionedValue {
  patch: number;
}

export interface HackedValue extends VersionedValue {
  intro?: boolean;
  introRemoved?: boolean;
}

export type VersionValue = { [key in VersionKey]?: DeepVersionedValue };

export type FormatValue = { pal: true } | { ntsc: true };

export interface TranslationValue extends Language {
  latest: boolean;
  percent: string;
  author: string;
  version: string;
}

export interface ChecksumValue {
  good?: true;
  bad?: true;
}

type NumberResult = {
  [key in NumberKey]: number;
};

type BoolResult = {
  [key in BoolKey]: boolean;
};

type VersionedResult = {
  [key in VersionedKey]: boolean | VersionedValue;
};

interface BaseResult {
  hacked: boolean | HackedValue;
  version: VersionValue;
  format: FormatValue;
  checksum: ChecksumValue;
  translation: TranslationValue;
  countries: Country[];
  languages: Language[];
}

export type CodeResult = Partial<BoolResult & NumberResult & VersionedResult & BaseResult>;

export type GoodCodeResult = {
  file: string;
  cleaned: string;
  rom: string;
  codes: CodeResult;
  unknown?: string[];
};
