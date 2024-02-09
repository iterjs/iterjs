import { takeUntil } from './take-until';

describe('takeUntil', () => {
  it('should take elements until the condition is met', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const condition = (value: number) => value % 3 === 0;
    const expectedOutput = [1, 2];

    const result = Array.from(takeUntil(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return all elements if the condition is never met', () => {
    const input = [1, 2, 3, 4, 5];
    const condition = (value: number) => value === 10;
    const expectedOutput = [1, 2, 3, 4, 5];

    const result = Array.from(takeUntil(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with non-numeric values', () => {
    const input = ['hello', 'world', 'foo', 'bar'];
    const condition = (value: string) => value === 'foo';
    const expectedOutput = ['hello', 'world'];

    const result = Array.from(takeUntil(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with an empty iterable', () => {
    const input: number[] = [];
    const condition = (value: number) => value === 1;
    const expectedOutput: number[] = [];

    const result = Array.from(takeUntil(condition)(input));

    expect(result).toEqual(expectedOutput);
  });
});
