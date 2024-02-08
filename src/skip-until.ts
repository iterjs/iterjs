export class SkipUntilIterator<T> implements Iterator<T> {
  private _found: boolean;

  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _filter: (value: T) => boolean,
  ) {
    this._found = false;
  }

  next() {
    let next = this._iterator.next();
    if (this._found) {
      return next;
    }

    while (!next.done && !this._filter(next.value)) {
      next = this._iterator.next();
    }

    this._found = true;
    return next;
  }
}

export class SkipUntilIterable<T> implements Iterable<T> {
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  [Symbol.iterator]() {
    return new SkipUntilIterator(this._iterable[Symbol.iterator](), this._filter);
  }
}

export const skipUntil =
  <T>(fn: (value: T) => boolean) =>
  (iter: Iterable<T>) =>
    new SkipUntilIterable(iter, fn);
