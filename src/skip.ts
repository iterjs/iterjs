export class SkipIterator<T> implements Iterator<T> {
  private _index: number;

  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _count: number,
  ) {
    this._index = 0;
  }

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

export class SkipIterable<T> implements Iterable<T> {
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _count: number,
  ) {}

  [Symbol.iterator]() {
    return new SkipIterator(this._iterable[Symbol.iterator](), this._count);
  }
}

export const skip =
  <T>(count: number) =>
  (iter: Iterable<T>) =>
    new SkipIterable(iter, count);
