import { skipWhile } from './skip-while';

describe('skipWhile', () => {
  it('should skip elements from the iterable while the condition is true', () => {
    const input = [1, 2, 3, 4, 5];
    const condition = (value: number) => value < 3;
    const expectedOutput = [3, 4, 5];

    const result = Array.from(skipWhile(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return all elements if the condition is false for the first element', () => {
    const input = [1, 2, 3];
    const condition = (value: number) => value < 0;
    const expectedOutput = [1, 2, 3];

    const result = Array.from(skipWhile(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty iterable if the condition is true for all elements', () => {
    const input = [1, 2, 3];
    const condition = (value: number) => value < 10;
    const expectedOutput: number[] = [];

    const result = Array.from(skipWhile(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty iterable if the input iterable is empty', () => {
    const input: number[] = [];
    const condition = (value: number) => value < 10;
    const expectedOutput: number[] = [];

    const result = Array.from(skipWhile(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with non-numeric values', () => {
    const input = ['foo', 'bar', 'hello', 'world'];
    const condition = (value: string) => value.length < 5;
    const expectedOutput = ['hello', 'world'];

    const result = Array.from(skipWhile(condition)(input));

    expect(result).toEqual(expectedOutput);
  });
});
