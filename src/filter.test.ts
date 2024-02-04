import { filter } from './filter';

describe('filter', () => {
  it('should filter out elements that do not satisfy the predicate', () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput = [2, 4];

    const result = Array.from(filter((value: number) => value % 2 === 0)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty iterable if all elements are filtered out', () => {
    const input = [1, 3, 5];
    const expectedOutput: number[] = [];

    const result = Array.from(filter((value: number) => value % 2 === 0)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return all elements if the predicate always returns true', () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput = [1, 2, 3, 4, 5];

    const result = Array.from(filter(() => true)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with non-numeric values', () => {
    const input = ['hello', 'world', 'foo', 'bar'];
    const expectedOutput = ['hello', 'world'];

    const result = Array.from(filter((value: string) => value.length > 3)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with an empty iterable', () => {
    const input: number[] = [];
    const expectedOutput: number[] = [];

    const result = Array.from(filter((value: number) => value % 2 === 0)(input));

    expect(result).toEqual(expectedOutput);
  });
});
