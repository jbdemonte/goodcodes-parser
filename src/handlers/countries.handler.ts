import { countries, Country, standardizeCountries } from '../tools/internationalization.tools';
import { CodeHandler } from './handler.types';

const map: { [code: string]: Country } = {};

countries.forEach(country => {
  map[country.code.toLowerCase()] = country;
  map[standardizeCountries(country.name)] = country;
});

/**
 * Handle full names
 * i.e: (Brazil) or (USA, Europe)
 */
function getFromNames(names: string): Country[] | undefined {
  const list: Country[] = [];
  names.split(/[,\s]+/).forEach(code => {
    const country = map[code.trim()];
    if (country) {
      list.push(country);
    }
  });
  return list.length ? list : undefined;
}

const getFromCodes = (() => {
  // sort by length to avoid mismatch (UK != U + K)
  const items = countries
    .map(country => country.code.toLowerCase())
    .sort((a, b) => (a.length > b.length ? -1 : 1))
    .map(key => {
      return {
        key,
        country: map[key],
        re: new RegExp('^' + key),
      };
    });

  /**
   * Only returns the matches, if, and only if, ALL code are found
   * example: JU => Japan, USA
   *          AZ => Australian, Undefined => undefined
   */
  return function extract(code: string): Country[] | undefined {
    let country: Country | undefined;
    items.some(item => {
      if (code.match(item.re)) {
        code = code.substr(item.key.length);
        country = item.country;
        return true;
      }
    });
    if (country) {
      if (code) {
        const list = extract(code);
        if (list) {
          list.unshift(country);
          return list;
        }
      } else {
        return [country];
      }
    }
  };
})();

export const countriesHandler: CodeHandler = {
  tags: ['(X)', '(XY)', '(X, Y, ...)'],
  key: 'countries',
  title: 'Country list',
  description: 'List of country for a ROM',
  re: /^\(([a-z14, ]+)\)$/i,
  cast(match) {
    const tag = standardizeCountries(match[1]);
    const list = getFromNames(tag) || getFromCodes(tag);
    if (list) {
      // deep clone
      return list.map(country => {
        return {
          ...country,
        };
      });
    }
  },
};
