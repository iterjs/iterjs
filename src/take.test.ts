import { take } from './take';

describe('take', () => {
  it('should take the specified number of elements from the iterable', () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput = [1, 2, 3];

    const result = Array.from(take(3)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return all elements if count is greater than the length of the iterable', () => {
    const input = [1, 2, 3];
    const expectedOutput = [1, 2, 3];

    const result = Array.from(take(5)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty iterable if count is 0', () => {
    const input = [1, 2, 3];
    const expectedOutput: number[] = [];

    const result = Array.from(take(0)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty iterable if the input iterable is empty', () => {
    const input: number[] = [];
    const expectedOutput: number[] = [];

    const result = Array.from(take(3)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with non-numeric values', () => {
    const input = ['hello', 'world', 'foo', 'bar'];
    const expectedOutput = ['hello', 'world'];

    const result = Array.from(take(2)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with a generator', () => {
    const count = function* () {
      let i = 0;
      while (true) {
        yield i++;
      }
    };
    const input = count();
    const expectedOutput = [0, 1, 2];

    const result = Array.from(take(3)(input));

    expect(result).toEqual(expectedOutput);
  });
});
