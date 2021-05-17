const { calculateDistance } = require('../../helpers/locater');

describe('calculateDistance', () => {
  test('works: known distance', () => {
    const firstPoint = [46, -117]; // Asotin, WA
    const secondPoint = [48, -117]; // Bonner County, ID
    const distance = calculateDistance(firstPoint, secondPoint);
    expect(distance).toBeCloseTo(138.2, 1);
  });

  test('fails: no second point', () => {
    const firstPoint = [46, -117]; // Asotin, WA
    const distance = calculateDistance(firstPoint);
    expect(distance).toEqual(undefined);
  });
  test('fails: no first point', () => {
    const secondPoint = [48, -117]; // Bonner County, ID
    const distance = calculateDistance(undefined, secondPoint);
    expect(distance).toEqual(undefined);
  });
  test('fails: no points', () => {
    const distance = calculateDistance();
    expect(distance).toEqual(undefined);
  });
});