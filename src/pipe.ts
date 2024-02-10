import type { IterableOperator } from './types';

export function pipe<T1, T2>(iter: Iterable<T1>, op1: IterableOperator<T1, T2>): Iterable<T2>;

export function pipe<T1, T2, T3>(
  iter: Iterable<T1>,
  op1: IterableOperator<T1, T2>,
  op2: IterableOperator<T2, T3>,
): Iterable<T3>;

export function pipe<T1, T2, T3, T4>(
  iter: Iterable<T1>,
  op1: IterableOperator<T1, T2>,
  op2: IterableOperator<T2, T3>,
  op3: IterableOperator<T3, T4>,
): Iterable<T4>;

export function pipe<T1, T2, T3, T4, T5>(
  iter: Iterable<T1>,
  op1: IterableOperator<T1, T2>,
  op2: IterableOperator<T2, T3>,
  op3: IterableOperator<T3, T4>,
  op4: IterableOperator<T4, T5>,
): Iterable<T5>;

export function pipe<T1, T2, T3, T4, T5, T6>(
  iter: Iterable<T1>,
  op1: IterableOperator<T1, T2>,
  op2: IterableOperator<T2, T3>,
  op3: IterableOperator<T3, T4>,
  op4: IterableOperator<T4, T5>,
  op5: IterableOperator<T5, T6>,
): Iterable<T6>;

export function pipe<T1, T2, T3, T4, T5, T6, T7>(
  iter: Iterable<T1>,
  op1: IterableOperator<T1, T2>,
  op2: IterableOperator<T2, T3>,
  op3: IterableOperator<T3, T4>,
  op4: IterableOperator<T4, T5>,
  op5: IterableOperator<T5, T6>,
  op6: IterableOperator<T6, T7>,
): Iterable<T7>;

export function pipe<T1, T2, T3, T4, T5, T6, T7, T8>(
  iter: Iterable<T1>,
  op1: IterableOperator<T1, T2>,
  op2: IterableOperator<T2, T3>,
  op3: IterableOperator<T3, T4>,
  op4: IterableOperator<T4, T5>,
  op5: IterableOperator<T5, T6>,
  op6: IterableOperator<T6, T7>,
  op7: IterableOperator<T7, T8>,
): Iterable<T8>;

export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  iter: Iterable<T1>,
  op1: IterableOperator<T1, T2>,
  op2: IterableOperator<T2, T3>,
  op3: IterableOperator<T3, T4>,
  op4: IterableOperator<T4, T5>,
  op5: IterableOperator<T5, T6>,
  op6: IterableOperator<T6, T7>,
  op7: IterableOperator<T7, T8>,
  op8: IterableOperator<T8, T9>,
): Iterable<T9>;

export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  iter: Iterable<T1>,
  op1: IterableOperator<T1, T2>,
  op2: IterableOperator<T2, T3>,
  op3: IterableOperator<T3, T4>,
  op4: IterableOperator<T4, T5>,
  op5: IterableOperator<T5, T6>,
  op6: IterableOperator<T6, T7>,
  op7: IterableOperator<T7, T8>,
  op8: IterableOperator<T8, T9>,
  op9: IterableOperator<T9, T10>,
): Iterable<T10>;

export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
  iter: Iterable<T1>,
  op1: IterableOperator<T1, T2>,
  op2: IterableOperator<T2, T3>,
  op3: IterableOperator<T3, T4>,
  op4: IterableOperator<T4, T5>,
  op5: IterableOperator<T5, T6>,
  op6: IterableOperator<T6, T7>,
  op7: IterableOperator<T7, T8>,
  op8: IterableOperator<T8, T9>,
  op9: IterableOperator<T9, T10>,
  op10: IterableOperator<T10, T11>,
): Iterable<T11>;

/**
 * Applies a series of operators to an iterable.
 *
 * @param iter The input iterable.
 * @param operators The operators to apply to the iterable.
 * @returns An iterable with the operators applied.
 * @example
 * const input = [1, 2, 3, 4, 5];
 * const result = pipe(
 *  input,
 *  map((x) => x + 1),
 *  filter((x) => x % 2 === 0),
 * )
 * console.log([...result]); // [2, 4, 6]
 */
export function pipe(iter: Iterable<unknown>, ...operators: IterableOperator<unknown, unknown>[]): Iterable<unknown> {
  return operators.reduce((acc, op) => op(acc), iter);
}
