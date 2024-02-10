/**
 * Represents an iterator that yields elements from another iterator
 * as long as a specified condition is true.
 *
 * @typeparam T The type of elements in the iterator.
 */
export class TakeWhileIterator<T> implements Iterator<T> {
  /**
   * Creates a new instance of the TakeWhileIterator class.
   *
   * @param _iterator The underlying iterator.
   * @param _filter A function that determines whether an element should be included in the iteration.
   */
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  /**
   * Advances the iterator and returns the next element that satisfies the condition,
   * or marks the iterator as done if no more elements satisfy the condition.
   *
   * @returns An IteratorResult object representing the next element in the iteration.
   */
  next() {
    const next = this._iterator.next();
    if (!next.done && this._filter(next.value)) {
      return next;
    }

    return { done: true, value: undefined } as IteratorResult<T>;
  }
}

/**
 * Represents an iterable sequence of elements that are yielded from another iterable
 * as long as a specified condition is true.
 *
 * @typeparam T The type of elements in the iterable.
 */
export class TakeWhileIterable<T> implements Iterable<T> {
  /**
   * Creates a new instance of the TakeWhileIterable class.
   *
   * @param _iterable The underlying iterable.
   * @param _filter A function that determines whether an element should be included in the iteration.
   */
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  /**
   * Returns an iterator that iterates over the elements of the iterable
   * as long as the specified condition is true.
   *
   * @returns An iterator that yields the elements that satisfy the condition.
   */
  [Symbol.iterator]() {
    return new TakeWhileIterator(this._iterable[Symbol.iterator](), this._filter);
  }
}

/**
 * Creates a new iterable sequence that yields elements from the input iterable
 * as long as a specified condition is true.
 *
 * @param filter A function that determines whether an element should be included in the iteration.
 * @returns A function that takes an iterable and returns a new iterable sequence.
 * @typeparam T The type of elements in the iterable.
 * @example
 * const input = [1, 2, 3, 4, 5];
 * const condition = (value: number) => value < 4;
 * const result = takeWhile(condition)(input);
 * console.log([...result]); // [1, 2, 3]
 */
export const takeWhile =
  <T>(filter: (value: T) => boolean) =>
  (iter: Iterable<T>) =>
    new TakeWhileIterable(iter, filter);
