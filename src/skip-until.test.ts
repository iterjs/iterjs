import { skipUntil } from './skip-until';

describe('skipUntil', () => {
  it('should skip elements until the condition is met', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const condition = (value: number) => value % 3 === 0;
    const expectedOutput = [3, 4, 5, 6];

    const result = Array.from(skipUntil(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty iterable if the condition is never met', () => {
    const input = [1, 2, 3, 4, 5];
    const condition = (value: number) => value > 10;
    const expectedOutput: number[] = [];

    const result = Array.from(skipUntil(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with non-numeric values', () => {
    const input = ['hello', 'world', 'foo', 'bar'];
    const condition = (value: string) => value === 'foo';
    const expectedOutput = ['foo', 'bar'];

    const result = Array.from(skipUntil(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with an empty iterable', () => {
    const input: number[] = [];
    const condition = (value: number) => value === 1;
    const expectedOutput: number[] = [];

    const result = Array.from(skipUntil(condition)(input));

    expect(result).toEqual(expectedOutput);
  });
});
