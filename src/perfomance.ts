import { getHeapStatistics } from 'v8';

import { map } from './map';
import { pipe } from './pipe';
import { filter } from './filter';

const ARRAY_LENGTH = 10;
const ARRAY_DATA = Array.from({ length: ARRAY_LENGTH }, (_, i) => i);

function test(data: Iterable<number>) {
  global.gc?.();

  performance.clearMarks();
  performance.clearMeasures();

  performance.mark('start');
  const copy = [...data];
  console.log(copy.length);
  performance.mark('end');

  const defaultMeasures = performance.measure('map', 'start', 'end');
  console.log(defaultMeasures.duration);

  console.log(`${getHeapStatistics().used_heap_size / 1024 / 1024} MB used`);
}

console.log('Testing array performance');

test(
  pipe(
    ARRAY_DATA,
    map((x) => x ** x),
    filter((x) => x % 2 === 0),
  ),
);

test(ARRAY_DATA.map((x) => x ** x).filter((x) => x % 2 === 0));

console.log('Testing generator performance');

const count = function* () {
  let i = 0;
  while (i < ARRAY_LENGTH) {
    yield i++;
  }
};

test(
  pipe(
    count(),
    map((x) => x ** x),
    filter((x) => x % 2 === 0),
  ),
);

test([...count()].map((x) => x ** x).filter((x) => x % 2 === 0));
