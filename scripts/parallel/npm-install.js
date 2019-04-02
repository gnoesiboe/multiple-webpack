const { spawn } = require('child_process');
const { workerData } = require('worker_threads');

spawn('npm', ['install'], {
    cwd: workerData,
    stdio: 'inherit'
});
