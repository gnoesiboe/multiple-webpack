const path = require('path');
const webpack = require('webpack');
const { workerData } = require('worker_threads');

const config = require(path.resolve(workerData, 'webpack.config.js'));

console.log('test');

process.env.UV_THREADPOOL_SIZE = 20;

module.exports = new Promise((resolve, reject) => {
    webpack(Object.assign({
        context: workerData
    }, config), (error, stats) => {
        console.log(error);
        console.log('webpack callback');
        console.log(stats.toString());
        resolve();
    });
});
