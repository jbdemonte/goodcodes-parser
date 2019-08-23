export interface Language {
  code: string;
  name: string;
  default?: boolean;
  translation?: boolean;
}
export interface Country {
  code: string;
  name: string;
}

export const languages: Language[] = [
  { code: 'Alb', name: 'Albanian' },
  { code: 'Ara', name: 'Arabic' },
  { code: 'Bra', name: 'Brazilian Portuguese' },
  { code: 'Chi', name: 'Chinese' },
  { code: 'ChS', name: 'Simplified Chinese' },
  { code: 'SChi', name: 'Simplified Chinese' },
  { code: 'Ch-Simp', name: 'Simplified Chinese' },
  { code: 'Ch-Simple', name: 'Simplified Chinese' },
  { code: 'ChT', name: 'Traditional Chinese' },
  { code: 'TChi', name: 'Traditional Chinese' },
  { code: 'Ch-Trad', name: 'Traditional Chinese' },
  { code: 'Cro', name: 'Croatia' },
  { code: 'Dan', name: 'Danish' },
  { code: 'Dut', name: 'Dutch' },
  { code: 'Eng', name: 'English' },
  { code: 'Fin', name: 'Finnish' },
  { code: 'Fre', name: 'French' },
  { code: 'Ger', name: 'German' },
  { code: 'Gre', name: 'Greek' },
  { code: 'Heb', name: 'Hebrew' },
  { code: 'Ita', name: 'Italian' },
  { code: 'Jap', name: 'Japanese' },
  { code: 'Kor', name: 'Korean' },
  { code: 'Lat', name: 'Latvian' },
  { code: 'Lit', name: 'Lithuanian' },
  { code: 'Nor', name: 'Norwegian' },
  { code: 'Pol', name: 'Polish' },
  { code: 'Por', name: 'Portuguese' },
  { code: 'Rom', name: 'Romanian' },
  { code: 'Rum', name: 'Romanian' },
  { code: 'Rus', name: 'Russian' },
  { code: 'Ser', name: 'Serbian' },
  { code: 'Spa', name: 'Spanish' },
  { code: 'Swe', name: 'Swedish' },
  { code: 'Tai', name: 'Thai' },
  { code: 'Tur', name: 'Turkish' },
  { code: 'Uru', name: 'Uruguay Spanish' },
];

function getLanguage(code: string): Language {
  const language = languages.find(item => item.code === code);
  if (!language) {
    throw new Error(`Language not found for code ${code}`);
  }
  return language;
}

// based on http://emulation.gametechwiki.com/index.php/GoodTools
const countryWithDefaultLanguages: Array<Country & { language: Language }> = [
  // GoodGen
  { code: '1', name: 'Japan & Korea', language: getLanguage('Jap') },
  { code: '4', name: 'USA & Brazil', language: getLanguage('Eng') },

  // standard
  { code: 'A', name: 'Australia', language: getLanguage('Eng') },
  { code: 'As', name: 'Asia', language: getLanguage('Jap') },
  { code: 'B', name: 'Brazil', language: getLanguage('Bra') },
  { code: 'Ch', name: 'China', language: getLanguage('SChi') },
  { code: 'C', name: 'Canada', language: getLanguage('Eng') },
  { code: 'D', name: 'Netherlands', language: getLanguage('Dut') },
  { code: 'E', name: 'Europe', language: getLanguage('Eng') },
  { code: 'F', name: 'France', language: getLanguage('Fre') },
  { code: 'Fn', name: 'Finland', language: getLanguage('Fin') },
  { code: 'G', name: 'Germany', language: getLanguage('Dut') },
  { code: 'Gr', name: 'Greece', language: getLanguage('Gre') },
  { code: 'HK', name: 'Hong Kong', language: getLanguage('SChi') },
  { code: 'I', name: 'Italy', language: getLanguage('Ita') },
  { code: 'J', name: 'Japan', language: getLanguage('Jap') },
  { code: 'K', name: 'Korea', language: getLanguage('Kor') },
  { code: 'Nl', name: 'Netherlands', language: getLanguage('Dut') },
  { code: 'No', name: 'Norway', language: getLanguage('Nor') },
  { code: 'R', name: 'Russia', language: getLanguage('Rus') },
  { code: 'S', name: 'Spain', language: getLanguage('Spa') },
  { code: 'Sw', name: 'Sweden', language: getLanguage('Swe') },
  { code: 'U', name: 'USA', language: getLanguage('Eng') },
  { code: 'UK', name: 'United Kingdom', language: getLanguage('Eng') },
  { code: 'Tw', name: 'Taiwan', language: getLanguage('Tai') },

  { code: 'W', name: 'World', language: getLanguage('Eng') },
  { code: 'Unl', name: 'Unlicensed', language: getLanguage('Eng') },
  { code: 'PD', name: 'Public domain', language: getLanguage('Eng') },
  { code: 'Unk', name: 'Unknown', language: getLanguage('Eng') },
];

export const countries: Country[] = countryWithDefaultLanguages.map(country => ({ code: country.code, name: country.name }));

export function getDefaultLanguage(countryCode: string): Language | undefined {
  const country = countryWithDefaultLanguages.find(item => item.code === countryCode);
  if (country) {
    return country.language;
  }
}

function standardizeBuilder(source: Array<{ name: string }>) {
  const re = new RegExp(
    source
      .filter(item => item.name.indexOf(' ') >= 0)
      .map(item => `(${item.name.toLowerCase()})`)
      .join('|'),
    'g',
  );

  return (name: string) => name.toLowerCase().replace(re, tag => tag.replace(/\s+/, '-'));
}

export const standardizeLanguages = standardizeBuilder(languages);
export const standardizeCountries = standardizeBuilder(countries);
