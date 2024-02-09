export class SkipWhileIterator<T> implements Iterator<T> {
  private _found: boolean;

  constructor(
    private readonly _iterator: Iterator<T>,
    private readonly _filter: (value: T) => boolean,
  ) {
    this._found = false;
  }

  next() {
    let next = this._iterator.next();
    while (!this._found && !next.done && this._filter(next.value)) {
      next = this._iterator.next();
    }

    this._found = true;
    return next;
  }
}

export class SkipWhileIterable<T> implements Iterable<T> {
  constructor(
    private readonly _iterable: Iterable<T>,
    private readonly _filter: (value: T) => boolean,
  ) {}

  [Symbol.iterator]() {
    return new SkipWhileIterator(this._iterable[Symbol.iterator](), this._filter);
  }
}

export const skipWhile =
  <T>(fn: (value: T) => boolean) =>
  (iter: Iterable<T>) =>
    new SkipWhileIterable(iter, fn);
