const child_process = require('child_process');

class GethProcess {
  constructor() {
    this.process = null;
  }

  launchProcess(callback) {
    const self = this;

    const args = ['--networkid',1337,'--port',30303,'--rpc','--rpcport',8545,'--rpcaddr','localhost','--rpccorsdomain="auto"','--ws','--wsport',8546,'--wsaddr','localhost','--wsorigins','"auto"','--nodiscover','--maxpeers',0,'--mine','--shh','--rpcapi','"eth,web3,net,shh"','--wsapi','"eth,web3,net,shh"','--targetgaslimit',8000000,'--dev'];
    this.process = child_process.spawn('geth', ['--networkid=1337']);
    this.process.stdout.on('data', (data) => {
      if (!self.readyCalled && data.indexOf('Mapped network port') > -1) {
        self.readyCalled = true;
        console.log(`Geth process started`);
        callback();
      }
      // console.log('Geth: ' + data);
    });
    this.process.stderr.on('data', (data) => {
      if (!self.readyCalled && data.indexOf('Mapped network port') > -1) {
        self.readyCalled = true;
        console.log(`Geth process started`);
        callback();
      }
      console.log('Geth stderr: ' + data);
    });
    this.process.on('exit', (code) => {
      if (code) {
        console.error('Geth exited with error code ' + code);
      }
    });

    process.on('exit', () => {
      console.log('we dead');
      this.process.kill();
    });
  }
}

const paapte = new GethProcess();
paapte.launchProcess(() => {
  console.log('blargh');

  setTimeout(()=> {
    console.log('BYEBYE');
    // paapte.process.kill('SIGINT');
    process.exit();
  }, 3000);
});

//module.exports = StorageProcessesLauncher;
