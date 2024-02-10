/**
 * Represents an iterator that skips a specified number of elements from the beginning of an iterable.
 * @typeparam T The type of elements in the iterable.
 */
export class SkipIterator<T> implements Iterator<T> {
  private _index: number;

  /**
   * Creates a new instance of SkipIterator.
   * @param _iterator The iterator to skip elements from.
   * @param _count The number of elements to skip.
   */
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _count: number,
  ) {
    this._index = 0;
  }

  /**
   * Advances the iterator to the next element and returns the result.
   * @returns An IteratorResult object containing the next element in the iteration sequence.
   */
  next() {
    while (this._index < this._count) {
      const next = this._iterator.next();
      if (next.done) {
        return next;
      }

      this._index++;
    }

    return this._iterator.next();
  }
}

/**
 * Represents an iterable that skips a specified number of elements from the beginning of another iterable.
 * @typeparam T The type of elements in the iterable.
 */
export class SkipIterable<T> implements Iterable<T> {
  /**
   * Creates a new instance of SkipIterable.
   * @param _iterable The iterable to skip elements from.
   * @param _count The number of elements to skip.
   */
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _count: number,
  ) {}

  /**
   * Returns an iterator for the iterable.
   * @returns An iterator object that can be used to iterate over the elements of the iterable.
   */
  [Symbol.iterator]() {
    return new SkipIterator(this._iterable[Symbol.iterator](), this._count);
  }
}

/**
 * Creates a new iterable that skips a specified number of elements from the beginning of the input iterable.
 * @param count The number of elements to skip.
 * @returns A function that takes an iterable and returns a new iterable that skips the specified number of elements.
 * @typeparam T The type of elements in the iterable.
 * @example
 * const input = [1, 2, 3, 4, 5];
 * const count = 2;
 * const result = skip(count)(input);
 * console.log([...result]); // Output: [3, 4, 5]
 */
export const skip =
  <T>(count: number) =>
  (iter: Iterable<T>) =>
    new SkipIterable(iter, count);
