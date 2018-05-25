const shelljs = require('shelljs');

//let child = shelljs.exec('ipfs daemon', {silent: false}, (err, stdout, _stderr) => {
let child = shelljs.exec('ipfs daemon', {silent: true, async: true}, (err, stdout, _stderr) => {
  //console.dir("error");
  //console.dir(err);
  //console.dir("stdout");
  //console.dir(stdout);
});

child.stderr.on('data', (d) => {
  console.dir("stderr");
  console.dir(d);
});

child.stdout.on('data', (d) => {
  console.dir("stdout");
  console.dir(d);
});

console.dir('-------------');

process.on('message', function (msg) {
  console.dir("========> message " + msg);
  if (msg === 'exit') {
    child.kill();
    process.exit(0);
  }
});

process.on('exit', function () {
  //child.kill();
  process.exit(0);
});

