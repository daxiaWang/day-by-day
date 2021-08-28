/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
        const index = v.indexOf('=')
        if (index !== -1) {
            const name = v.substring(0, index)
            const val = v.substring(index + 1, v.length)
            obj[name] = val
        }
    })
    return obj
}


function randomNum(chars = [0, 1], n = 1) {
    var res = [];
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * chars.length - 1);
        // console.log("Math.ceil(Math.random() * chars.length)", Math.ceil(Math.random() * chars.length))
        res.push(chars[id]);
    }
    return res.join(",");
}

module.exports = {
    param2Obj,
    randomNum
}