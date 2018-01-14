/*eslint no-console: ["error", { allow: ["log"] }] */

const stats = require('../lib/log').stats;
const fs = require('fs');

stats({
    cwd: 'C:/Users/wangqun6/Downloads/TEST',
    args: {
        author: 'wangqun6',
        after: '2017-11-01',
        before: '2017-12-31'
    }
}).then((content) => {
    // 成功
    fs.writeFileSync('./out.json', JSON.stringify(content.obj, null, 4), 'utf-8');
    fs.writeFileSync('./out.txt', content.raw, 'utf-8');
}, (err) => {
    // 失败
    console.log(err);
});