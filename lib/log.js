/*
统计提交信息，merge不计入内
*/

const exec = require('child_process').exec;

function stats(options) {
    /*
        author,wangqun6
        after,2017-12-03
        before,2017-12-31
    */
    let cmd = 'git log  --no-merges';
    for (let key in options.args) {
        if (options.args.hasOwnProperty(key)) {
            cmd = cmd + ' --' + key + '=' + options.args[key];
        }
    }
    cmd += ' --stat';
    return new Promise((resolve, reject) => {
        exec(cmd, {
            cwd: options.cwd, // 'C:/Users/wangqun6/Downloads/TEST',
            encoding: 'utf-8'
        }, (err, stdout) => {
            err ? reject(err) : resolve(stdout);
        });
    });
}

module.exports = {
    stats: stats
};