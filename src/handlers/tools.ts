import { Caster } from './handler.types';

/**
 * Example if tag = "o", handle "[o]", "[o#]", "[o#C]", "[o#+C]", "[o#+#C]"
 * @param tag
 */
export function buildStandardizedVersionCaster(tag: string): { re: RegExp; cast: Caster } {
  return {
    re: new RegExp(`^\\[${tag}(\\d*)(?:(\\+)?(\\d+)?C)?\\]$`, 'i'),
    cast(match) {
      if (match[1]) {
        return {
          major: parseInt(match[1] || 0, 10),
          minor: parseInt(match[3] || 0, 10) || (match[2] ? 1 : 0),
        };
      }
      return true;
    },
  };
}
