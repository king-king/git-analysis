// /**
//  * options
//  * mode :year|month 目前只实现了year
//  * date:'2018-02-01';如果mode是year，只取2018，如果mode是month，只取02
//  * maxValue:number
//  * minValue:number
//  * colors:array
//  */
function grid(container, options) {
    // 计算一共有多少周
    const year = Number(options.date.split('-')[0]);
    const days = (util.time(year + 1, 0, 1) - util.time(year, 0, 1)) / (1000 * 60 * 60 * 24);
    const weeks = Math.ceil(days / 7);
    const w = 10;
    const padding = 2;
    const width = (w + padding) * weeks - padding;
    const height = (w + padding) * 7 - padding;
    const dy = 20;
    let canvas = document.createElement('canvas');
    let gc = canvas.getContext('2d');
    container.appendChild(canvas);
    canvas.width = width;
    canvas.height = height + dy;
    canvas.style.height = height + dy + 'px';
    canvas.style.width = width + 'px';
    /**options.data:
    {
        tag:{
            value:
        }
    }**/
    let drawData = {};
    const startDate = util.time(year, 0, 1);
    let tag;
    options.data.commits.forEach((item) => {
        let date = item.date;
        let step = (new Date(date) - startDate) / (1000 * 60 * 60 * 24);
        let weekIndex = step / 7 << 0;
        let day = (new Date(date).getDay() - 1 + 7) % 7;
        tag = weekIndex + '-' + day;
        if (!drawData[tag]) {
            drawData[tag] = {
                // 第几周
                date,
                value: 1,
                filesNum: item.filesNum,
                lineNum: item.lineNum
            };
        } else {
            drawData[tag].filesNum += item.filesNum;
            drawData[tag].lineNum += item.lineNum;
            drawData[tag].value++;
        }
    });
    let minValue = drawData[tag].value,
        maxValue = drawData[tag].value;
    util.loopObj(drawData, function (k, v) {
        minValue = minValue > v.value ? v.value : minValue;
        maxValue = maxValue > v.value ? maxValue : v.value;
    });

    util.loopObj(drawData, function (key, d) {
        // 按照是第几周第几日，直接在相应的位置绘制
        let weekIndex = key.split('-')[0];
        let dateIndex = key.split('-')[1];
        let index = (d.value - minValue) / (maxValue - minValue) * options.colors.length << 0;
        gc.fillStyle = options.colors[index];
        gc.fillRect((w + padding) * weekIndex, (w + padding) * dateIndex, w, w);
    });
}