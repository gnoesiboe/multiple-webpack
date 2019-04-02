const { spawn } = require('child_process');
const { workerData } = require('worker_threads');

module.exports = new Promise((resolve, reject) => {
    const process = spawn('npm', ['rebuild', 'node-sass'], {
        cwd: workerData,
        stdio: 'inherit'
    });

    process.on('exit', (code) => {
        if ( !code ) {
            return resolve();
        }

        reject(code);
    })
});
