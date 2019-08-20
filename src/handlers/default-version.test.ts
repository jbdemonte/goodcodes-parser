import { addDefaultVersion } from './default-version.handler';

test('add a default version', () => {
  const source: any = {
    codes: {},
  };
  addDefaultVersion(source);
  expect(source.codes.version).toEqual({ stable: { major: 1, minor: 0, patch: 0 } });
});

test('does not modify existing version', () => {
  const source: any = {
    codes: { version: { foo: 'bar' } },
  };
  addDefaultVersion(source);
  expect(source.codes.version).toEqual({ foo: 'bar' });
});
