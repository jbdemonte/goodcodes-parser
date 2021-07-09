import { addDefaultVersion } from './default-version.handler';
import { GoodCodeResult } from '../typing';

test('add a default version', () => {
  const source = {
    codes: {},
  } as GoodCodeResult;
  addDefaultVersion(source);
  expect(source.codes.version).toEqual({ stable: { major: 1, minor: 0, patch: 0 } });
});

test('does not modify existing version', () => {
  const source = {
    codes: { version: { old: { major: 1, minor: 2, patch: 3 } } },
  } as GoodCodeResult;
  addDefaultVersion(source);
  expect(source.codes.version).toEqual({ old: { major: 1, minor: 2, patch: 3 } });
});
