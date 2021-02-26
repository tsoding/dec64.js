const fs = require('fs');
const exec = require('child_process').exec;

exec('wat2wasm dec64.wat', (error, stdout, stderr) => {
    if (error) {
        console.error(`Oopsie-Doopsie: ${error}`);
    }
    console.log(stdout);
    console.error(stderr);
});

const MEM_INITIAL = 10;
const MEM_MAXIMUM = 100;

const mem = new WebAssembly.Memory({initial:MEM_INITIAL, maximum:MEM_MAXIMUM});
const bytes = fs.readFileSync('dec64.wasm');
const mod = new WebAssembly.Module(bytes);
const wasm = new WebAssembly.Instance(mod, {
    imports: {
        mem: mem
    }
});

let wasmByteArray = '';
for (let x of bytes) {
    wasmByteArray += `${x},`;
}

const implemented = ['pack', 'unpackExp', 'unpackCoeff'];
const noExports = ['toString', 'fromString'];

let jsExports = '';
for (let key of Object.keys(wasm.exports)) {
    if (!noExports.includes(key)) {
        if (implemented.includes(key)) {
            jsExports += `exports.${key} = wasm.exports.${key};\n`;
        } else {
            jsExports += `exports.${key} = () => { throw '${key}: not implemented'; };\n`;
        }
    }
}

fs.writeFileSync("dec64.js", `
const mem = new WebAssembly.Memory({initial:${MEM_INITIAL}, maximum:${MEM_MAXIMUM}});
const bytes = new Uint8Array([${wasmByteArray}]);
const mod = new WebAssembly.Module(bytes);
const wasm = new WebAssembly.Instance(mod, {
    imports: {
        mem: mem
    }
});

${jsExports}

exports.toString = () => {
    throw 'toString: not implemented';
};

exports.fromString = () => {
    throw 'fromString: not implemented';
};

exports.unpack = (x) => [
    wasm.exports.unpackCoeff(x),
    wasm.exports.unpackExp(x)
];
`);
