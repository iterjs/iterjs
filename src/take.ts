export class TakeIterator<T> implements Iterator<T> {
  private _taken: number;

  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _count: number,
  ) {
    this._taken = 0;
  }

  next() {
    const next = this._iterator.next();
    if (next.done || this._taken++ < this._count) {
      return next;
    }

    return { done: true, value: undefined } as IteratorResult<T>;
  }
}

export class TakeIterable<T> implements Iterable<T> {
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _count: number,
  ) {}

  [Symbol.iterator]() {
    return new TakeIterator(this._iterable[Symbol.iterator](), this._count);
  }
}

export const take =
  <T>(count: number) =>
  (iter: Iterable<T>) =>
    new TakeIterable(iter, count);
