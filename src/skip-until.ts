/**
 * Represents an iterator that skips elements from the underlying iterator
 * until a condition is met.
 *
 * @typeparam T The type of elements in the iterator.
 */
export class SkipUntilIterator<T> implements Iterator<T> {
  private _found: boolean;

  /**
   * Creates a new instance of SkipUntilIterator.
   *
   * @param _iterator The underlying iterator.
   * @param _filter The condition function to determine when to stop skipping.
   */
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _filter: (value: T) => boolean,
  ) {
    this._found = false;
  }

  /**
   * Advances the iterator until the condition is met and returns the next element.
   *
   * @returns An iterator result object containing the next element.
   */
  next() {
    let next = this._iterator.next();
    while (!this._found && !next.done && !this._filter(next.value)) {
      next = this._iterator.next();
    }

    this._found = true;
    return next;
  }
}

/**
 * Represents an iterable that skips elements from the underlying iterable
 * until a condition is met.
 *
 * @typeparam T The type of elements in the iterable.
 */
export class SkipUntilIterable<T> implements Iterable<T> {
  /**
   * Creates a new instance of SkipUntilIterable.
   *
   * @param _iterable The underlying iterable.
   * @param _filter The condition function to determine when to stop skipping.
   */
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  /**
   * Returns an iterator for the iterable.
   *
   * @returns An iterator object.
   */
  [Symbol.iterator]() {
    return new SkipUntilIterator(this._iterable[Symbol.iterator](), this._filter);
  }
}

/**
 * Creates a new iterable that skips elements from the input iterable
 * until a condition is met.
 *
 * @typeparam T The type of elements in the iterable.
 * @param fn The condition function to determine when to stop skipping.
 * @returns A new iterable that skips elements until the condition is met.
 *
 * @example
 * const input = [1, 2, 3, 4, 5, 6];
 * const condition = (value: number) => value % 3 === 0;
 * const result = skipUntil(condition)(input);
 * console.log([...result]); // Output: [3, 4, 5, 6]
 */
export const skipUntil =
  <T>(fn: (value: T) => boolean) =>
  (iter: Iterable<T>) =>
    new SkipUntilIterable(iter, fn);
