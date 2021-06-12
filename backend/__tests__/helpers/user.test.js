const {
  getRandomChoice, capitalizeString, checkIfUsernameTaken
} = require('../../helpers/user');

describe('getRandomChoice', () => {
  test('works: valid array of strings', () => {
    const arr = ['hello', 'world', 'player', 'one'];
    const word = getRandomChoice(arr);
    expect(arr).toContainEqual(word);
  });

  test('works: valid array of integers', () => {
    const arr = [1, 2, 3, 4];
    const num = getRandomChoice(arr);
    expect(arr).toContainEqual(num);
  });

  test('returns undefined: argument of invalid type (non-array)', () => {
    const res = getRandomChoice(1);
    expect(res).toBe(undefined);
  });

  test('returns undefined: empty array', () => {
    const res = getRandomChoice([]);
    expect(res).toBe(undefined);
  });

  test('returns undefined: no argument', () => {
    const res = getRandomChoice();
    expect(res).toBe(undefined);
  });
});

describe('capitalizeString', () => {
  test('works: valid lowercase string', () => {
    const word = 'hello'
    const lowered = capitalizeString(word);
    expect(lowered).toEqual('Hello');
  });

  test('works: valid uppercase string', () => {
    const word = 'HELLO'
    const lowered = capitalizeString(word);
    expect(lowered).toEqual('HELLO');
  });

  test('returns undefined: argument of invalid type (non-string)', () => {
    const res = getRandomChoice(1);
    expect(res).toBe(undefined);
  });

  test('returns undefined: empty string', () => {
    const res = getRandomChoice('');
    expect(res).toBe(undefined);
  });

  test('returns undefined: no argument', () => {
    const res = getRandomChoice();
    expect(res).toBe(undefined);
  });
});

describe('checkIfUsernameTaken', () => {
  test('works: name not taken', () => {
    const taken = [{ username: 'test1' }, { username: 'test2' }]
    const isTaken = checkIfUsernameTaken('test3', taken);
    expect(isTaken).toEqual(false);
  });

  test('returns true: name taken', () => {
    const taken = [{ username: 'test1' }, { username: 'test2' }]
    const isTaken = checkIfUsernameTaken('test2', taken);
    expect(isTaken).toEqual(true);
  });

  test('returns undefined: argument of invalid type (non-string)', () => {
    const res = checkIfUsernameTaken(1, [1]);
    expect(res).toBe(undefined);
  });

  test('returns undefined: empty string', () => {
    const res = getRandomChoice('', ['']);
    expect(res).toBe(undefined);
  });

  test('returns undefined: no argument', () => {
    const res = checkIfUsernameTaken();
    expect(res).toBe(undefined);
  });
});