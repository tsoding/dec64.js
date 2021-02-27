const path = require('path');
const promisify = require('util').promisify; // NOTE: I still use node v13.5.0, sorry
const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const child_process = require('child_process');

const MEM_INITIAL = 10;
const MEM_MAXIMUM = 100;

function wat2wasm(inputFilePath) {
    return new Promise((resolve, reject) => {
        const outputFilePath = `${path.parse(inputFilePath).name}.wasm`;
        console.log(`INFO: ${inputFilePath} => ${outputFilePath}`);

        const child = child_process.spawn('wat2wasm', [inputFilePath, '-o', outputFilePath]);
        child.stdout.on('data', (data) => process.stdout.write(data));
        child.stderr.on('data', (data) => process.stderr.write(data));
        child.on('exit', (code, signal) => {
            if (signal !== null) {
                reject(`ERROR: wat2wasm was terminated by a signal ${signal}`);
            } else if (code !== 0) {
                reject(`ERROR: wat2wasm exited with ${code} exit code`);
            } else {
                resolve(outputFilePath);
            }
        });
    });
}

function renderBytes(bytes) {
    let result = '';
    for (let x of bytes) {
        result += `${x},`;
    }
    return `new Uint8Array([${result}])`;
}

function renderExports(wasm, implemented, noExports) {
    let result = '';
    for (let key of Object.keys(wasm.exports)) {
        if (!noExports.includes(key)) {
            if (implemented.includes(key)) {
                result += `exports.${key} = wasm.exports.${key};\n`;
            } else {
                result += `exports.${key} = () => { throw '${key}: not implemented'; };\n`;
            }
        }
    }
    return result;
}

async function wasm2js(inputFilePath) {
    const outputFilePath = `${path.parse(inputFilePath).name}.js`;
    console.log(`INFO: ${inputFilePath} => ${outputFilePath}`);

    const bytes = await readFile(inputFilePath);
    const mem = new WebAssembly.Memory({initial:MEM_INITIAL, maximum:MEM_MAXIMUM});
    const wasm = await WebAssembly.instantiate(bytes, {
        imports: {
            mem: mem
        }
    });

    const implemented = ['pack', 'unpackExp', 'unpackCoeff', 'fromI64'];
    const noExports = ['toString', 'fromString'];

    writeFile(outputFilePath, `const mem = new WebAssembly.Memory({initial:${MEM_INITIAL}, maximum:${MEM_MAXIMUM}});
const bytes = ${renderBytes(bytes)};
const mod = new WebAssembly.Module(bytes);
const wasm = new WebAssembly.Instance(mod, {
    imports: {
        mem: mem
    }
});

${renderExports(wasm.instance, implemented, noExports)}

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
`).then(() => outputFilePath);
}

async function build() {
    wasm2js(await wat2wasm("dec64.wat"));
}

build().catch(console.error);
