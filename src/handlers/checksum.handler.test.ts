import { parse } from '../index';

test('undefined', () => {
  const result = parse(`World Class Leaderboard Golf (U) [h1C].bin`);
  expect(result.codes.checksum).toEqual(undefined);
});

test('good checksum', () => {
  const result = parse(`World Class Leaderboard Golf (U) [c][!].bin`);
  expect(result.codes.checksum).toEqual({ good: true });
});

test('bad checksum', () => {
  const result = parse(`World Class Leaderboard Golf (E) [x].bin`);
  expect(result.codes.checksum).toEqual({ bad: true });
});
