export class MapIterator<T, U> implements Iterator<U> {
  private readonly _next: IteratorResult<U>;

  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _map: (value: T) => U,
  ) {
    this._next = { done: false, value: undefined } as IteratorResult<U>;
  }

  next() {
    const { value, done } = this._iterator.next();

    this._next.value = done ? undefined : this._map(value);
    this._next.done = done;

    return this._next;
  }
}

export class MapIterable<T, U> implements Iterable<U> {
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _map: (value: T) => U,
  ) {}

  [Symbol.iterator]() {
    return new MapIterator(this._iterable[Symbol.iterator](), this._map);
  }
}

export const map =
  <T, U>(fn: (value: T) => U) =>
  (iter: Iterable<T>) =>
    new MapIterable(iter, fn);
