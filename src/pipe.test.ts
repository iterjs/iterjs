import { pipe } from './pipe';
import { map } from './map';

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
});
