import { pipe } from './pipe';
import { skip } from './skip';
import { take } from './take';

/**
 * Creates a new iterable that contains a slice of elements from the input iterable.
 *
 * @param skipCount The number of elements to skip from the beginning of the iterable.
 * @param takeCount The number of elements to take from the iterable after skipping.
 * @returns A new iterable that represents the sliced portion of the input iterable.
 * @typeparam T The type of elements in the iterable.
 * @example
 * const input = [1, 2, 3, 4, 5];
 * const result = slice(2, 3)(input);
 * console.log([...result]); // [3, 4, 5]
 */
export const slice =
  <T>(skipCount: number, takeCount: number) =>
  (iterable: Iterable<T>) =>
    pipe(iterable, skip(skipCount), take(takeCount));
