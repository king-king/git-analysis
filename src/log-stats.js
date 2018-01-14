const stats = require('../lib/log').stats;
const fs = require('fs');

stats({
    cmd: 'C:/Users/wangqun6/Downloads/TEST',
    args: {
        author: 'wangqun6',
        after: '2017-12-03',
        before: '2017-12-31'
    }
}).then((content) => {
    // 成功
    fs.writeFileSync('./out.txt', content, 'utf-8');
}, (err) => {
    // 失败
    console.log(err);
});