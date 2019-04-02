const path = require('path');
const util = require('util');
const glob = util.promisify(require('glob'));
const { Worker } = require('worker_threads');

(async () => {
    const configs = await glob(path.resolve(__dirname, '../web/assets/*/webpack.config.js'));

    const runSerial = async (id) => {
        return await require(path.resolve(__dirname, `serial/${id}.js`));
    };

    const runParallel = async (id) => {
        // TODO: REMOVE SLICE
        return Promise.all(configs.slice(0, 1).map((config) => new Promise((resolve, reject) => {
            console.log(config);
            const worker = new Worker(path.resolve(__dirname, `parallel/${id}.js`), {
                workerData: path.dirname(config)
            });

            worker.on('exit', (code) => {
                if ( !code ) {
                    return resolve();
                }

                reject(code);
            });

            worker.on('exit', (a) => {
                console.log(a);
            });
        })));
    };

    // await runSerial('rebuild-node-sass');
    // await runParallel('npm-install');
    await runParallel('webpack');
})();
