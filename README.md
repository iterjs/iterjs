# yield it

This library is a powerful tool for working with iterables in a functional and efficient way. It offers several advantages over native array methods.

Pros:

- **Functional**: The library provides a functional programming style, allowing you to easily compose and transform iterables.
- **Tree shakable**: The library supports tree shaking, which means that only the necessary parts of the library are included in the final bundle, reducing the overall file size.
- **Supports native iterables**: It seamlessly integrates with native JavaScript iterables, allowing you to use the library with any iterable object.
- **Supports infinite iterables**: Unlike native array methods, this library can handle infinite iterables, making it suitable for working with streams or other infinite data sources.

Cons:

- **Extremely slow compared to optimized native array methods**: While this library offers powerful functionality, it may have slower performance compared to native array methods. DO NOT USE this library in performance-critical scenarios.

## Installation

```
yarn add @yieldit/yieldit
```

## Usage

### Documentation

Read [documentation](https://yieldit.github.io/yieldit/).

### Simple arrays

It's better to use native array methods instead in performance-critical scenarios.

```ts
import { pipe, map, filter } from '@yieldit/yieldit';

const input = [1, 2, 3, 4, 5];
const result = pipe(
  input,
  filter((value: number) => value % 2 === 0),
  map((value: number) => value * 2),
);
console.log([...result]); // [4, 8]
```

### Infinite iterables

This library is the perfect solution for infinite iterables.

```ts
import { pipe, map } from '@yieldit/yieldit';

const count = function* () {
  let i = 0;
  while (true) {
    yield i++;
  }
};
const input = count();
const result = pipe(
  input,
  takeWhile((value: number) => value < 4),
  map((value: number) => value * 2),
);
console.log([...result]); // [0, 2, 4, 6]
```

## Development

- Install required extensions

- Install nvm and use node-18

- Install dependencies

```
yarn install
```

- For safety reason VSCode requires you to explicitly activate the custom TS settings. It will ask you. If not try to:

  - Press ctrl+shift+p in a TypeScript file
  - Choose "Select TypeScript Version"
  - Pick "Use Workspace Version"

- Try to reconfigure workspace if something is wrong

```
yarn dlx @yarnpkg/sdks vscode
```
