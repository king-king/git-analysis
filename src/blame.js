const fs = require('fs');
const exec = require('child_process').exec;
const config = require('./config/blame');

let path = config.path;
let cmd = 'git blame ' + path;
exec(cmd, {
    cwd: config.cwd,
    encoding: 'utf-8'
}, (err, stdout) => {
    if (err) {
        console.log(err);
    } else {
        fs.writeFileSync('./out/blame.log', stdout, 'utf-8');
        console.log('finish');
    }
});