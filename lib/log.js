/*
统计提交信息，merge不计入内
*/

const exec = require('child_process').exec;

function analysis(logContent) {
    const lines = logContent.split('\n');
    let result = {
        commits: [],
        changeFileNums: 0,
        changeLineNums: 0
    };
    let curCommit;
    let nullLine = 0;
    let giveUp = false;
    lines.forEach(line => {
        if (line.indexOf('commit') === 0) {
            if (curCommit && !giveUp) {
                result.commits.push(curCommit);
            }
            curCommit = makeCommit();
            curCommit.hash = line.replace('commit ', '');
        } else if (line.indexOf('Author') === 0) {
            curCommit.author = line.replace('Author: ', '');
        } else if (line.indexOf('Date') === 0) {
            curCommit.date = new Date(line.replace(/Date:\s+/, '')).toLocaleDateString();
        } else if (!line) {
            nullLine = nullLine + 1;
        } else if (/\s*[0-9]*\s*files? changed/.test(line)) {
            let fileNums = Number(line.match(/([0-9]*) files? changed/)[1]),
                insertion = Number(line.match(/([0-9]*) insertion/)),
                insNum = insertion ? Number(insertion[1]) : 0,
                deletion = line.match(/([0-9]*) deletion/),
                delNum = deletion ? Number(deletion[1]) : 0;
            result.changeLineNums += delNum + insNum;
            result.changeFileNums += fileNums;
            curCommit.filesNum = fileNums;
        } else if (nullLine === 1) {
            // message
            curCommit.message = line.trim();
            giveUp = curCommit.message.indexOf('build') !== -1;
        } else {
            // 另外一种是文件修改详情
            let file = line.split('|')[0].trim();
            curCommit.files.push(file);
        }
    });

    function makeCommit() {
        nullLine = 0;
        giveUp = false;
        return {
            hash: '',
            author: '',
            date: '',
            filesNum: 0,
            files: []
        };
    }
    return result;
}

function stats(options) {
    /*
        author,wangqun6
        after,2017-12-03
        before,2017-12-31
    */
    let t0 = Date.now();
    let cmd = 'git log  --no-merges';
    let size = 1024;
    for (let key in options.args) {
        if (options.args.hasOwnProperty(key)) {
            cmd = cmd + ' --' + key + '=' + options.args[key];
        }
    }
    cmd += ' --stat';
    return new Promise((resolve, reject) => {
        exec(cmd, {
            maxBuffer: size * size * size,
            cwd: options.cwd, // 'C:/Users/wangqun6/Downloads/TEST',
            encoding: 'utf-8'
        }, (err, stdout) => {
            err ? reject(err) : resolve({
                raw: stdout,
                obj: analysis(stdout),
                spend: (Date.now() - t0) / 1000
            });
        });
    });
}

module.exports = {
    stats: stats
};