import { parse } from '../index';

test('good room', () => {
  const result = parse('Zoop (U) [!].gen');
  expect(result.codes).toEqual(expect.objectContaining({ good: true }));
});
