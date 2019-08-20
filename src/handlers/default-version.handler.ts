import { GoodCodeResult } from '../typing';

export function addDefaultVersion(result: GoodCodeResult): void {
  if (!result.codes.version) {
    result.codes.version = { stable: { major: 1, minor: 0, patch: 0 } };
  }
}
