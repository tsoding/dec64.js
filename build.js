const fs = require('fs');
const exec = require('child_process').exec;

exec('wat2wasm dec64.wat', (error, stdout, stderr) => {
    if (error) {
        console.error(`Oopsie-Doopsie: ${error}`);
    }
    console.log(stdout);
    console.error(stderr);
});

let result = '';
for (let x of fs.readFileSync('dec64.wasm')) {
    result += `${x},`;
}
fs.writeFileSync("dec64.js", `
const bytes = new Uint8Array([${result}]);
const mod = new WebAssembly.Module(bytes);
const wasm = new WebAssembly.Instance(mod, { imports: {}});

exports.add = wasm.exports.add;
`);
