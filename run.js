const child_process = require('child_process');

//let child = shelljs.exec('ipfs daemon', {silent: false}, (err, stdout, _stderr) => {
let child = child_process.spawn('ipfs', ['daemon']);

child.stderr.on('data', (d) => {
  console.log("stderr", d.toString());
});

child.stdout.on('data', (d) => {
  console.log("stdout", d.toString());
});

child.on('exit', (code) => {
  if (code) {
    console.error('IPFS exited with error code ' + code);
  }
});

process.on('message', function (msg) {
  console.dir("========> message " + msg);
  if (msg === 'exit') {
    console.log('YOU KILLED MY CHILD');
    child.kill();
    process.exit(0);
  }
});

process.on('exit', function () {
  //child.kill();
  process.exit(0);
});

