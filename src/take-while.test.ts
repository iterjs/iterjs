import { takeWhile } from './take-while';

describe('takeWhile', () => {
  it('should take elements while the condition is met', () => {
    const input = [1, 2, 3, 4, 5];
    const condition = (value: number) => value < 4;
    const expectedOutput = [1, 2, 3];

    const result = Array.from(takeWhile(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty iterable if the condition is never met', () => {
    const input = [1, 2, 3, 4, 5];
    const condition = (value: number) => value > 10;
    const expectedOutput: number[] = [];

    const result = Array.from(takeWhile(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with non-numeric values', () => {
    const input = ['foo', 'bar', 'hello', 'world', 'foo', 'bar'];
    const condition = (value: string) => value.length < 4;
    const expectedOutput = ['foo', 'bar'];

    const result = Array.from(takeWhile(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with an empty iterable', () => {
    const input: number[] = [];
    const condition = (value: number) => value === 1;
    const expectedOutput: number[] = [];

    const result = Array.from(takeWhile(condition)(input));

    expect(result).toEqual(expectedOutput);
  });

  it('should work with an infinite iterable', () => {
    const count = function* () {
      let i = 0;
      while (true) {
        yield i++;
      }
    };
    const input = count();
    const condition = (value: number) => value < 10;
    const expectedOutput = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const result = Array.from(takeWhile(condition)(input)).slice(0, 10);

    expect(result).toEqual(expectedOutput);
  });
});
