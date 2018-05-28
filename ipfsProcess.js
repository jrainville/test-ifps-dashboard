
const child_process = require('child_process');

class StorageProcessesLauncher {
  constructor() {
    this.process = null;
  }

  launchProcess(callback) {
    const self = this;

    this.process = child_process.spawn('ipfs', ['daemon']);
    this.process.stdout.on('data', (data) => {
      if (!self.readyCalled && data.indexOf('Daemon is ready') > -1) {
        self.readyCalled = true;
        console.log(`IPFS process started`);
        callback();
      }
      // console.log('IPFS: ' + data);
    });
    this.process.stderr.on('data', (data) => {
      if (!self.readyCalled && data.indexOf('Daemon is ready') > -1) {
        self.readyCalled = true;
        console.log(`IPFS process started`);
        callback();
      }
      // console.log('IPFS stderr: ' + data);
    });
    this.process.on('exit', (code) => {
      if (code) {
        console.error('IPFS exited with error code ' + code);
      }
    });

    process.on('exit', () => {
      console.log('we dead');
      //this.process.kill();
    });
  }
}

const paapte = new StorageProcessesLauncher();
paapte.launchProcess(() => {
  console.log('blargh');

  setTimeout(()=> {
    console.log('BYEBYE');
    process.exit();
  }, 3000);
});

//module.exports = StorageProcessesLauncher;
