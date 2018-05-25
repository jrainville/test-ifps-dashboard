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
  }

  killItWithFire() {
    console.dir(this.process);
    this.process.send("exit");
    //this.process.send("test");
    //this.process.disconnect();
  }

}

module.exports = StorageProcessesLauncher;
