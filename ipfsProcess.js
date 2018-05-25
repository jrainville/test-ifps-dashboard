// const fs = require('../../core/fs');
// const utils = require('../../utils/utils');
// const ProcessLauncher = require('../../process/processLauncher');
const child_process = require('child_process');
const path = require('path');

class StorageProcessesLauncher {
  constructor() {
    this.process = null;
  }

  launchProcess(callback) {
    const self = this;

    this.process = require('child_process').fork(path.join(__dirname, '/run.js'));
    console.dir(this.process);
    //this.process = child_process.exec('ipfs daemon', {silent: true}, (err, _stdout, _stderr) => {
    //  if (err) {
    //    console.error(err);
    //  }
    //});
    //this.process.stdout.on('data', (data) => {
    //  if (!self.readyCalled && data.indexOf('Daemon is ready') > -1) {
    //    self.readyCalled = true;
    //    console.log(`IPFS process started`);
    //    callback();
    //  }
    //  // console.log('IPFS: ' + data);
    //});
    //this.process.stderr.on('data', (data) => {
    //  if (!self.readyCalled && data.indexOf('Daemon is ready') > -1) {
    //    self.readyCalled = true;
    //    console.log(`IPFS process started`);
    //    callback();
    //  }
    //  // console.log('IPFS stderr: ' + data);
    //});
    //this.process.on('exit', (code) => {
    //  if (code) {
    //    console.error('IPFS exited with error code ' + code);
    //  }
    //});

    //process.on('exit', () => {
    //  console.log('we dead');
    //  //this.process.kill();
    //});
  }

  killItWithFire() {
    console.dir(this.process);
    this.process.send("test");
    //this.process.send("test");
    //this.process.disconnect();
  }

}

module.exports = StorageProcessesLauncher;
