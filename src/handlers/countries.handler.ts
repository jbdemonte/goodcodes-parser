import { CodeHandler } from './handler.types';

const patterns = {
  '1': 'Japan & Korea',
  '4': 'USA & BrazilNTSC',

  a: 'Australia',
  b: 'non USA',
  c: 'China',
  d: 'Dutch',
  e: 'Europe',
  f: 'France',
  fc: 'French Canadian',
  fn: 'Finland',
  g: 'Germany',
  gr: 'Greece',
  hk: 'Hong Kong',
  i: 'Italy',
  j: 'Japan',
  k: 'Korea',
  nl: 'Netherlands',
  pd: 'Public domain',
  s: 'Spain',
  sw: 'Sweden',
  u: 'USA',
  unk: 'Unknown',
  unl: 'Unlicensed',
  w: 'World',

  // ADDED from ISO Alpha 2
  br: 'Brazil',
  tw: 'Taiwan',
};

type CountriesMap = typeof patterns;

type CountriesKeys = keyof CountriesMap;

type CountryContent = { name: string };

export type CountriesValue = { [key in CountriesKeys]?: CountryContent };

const map: { [key: string]: CountryContent } = {};
const reversed: { [key: string]: { key: CountriesKeys; value: CountryContent } } = {};

// Sort by length desc (to avoid mismatch due to same prefix: FC <-> F)
const keys = (Object.keys(patterns) as CountriesKeys[]).sort((a, b) => {
  if (a.length < b.length) {
    return 1;
  }
  if (a.length > b.length) {
    return -1;
  }
  return a < b ? 1 : -1;
});

keys.forEach(key => {
  const value: CountryContent = { name: patterns[key] };
  map[key] = value;
  reversed[patterns[key].toLowerCase()] = { key, value };
});

/**
 * Handle full names
 * i.e: (Brazil) or (USA, Europe)
 */
function getFromNames(codes: string): CountriesValue | undefined {
  let result: CountriesValue | undefined;
  codes.split(',').forEach(code => {
    code = code.trim().toLowerCase();
    if (reversed[code]) {
      // @ts-ignore
      result = { ...result, [reversed[code].key]: { ...reversed[code].value } };
    }
  });
  return result;
}

const getFromCodes = (() => {
  // forge regex on language
  const items = keys.map(key => {
    return {
      key,
      value: map[key],
      re: new RegExp('^' + key, 'i'),
    };
  });

  return function extract(code: string, countries?: CountriesValue): CountriesValue | undefined {
    const valid = items.some(item => {
      if (!(countries && countries[item.key]) && code.match(item.re)) {
        // @ts-ignore
        countries = { ...countries, [item.key]: { ...item.value } };
        code = code.substr(item.key.length);
        return true;
      }
    });

    return valid ? (code ? extract(code, countries) : countries) : undefined;
  };
})();

export const countriesHandler: CodeHandler = {
  tags: ['[f]', '[f#]', '[f#C]', '[f#+C]', '[f#+#C]'],
  key: 'countries',
  title: 'Country list',
  description: 'List of country for a ROM',
  re: /^\(([a-z14, ]+)\)$/i,
  cast(match) {
    return getFromNames(match[1]) || getFromCodes(match[1]);
  },
};
