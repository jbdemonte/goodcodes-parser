import { VersionKey, VersionValue } from '../typing';
import { CodeHandler } from './handler.types';

function camelCase(source: string) {
  return source
    .split(/[^a-z]+/i)
    .map((word, index) => (index ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase()))
    .join('');
}

export const numericVersionHandler: CodeHandler = {
  tag: '(VX.X)',
  key: 'version',
  title: 'Version number',
  description: '1.0 is earliest',
  re: /^\(V(\d+)(?:\.(\d+)(?:\.(\d+))?)?\)$/,
  cast(match) {
    return {
      stable: {
        major: parseInt(match[1], 10),
        minor: match[2] ? parseInt(match[2], 10) : 0,
        patch: match[3] ? parseInt(match[3], 10) : 0,
      },
    };
  },
};

export const alphaNumericVersionHandler: CodeHandler = {
  tags: ['(Alpha)', '(Beta)', '(Pre-Release)', '(Prototype)', '(Proto)', '(Demo)', '(Sample)', '(old)'],
  key: 'version',
  title: 'Version type',
  description: 'Type of version (Alpha, Beta...)',
  re: /^\((Alpha|Beta|Pre-Release|Prototype|Proto|Demo|Sample|old)(?:\s*(\d+)(?:\.(\d+)(?:\.(\d+))?)?)?\)$/i,
  cast(match) {
    const result: VersionValue = {};
    let tag = camelCase(match[1]);
    if (tag === 'proto') {
      tag = 'prototype';
    }
    result[tag as VersionKey] = {
      major: match[2] ? parseInt(match[2], 10) : 1,
      minor: match[3] ? parseInt(match[3], 10) : 0,
      patch: match[4] ? parseInt(match[4], 10) : 0,
    };
    return result;
  },
};
