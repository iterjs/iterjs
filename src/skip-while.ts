/**
 * Represents an iterator that skips elements from the underlying iterator
 * until a condition is met.
 *
 * @typeparam T - The type of elements in the iterator.
 */
export class SkipWhileIterator<T> implements Iterator<T> {
  private _found: boolean;

  /**
   * Creates a new instance of SkipWhileIterator.
   *
   * @param _iterator - The underlying iterator.
   * @param _filter - The condition function to skip elements.
   */
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _filter: (value: T) => boolean,
  ) {
    this._found = false;
  }

  /**
   * Advances the iterator and returns the next element that satisfies the condition.
   *
   * @returns An IteratorResult object containing the next element.
   */
  next() {
    let next = this._iterator.next();
    while (!this._found && !next.done && this._filter(next.value)) {
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
 * @typeparam T - The type of elements in the iterable.
 */
export class SkipWhileIterable<T> implements Iterable<T> {
  /**
   * Creates a new instance of SkipWhileIterable.
   *
   * @param _iterable - The underlying iterable.
   * @param _filter - The condition function to skip elements.
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
    return new SkipWhileIterator(this._iterable[Symbol.iterator](), this._filter);
  }
}

/**
 * Creates a new iterable that skips elements from the input iterable
 * until a condition is met.
 *
 * @typeparam T - The type of elements in the iterable.
 * @param fn - The condition function to skip elements.
 * @returns A function that takes an iterable and returns a new iterable.
 * @example
 * const input = [1, 2, 3, 4, 5];
 * const condition = (value: number) => value < 3;
 * const result = skipWhile(condition)(input);
 * console.log([...result]); // [3, 4, 5]
 */
export const skipWhile =
  <T>(fn: (value: T) => boolean) =>
  (iter: Iterable<T>) =>
    new SkipWhileIterable(iter, fn);
