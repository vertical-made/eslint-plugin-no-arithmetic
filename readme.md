# eslint-plugin-no-arithmetic

ESLint plugin containing a rule for detecting arithmetic in JavaScript source. Floating-point math can lead to imprecise results, so this plugin directs users to float-safe alternative helper methods.

## Configuration

Add the following to your `eslint` config:

```js
{
  //...
  plugins: [
    // ...
    "@vertical-made/no-arithmetic",
    // ...
  ],
  rules: {
    "@vertical-made/no-arithmetic/no-arithmetic": "error",
    // ...
  }
}
```

Or with a custom alternative suggestion:

```js
{
  //...
  plugins: [
    // ...
    "@vertical-made/no-arithmetic",
    // ...
  ],
  rules: {
    "@vertical-made/no-arithmetic/no-arithmetic": [
      "error",
      { message: "use the `floatSafe*` helpers in myUtils.js" }
    // ...
  }
}
```

## Options

### `message`

Sets the hint message.

> type: `string`

> default: `"use float-safe alternatives"`

### `ignoreIteratorLike`

When enabled, does _not_ error on operations that look like an increment / decrement, which just checks if the right-hand value of a binary operation is the literal value `1`.

> type: boolean

> default: `true`
