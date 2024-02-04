import { slice } from './slice';

describe('slice', () => {
  it('should skip the specified number of elements and return the remaining elements', () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput = [3, 4, 5];

    const result = Array.from(slice(2, 3)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty iterable if skip is greater than the number of elements', () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput: number[] = [];

    const result = Array.from(slice(6, 3)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty iterable if take is 0', () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput: number[] = [];

    const result = Array.from(slice(2, 0)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty iterable if skip is aout of array length', () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput: number[] = [];

    const result = Array.from(slice(input.length, 0)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with a string', () => {
    const input = 'hello world';
    const expectedOutput = 'lo worl';

    const result = Array.from(slice(3, 7)(input)).join('');

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
    const expectedOutput = [2, 3, 4, 5, 6];

    const result = Array.from(slice(2, 5)(input));

    expect(result).toEqual(expectedOutput);
  });
});
