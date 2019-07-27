import { parse } from '../index';

test('without version tags', () => {
  const result = parse(`Addams Family, The (Beta) (XYZ1.2) [b] [UI]`);
  expect(result.unknown).toEqual(expect.objectContaining(['(XYZ1.2)', '[UI]']));
});
