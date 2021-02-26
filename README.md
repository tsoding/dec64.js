# [DEC64](https://www.crockford.com/dec64.html) in WebAssembly for JavaScript

DEC64: Decimal Floating Point Format implementation in WebAssembly for JavaScript

## Quick Start

Install [WABT](https://github.com/WebAssembly/wabt) first and make sure `wat2wasm` is available in `PATH` environment variable.

```console
$ node build.js
$ node  --experimental-wasm-bigint
> const dec64 = require('./dec64.js')
> dec64.add(10n, 20n)
```
