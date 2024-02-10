/**
 * Represents an iterator that yields elements from the underlying iterator until a specified condition is met.
 * @typeparam T The type of elements in the iterator.
 */
export class TakeUntilIterator<T> implements Iterator<T> {
  /**
   * Creates a new instance of the TakeUntilIterator class.
   * @param _iterator The underlying iterator.
   * @param _filter The condition function that determines when to stop iterating.
   */
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  /**
   * Advances the iterator and returns the next element that satisfies the condition, or marks the iterator as done.
   * @returns An IteratorResult object representing the next element or the end of iteration.
   */
  next() {
    const next = this._iterator.next();
    if (!next.done && !this._filter(next.value)) {
      return next;
    }

    return { done: true, value: undefined } as IteratorResult<T>;
  }
}

/**
 * Represents an iterable that yields elements from the underlying iterable until a specified condition is met.
 * @typeparam T The type of elements in the iterable.
 */
export class TakeUntilIterable<T> implements Iterable<T> {
  /**
   * Creates a new instance of the TakeUntilIterable class.
   * @param _iterable The underlying iterable.
   * @param _filter The condition function that determines when to stop iterating.
   */
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  /**
   * Returns an iterator for the iterable.
   * @returns An iterator object that can be used to iterate over the elements of the iterable.
   */
  [Symbol.iterator]() {
    return new TakeUntilIterator(this._iterable[Symbol.iterator](), this._filter);
  }
}

/**
 * Creates a new iterable that yields elements from the input iterable until a specified condition is met.
 * @param fn The condition function that determines when to stop iterating.
 * @returns A function that takes an iterable and returns a new iterable that stops when the condition is met.
 * @typeparam T The type of elements in the iterable.
 * @example
 * const input = [1, 2, 3, 4, 5, 6];
 * const condition = (value: number) => value % 3 === 0;
 * const result = takeUntil(condition)(input);
 * console.log([...result]); // [1, 2]
 */
export const takeUntil =
  <T>(fn: (value: T) => boolean) =>
  (iter: Iterable<T>) =>
    new TakeUntilIterable(iter, fn);
