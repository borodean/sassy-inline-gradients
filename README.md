# sassy-inline-gradients

Sass extension to inline gradients as base64-encoded images.

## Installation

```
npm install sass sassy-inline-gradients --save-dev
```

```diff
+ const createInlineGradientsFunctions = require("sassy-inline-gradients");

const sassOptions = {
  functions: {
+    ...createInlineGradientsFunctions(),
  },
  indentWidth: 2,
};
```

## Usage

Code examples:

```scss
.alfa {
  background: inline-linear-gradient(
    200px,
    45deg,
    red,
    green 100px,
    blue 150px,
    yellow 95%
  );
}
```

```scss
.bravo {
  background: inline-linear-gradient(
    200px,
    to top,
    red 10.5%,
    green 33.3%,
    blue
  );
}
```
