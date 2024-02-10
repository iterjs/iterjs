/**
 * Represents an iterator that applies a mapping function to each element of the underlying iterator.
 * @typeparam T The type of the elements in the underlying iterator.
 * @typeparam U The type of the elements in the mapped iterator.
 */
export class MapIterator<T, U> implements Iterator<U> {
  private readonly _next: IteratorResult<U>;

  /**
   * Creates a new instance of the MapIterator class.
   * @param _iterator The underlying iterator.
   * @param _map The mapping function to apply to each element.
   */
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _map: (value: T) => U,
  ) {
    this._next = { done: false, value: undefined } as IteratorResult<U>;
  }

  /**
   * Advances the iterator and returns the next element in the mapped sequence.
   * @returns An IteratorResult object containing the next element in the mapped sequence.
   */
  next() {
    const { value, done } = this._iterator.next();

    this._next.value = done ? undefined : this._map(value);
    this._next.done = done;

    return this._next;
  }
}

/**
 * Represents an iterable that applies a mapping function to each element of the underlying iterable.
 * @typeparam T The type of the elements in the underlying iterable.
 * @typeparam U The type of the elements in the mapped iterable.
 */
export class MapIterable<T, U> implements Iterable<U> {
  /**
   * Creates a new instance of the MapIterable class.
   * @param _iterable The underlying iterable.
   * @param _map The mapping function to apply to each element.
   */
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _map: (value: T) => U,
  ) {}

  /**
   * Returns an iterator that applies the mapping function to each element of the underlying iterable.
   * @returns An iterator that applies the mapping function to each element of the underlying iterable.
   */
  [Symbol.iterator]() {
    return new MapIterator(this._iterable[Symbol.iterator](), this._map);
  }
}

/**
 * Returns a new iterable that applies the specified mapping function to each element of the input iterable.
 * @param fn The mapping function to apply to each element.
 * @returns A new iterable that applies the mapping function to each element of the input iterable.
 * @typeparam T The type of the elements in the input iterable.
 * @typeparam U The type of the elements in the mapped iterable.
 * @example
 * const double = (x: number) => x * 2;
 * const input = [1, 2, 3, 4, 5];
 * const result = map(double)(input);
 * console.log([...result]); // Output: [2, 4, 6, 8, 10]
 */
export const map =
  <T, U>(fn: (value: T) => U) =>
  (iter: Iterable<T>) =>
    new MapIterable(iter, fn);
