// todo: https://www.tosecdev.org/tosec-naming-convention

import { alternativeandler } from './handlers/alternative.handler';
import { badHandler } from './handlers/bad.handler';
import { checksumHandler } from './handlers/checksum.handler';
import { compilationHandler } from './handlers/compilation.handler';
import { countriesHandler } from './handlers/countries.handler';
import { fixedHandler } from './handlers/fixed.handler';
import { formatHandler } from './handlers/format.handler';
import { goodHandler } from './handlers/good.handler';
import { hackedHandler } from './handlers/hacked.handler';
import { CodeHandler } from './handlers/handler.types';
import { languageCountHandler } from './handlers/language-count.handler';
import { languagesHandler } from './handlers/languages.handler';
import { overdumpedHandler } from './handlers/overdumped.handler';
import { pendingHandler } from './handlers/pending.handler';
import { piratedHandler } from './handlers/pirated.handler';
import { revisionHandler } from './handlers/revision.handler';
import { trainedHandler } from './handlers/trained.handler';
import { translationHandler } from './handlers/translation.handler';
import { alphaNumericVersionHandler, numericVersionHandler } from './handlers/version.handler';
import { CodeResult } from './typing';

const handlers: CodeHandler[] = [
  goodHandler,
  pendingHandler,
  alternativeandler,
  fixedHandler,
  overdumpedHandler,
  piratedHandler,
  badHandler,
  checksumHandler,
  trainedHandler,
  hackedHandler,
  revisionHandler,
  numericVersionHandler,
  alphaNumericVersionHandler,
  translationHandler,
  languageCountHandler,
  formatHandler,
  compilationHandler,
  countriesHandler,
  languagesHandler,
];

export function parseCode(code: string): CodeResult | undefined {
  const result: CodeResult = {};
  for (const handler of handlers) {
    const match = code.match(handler.re);
    if (match) {
      const value = handler.cast ? handler.cast(match) : true;
      if (value !== undefined) {
        // @ts-ignore
        result[handler.key] = value;
        return result;
      }
    }
  }
  return undefined;
}
