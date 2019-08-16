import { parse } from '../index';

test('pending rom', () => {
  const result = parse('Zoop (U) [!p].gen');
  expect(result.codes).toEqual(expect.objectContaining({ pending: true }));
});
