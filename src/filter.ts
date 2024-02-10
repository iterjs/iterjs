/**
 * Represents an iterator that filters values based on a given predicate.
 * @template T The type of values in the iterator.
 */
export class FilterIterator<T> implements Iterator<T> {
  /**
   * Creates a new instance of FilterIterator.
   * @param _iterator The underlying iterator.
   * @param _filter The predicate function used for filtering values.
   */
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  /**
   * Advances the iterator to the next value that satisfies the filter predicate.
   * @returns An IteratorResult object containing the next value or done flag.
   */
  next() {
    for (;;) {
      const next = this._iterator.next();

      if (next.done) {
        return next;
      }

      if (this._filter(next.value)) {
        return next;
      }
    }
  }
}

/**
 * Represents an iterable that filters values based on a given predicate.
 * @template T The type of values in the iterable.
 */
export class FilterIterable<T> implements Iterable<T> {
  /**
   * Creates a new instance of FilterIterable.
   * @param _iterable The underlying iterable.
   * @param _filter The predicate function used for filtering values.
   */
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  /**
   * Returns an iterator for the iterable that filters values based on the predicate.
   * @returns An iterator object.
   */
  [Symbol.iterator]() {
    return new FilterIterator(this._iterable[Symbol.iterator](), this._filter);
  }
}

/**
 * Creates a new iterable that filters values based on a given predicate.
 * @template T The type of values in the iterable.
 * @param fn The predicate function used for filtering values.
 * @returns A function that takes an iterable and returns a new filtered iterable.
 * @example
 * const input = [1, 2, 3, 4, 5];
 * const isEven = (value: number) => value % 2 === 0;
 * console.log([...filter(isEven)(input)]); // Output: [2, 4]
 */
export const filter =
  <T>(fn: (value: T) => boolean) =>
  (iter: Iterable<T>) =>
    new FilterIterable(iter, fn);
