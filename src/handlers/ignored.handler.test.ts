import { parse } from '../index';

test('Camerica / Aladdin', () => {
  const result = parse(`Dizzy The Adventurer (Camerica) (Aladdin) [!].nes`);
  expect(result.unknown).not.toBeDefined();
});
