import { pipe } from './pipe';
import { map } from './map';
import { filter } from './filter';
import { takeWhile } from './take-while';

describe('pipe', () => {
  it('should apply the specified operators in sequence and return the final result', () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput = input.map((i) => i + 8);

    const result = Array.from(
      pipe(
        input,
        map((x) => x + 1),
        map((x) => x + 1),
        map((x) => x + 1),
        map((x) => x + 1),
        map((x) => x + 1),
        map((x) => x + 1),
        map((x) => x + 1),
        map((x) => x + 1),
      ),
    );

    expect(result).toEqual(expectedOutput);
  });

  it('should work with array example from docs', () => {
    const input = [1, 2, 3, 4, 5];
    const result = pipe(
      input,
      filter((value: number) => value % 2 === 0),
      map((value: number) => value * 2),
    );
    expect([...result]).toEqual([4, 8]);
  });

  it('should work with infinite example from docs', () => {
    const count = function* () {
      let i = 0;
      while (true) {
        yield i++;
      }
    };
    const input = count();
    const result = pipe(
      input,
      takeWhile((value: number) => value < 4),
      map((value: number) => value * 2),
    );
    expect([...result]).toEqual([0, 2, 4, 6]);
  });
});
