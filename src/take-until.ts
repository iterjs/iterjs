export class TakeUntilIterator<T> implements Iterator<T> {
  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  next() {
    const next = this._iterator.next();
    if (!next.done && !this._filter(next.value)) {
      return next;
    }

    return { done: true, value: undefined } as IteratorResult<T>;
  }
}

export class TakeUntilIterable<T> implements Iterable<T> {
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  [Symbol.iterator]() {
    return new TakeUntilIterator(this._iterable[Symbol.iterator](), this._filter);
  }
}

export const takeUntil =
  <T>(fn: (value: T) => boolean) =>
  (iter: Iterable<T>) =>
    new TakeUntilIterable(iter, fn);
