const child_process = require('child_process');
const path = require('path');

class StorageProcessesLauncher {
  constructor() {
    this.process = null;
  }

  launchProcess(callback) {
    const self = this;

    this.process = child_process.fork(path.join(__dirname, '/run.js'));
  }

  killItWithFire() {
    console.dir('Killing the process');
    this.process.send("exit");
    //this.process.send("test");
    //this.process.disconnect();
  }

}

module.exports = StorageProcessesLauncher;
