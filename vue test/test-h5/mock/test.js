const { randomNum } = require('./utils')
module.exports = [{
    url: '/getGrantVehicleByUser',
    type: 'post',
    response: config => {
        let list = []
        const total = 18
        for (let i = 0; i < total; i++) {
            let obj = {
                id: i,
                sortId: i,
                outid: i,
                startName: randomNum(["开", "始", "起", "始", "地"], 3),
                endName: randomNum(["结", "束", "目", "的", "地"], 3),
                startTime: `2020-${randomNum([0, 1, 2])}${randomNum([4, 1, 2, 9])}-${randomNum([0, 1, 2])}${randomNum([0, 2, 5, 7])}`,
                endTime: `2021-${randomNum([ 1, 2])}${randomNum([4, 1, 2, 9])}-${randomNum([0, 1, 2])}${randomNum([0, 1, 2, 3])}`,
                sendTime: randomNum(["01:19", "19:45", "07:00", "09:00", "12:00", "16:00"], randomNum([1, 2, 5, 3, 4])),
                isSpecial: randomNum(),
                isTemp: randomNum(),
                isThird: randomNum(),
            }
            list.push(obj)
        }
        return {
            code: "200",
            msg: "",
            data: {
                page: 1,
                pageTotal: 2,
                total: total,
                record: list
            }
        }
    }
}, ]