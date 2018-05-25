const shelljs = require('shelljs');

let child = shelljs.exec('ipfs daemon', {silent: true}, (err, stdout, _stderr) => {
});

console.dir('-------------');

process.on('message', function () {
  console.dir("========> message ");
  child.kill();
  process.exit(0);
});

process.on('exit', function () {
  process.exit(0);
});

