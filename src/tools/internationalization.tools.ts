export type Language = { code: string; name: string };
export type Country = { code: string; name: string };

export const languages: Language[] = [
  { code: 'Alb', name: 'Albanian' },
  { code: 'Ara', name: 'Arabic' },
  { code: 'Bra', name: 'Brazilian Portuguese' },
  { code: 'Chi', name: 'Chinese' },
  { code: 'ChS', name: 'Simplified Chinese' },
  { code: 'SChi', name: 'Simplified Chinese' },
  { code: 'ChT', name: 'Traditional Chinese' },
  { code: 'TChi', name: 'Traditional Chinese' },
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

// based on http://emulation.gametechwiki.com/index.php/GoodTools
export const countries: Country[] = [
  // GoodGen
  { code: '1', name: 'Japan & Korea' },
  { code: '4', name: 'USA & Brazil' },

  // standard
  { code: 'A', name: 'Australia' },
  { code: 'As', name: 'Asia' },
  { code: 'B', name: 'Brazil' },
  { code: 'Ch', name: 'China' },
  { code: 'C', name: 'Canada' },
  { code: 'D', name: 'Netherlands' },
  { code: 'E', name: 'Europe' },
  { code: 'F', name: 'France' },
  { code: 'Fn', name: 'Finland' },
  { code: 'G', name: 'Germany' },
  { code: 'Gr', name: 'Greece' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'I', name: 'Italy' },
  { code: 'J', name: 'Japan' },
  { code: 'K', name: 'Korea' },
  { code: 'Nl', name: 'Netherlands' },
  { code: 'No', name: 'Norway' },
  { code: 'R', name: 'Russia' },
  { code: 'S', name: 'Spain' },
  { code: 'Sw', name: 'Sweden' },
  { code: 'U', name: 'USA' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'Tw', name: 'Taiwan' },

  { code: 'W', name: 'World' },
  { code: 'Unl', name: 'Unlicensed' },
  { code: 'PD', name: 'Public domain' },
  { code: 'Unk', name: 'Unknown' },
];

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
