import { skip } from './skip';

describe('skip', () => {
  it('should skip the specified number of elements from the iterable', () => {
    const input = [1, 2, 3, 4, 5];
    const count = 2;
    const expectedOutput = [3, 4, 5];

    const result = Array.from(skip(count)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with an empty iterable', () => {
    const input: number[] = [];
    const count = 3;
    const expectedOutput: number[] = [];

    const result = Array.from(skip(count)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should skip all elements if skip count is greater than the iterable length', () => {
    const input = [1, 2, 3, 4, 5];
    const count = 10;
    const expectedOutput: number[] = [];

    const result = Array.from(skip(count)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with non-numeric values', () => {
    const input = ['a', 'b', 'c', 'd', 'e'];
    const count = 1;
    const expectedOutput = ['b', 'c', 'd', 'e'];

    const result = Array.from(skip(count)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with a string', () => {
    const input = 'hello';
    const count = 2;
    const expectedOutput = ['l', 'l', 'o'];

    const result = Array.from(skip(count)(input));

    expect(result).toEqual(expectedOutput);
  });
});
