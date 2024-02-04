import { getHeapStatistics } from 'v8';

import { filter } from './filter';
import { map } from './map';
import { pipe } from './pipe';

const data = Array.from({ length: 1000000 }, (_, i) => `${i}`);

function test(data: Iterable<string>) {
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

test(
  pipe(
    data,
    map((x) => x.toUpperCase()),
    filter((x) => x.length > 10),
  ),
);

test(data.map((x) => x.toUpperCase()).filter((x) => x.length > 10));
