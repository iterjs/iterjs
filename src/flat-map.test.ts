import { flatMap } from './flat-map';

describe('flatMap', () => {
  it('should flatten and map elements of the iterable', () => {
    const input = [1, 2, 3];
    const mapper = (value: number) => [value, value * 2];
    const expectedOutput = [1, 2, 2, 4, 3, 6];

    const result = Array.from(flatMap(mapper)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with non-numeric values', () => {
    const input = ['Hello', 'World'];
    const mapper = (value: string) => [value.toUpperCase(), value.toLowerCase()];
    const expectedOutput = ['HELLO', 'hello', 'WORLD', 'world'];

    const result = Array.from(flatMap(mapper)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty iterable if the input is empty', () => {
    const input: number[] = [];
    const mapper = (value: number) => [value * 2];
    const expectedOutput: number[] = [];

    const result = Array.from(flatMap(mapper)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should handle nested iterables', () => {
    const input = [[1, 2], [], [5, 6]];
    const mapper = (value: number[]) => value.map((num) => num * 2);
    const expectedOutput = [2, 4, 10, 12];

    const result = Array.from(flatMap(mapper)(input));

    expect(result).toEqual(expectedOutput);
  });
});
