import { pipe } from './pipe';
import { skip } from './skip';
import { take } from './take';

export const slice =
  <T>(skipCount: number, takeCount: number) =>
  (iterable: Iterable<T>) =>
    pipe(iterable, skip(skipCount), take(takeCount));
