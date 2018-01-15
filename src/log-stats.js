/*eslint no-console: ["error", { allow: ["log"] }] */

const stats = require('../lib/log').stats;
const fs = require('fs');

stats({
    cwd: 'C:/Users/wangqun6/Downloads/TEST',
    args: {
        author: 'wangqun6',
        after: '2016-12-31',
        before: '2018-01-01'
    }
}).then((content) => {
    // 成功
    console.log('耗时 ' + content.spend + ' s');
    console.log('共有 ' + content.obj.commits.length + ' 次提交');
    console.log(`共修改${content.obj.changeFileNums}个文件`);
    console.log(`共修改${content.obj.changeLineNums}行`);

    fs.writeFileSync('./out.json', JSON.stringify(content.obj, null, 4), 'utf-8');
    fs.writeFileSync('./out.txt', content.raw, 'utf-8');
}, (err) => {
    // 失败
    console.log(err);
});