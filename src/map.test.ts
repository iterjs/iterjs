import { map } from './map';

describe('map', () => {
  it('should apply the mapping function to each value in the iterable', () => {
    const double = (x: number) => x * 2;
    const input = [1, 2, 3, 4, 5];
    const expectedOutput = [2, 4, 6, 8, 10];

    const result = Array.from(map(double)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with an empty iterable', () => {
    const square = (x: number) => x * x;
    const input: number[] = [];
    const expectedOutput: number[] = [];

    const result = Array.from(map(square)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with non-numeric values', () => {
    const toUpperCase = (str: string) => str.toUpperCase();
    const input = ['hello', 'world'];
    const expectedOutput = ['HELLO', 'WORLD'];

    const result = Array.from(map(toUpperCase)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with a string', () => {
    const toUpperCase = (str: string) => str.toUpperCase();
    const input = 'hello';
    const expectedOutput = ['H', 'E', 'L', 'L', 'O'];

    const result = Array.from(map(toUpperCase)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with a Set', () => {
    const double = (x: number) => x * 2;
    const input = new Set([1, 2, 3, 4, 5]);
    const expectedOutput = [2, 4, 6, 8, 10];

    const result = Array.from(map(double)(input));

    expect(result).toEqual(expectedOutput);
  });
});
