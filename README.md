# yield it

This library is a powerful tool for working with iterables in a functional and efficient way. It offers several advantages over native array methods.

Pros:

- **Functional**: The library provides a functional programming style, allowing you to easily compose and transform iterables.
- **Tree shakable**: The library supports tree shaking, which means that only the necessary parts of the library are included in the final bundle, reducing the overall file size.
- **Supports native iterables**: It seamlessly integrates with native JavaScript iterables, allowing you to use the library with any iterable object.
- **Supports infinite iterables**: Unlike native array methods, this library can handle infinite iterables, making it suitable for working with streams or other infinite data sources.

Cons:

- **Extremely slow compared to optimized native array methods**: While this library offers powerful functionality, it may have slower performance compared to native array methods. It's important to consider the performance implications when using this library in performance-critical scenarios.

## Installation

```
yarn add @yieldit/yieldit
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
