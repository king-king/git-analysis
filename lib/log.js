/*
统计提交信息，merge不计入内
*/

const exec = require('child_process').execSync;

function stats(options) {
    /*
        author,wangqun6
        after,2017-12-03
        before,2017-12-31
    */
    let cmd = 'git log  --no-merges --stat';
    options.args.forEach((arg) => {
        cmd = cmd + ' --' + arg[0] + '=' + arg[1];
    });
    return new Promise((resolve, reject) => {
        exec(cmd, {
            cwd: options.cwd, // 'C:/Users/wangqun6/Downloads/TEST',
            encoding: 'utf-8'
        }, (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
}

module.exports = {
    stats: stats
};