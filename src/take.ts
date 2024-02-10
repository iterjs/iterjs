/**
 * Represents an iterator that yields a specified number of elements from the underlying iterator.
 * @typeparam T The type of elements in the iterator.
 */
export class TakeIterator<T> implements Iterator<T> {
  private _taken: number;

  /**
   * Creates a new instance of TakeIterator.
   * @param _iterator The underlying iterator.
   * @param _count The number of elements to take.
   */
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _count: number,
  ) {
    this._taken = 0;
  }

  /**
   * Advances the iterator and returns the next element.
   * @returns An IteratorResult object representing the next element in the iteration.
   */
  next() {
    const next = this._iterator.next();
    if (next.done || this._taken++ < this._count) {
      return next;
    }

    return { done: true, value: undefined } as IteratorResult<T>;
  }
}

/**
 * Represents an iterable that yields a specified number of elements from the underlying iterable.
 * @typeparam T The type of elements in the iterable.
 */
export class TakeIterable<T> implements Iterable<T> {
  /**
   * Creates a new instance of TakeIterable.
   * @param _iterable The underlying iterable.
   * @param _count The number of elements to take.
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
    return new TakeIterator(this._iterable[Symbol.iterator](), this._count);
  }
}

/**
 * Returns a new iterable that yields a specified number of elements from the input iterable.
 * @param count The number of elements to take.
 * @returns A function that takes an iterable and returns a new iterable that yields a specified number of elements.
 * @typeparam T The type of elements in the iterable.
 * @example
 * const input = [1, 2, 3, 4, 5, 6];
 * const count = 3;
 * const result = take(count)(input);
 * console.log([...result]); // [1, 2, 3]
 */
export const take =
  <T>(count: number) =>
  (iter: Iterable<T>) =>
    new TakeIterable(iter, count);
