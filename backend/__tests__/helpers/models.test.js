const { checkLastRating } = require('../../helpers/models');

describe('checkLastRating', () => {
  test('works: rating that was uprated', () => {
    const mockRating = {
      rows: [
        { id: 1, rating: 1 }
      ]
    };
    const { wasUprated, wasDownrated } = checkLastRating(mockRating);
    expect(wasUprated).toBe(true);
    expect(wasDownrated).toBe(false);
  });

  test('works: rating that was downrated', () => {
    const mockRating = {
      rows: [
        { id: 1, rating: -1 }
      ]
    };
    const { wasUprated, wasDownrated } = checkLastRating(mockRating);
    expect(wasUprated).toBe(false);
    expect(wasDownrated).toBe(true);
  });

  test('works: rating that was not rated', () => {
    const mockRating = {
      rows: [
      ]
    };
    const { wasUprated, wasDownrated } = checkLastRating(mockRating);
    expect(wasUprated).toBe(false);
    expect(wasDownrated).toBe(false);
  });

  test('works: no rating passed', () => {
    const { wasUprated, wasDownrated } = checkLastRating();
    expect(wasUprated).toBe(false);
    expect(wasDownrated).toBe(false);
  })
});