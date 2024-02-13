/**
 * Represents an iterator that applies a mapping function to each element of the source iterator
 * and flattens the result into a single iterator.
 *
 * @typeparam T The type of the elements in the source iterator.
 * @typeparam U The type of the elements in the resulting iterator.
 */
export class FlatMapIterator<T, U> implements Iterator<U> {
  private _innerIterator: Iterator<U> | null;

  /**
   * Creates a new instance of the FlatMapIterator class.
   *
   * @param _iterator The source iterator.
   * @param _map The mapping function to apply to each element of the source iterator.
   */
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _map: (value: T) => Iterable<U>,
  ) {
    this._innerIterator = null;
  }

  /**
   * Advances the iterator to the next element and returns the result.
   *
   * @returns An IteratorResult object representing the next element in the iterator.
   */
  next() {
    let innerIterator = this._getInnerIterator();
    if (!innerIterator) {
      return { done: true, value: undefined } as IteratorResult<U>;
    }

    let next = innerIterator.next();

    while (next.done) {
      this._resetInnerIterator();
      innerIterator = this._getInnerIterator();
      if (!innerIterator) {
        return { done: true, value: undefined } as IteratorResult<U>;
      }
      next = innerIterator.next();
    }

    return next;
  }

  private _resetInnerIterator() {
    this._innerIterator = null;
  }

  private _getInnerIterator() {
    if (this._innerIterator) {
      return this._innerIterator;
    }

    const next = this._iterator.next();
    if (next.done) {
      return null;
    }

    const mappedIterable = this._map(next.value);
    this._innerIterator = mappedIterable[Symbol.iterator]();

    return this._innerIterator;
  }
}

/**
 * Represents an iterable that applies a mapping function to each element of the source iterable
 * and flattens the result into a single iterable.
 *
 * @typeparam T The type of the elements in the source iterable.
 * @typeparam U The type of the elements in the resulting iterable.
 */
export class FlatMapIterable<T, U> implements Iterable<U> {
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _map: (value: T) => Iterable<U>,
  ) {}

  /**
   * Returns an iterator that applies the mapping function to each element of the underlying iterable
   * and flattens the result into a single iterable.
   * @returns The iterator that applies the mapping function to each element of the underlying iterable and flattens the result into a single iterable.
   */
  [Symbol.iterator]() {
    return new FlatMapIterator(this._iterable[Symbol.iterator](), this._map);
  }
}

/**
 * Returns a new iterable by applying a mapping function to each element of the input iterable
 * and flattening the result.
 *
 * @typeparam T The type of the elements in the input iterable.
 * @typeparam U The type of the elements in the output iterable.
 * @param fn The mapping function to apply to each element of the input iterable.
 * @returns A new iterable with the flattened result of applying the mapping function to each element.
 * @example
 * const double = (x: number) => [x, x * 2];
 * const input = [1, 2, 3];
 * const result = flatMap(double)(input);
 * console.log([...result]); // [1, 2, 2, 4, 3, 6]
 */
export const flatMap =
  <T, U>(fn: (value: T) => Iterable<U>) =>
  (iter: Iterable<T>) =>
    new FlatMapIterable(iter, fn);
