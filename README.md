# [DEC64](https://www.crockford.com/dec64.html) in WebAssembly for JavaScript

DEC64: Decimal Floating Point Format implementation in WebAssembly for JavaScript

## Quick Start

Install [WABT](https://github.com/WebAssembly/wabt) first and make sure `wat2wasm` is available in `PATH` environment variable.

```console
$ node build.js
$ node --experimental-wasm-bigint
> const dec64 = require('./dec64.js')
> dec64.unpack(dec64.pack(420n, 69n))
```

The `build.js` produces a self-contained JS module `dec64.js` that does not have any external dependencies and has the WebAssembly bytecode "baked in" as a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array), which means you can simply copy `dec64.js` to your project if you want to.
