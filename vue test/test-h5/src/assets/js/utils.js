/**
 * 获取url参数
 */
function getSearch() {
  let query = decodeURIComponent(window.location.search.substring(1))
  let attr = {}
  let match = {}
  let pl = /\+/g
  let search = /([^&=]+)=?([^&]*)/g

  let decode = function(s) {
    return decodeURIComponent(s.replace(pl, ' '))
  }
  while ((match = search.exec(query)) != null) {
    attr[decode(match[1])] = decode(match[2])
  }
  return attr
};

/**
 * 获取url中参数
 * @param {string} key
 */
export function search(key) {
  const attr = getSearch()
  if (!key) {
    return window.location.search.substring(1)
  }
  return attr[key]
};

//检验obj对象是否为空
export function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}
/**
 * 货币格式化
 */
export function _currency(value) {
  var f1 = value;
  var f2 = (Math.round((f1 - 0) * 100)) / 100;
  f2 = Math.floor(f2) == f2 ? f2 + ".00" : (Math.floor(f2 * 10) == f2 * 10) ? f2 + '0' : f2;
  f2 = String(f2);
  var r = /(\d+)(\d{3})/;
  var fs = String(f2);
  while (r.test(f2)) {
    f2 = f2.replace(r, '$1' + ',' + '$2');
  }
  return f2;
}

/**
 * 获取当前时间
 */
export function getCurrentDate() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var h = d.getHours();
  var mins = d.getMinutes();
  var s = d.getSeconds();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  if (h < 10) h = "0" + h;
  if (mins < 10) mins = "0" + mins;
  if (s < 10) s = "0" + s;
  var nowDate = year + "-" + month + "-" + day + " " + h + ":" + mins + ":" + s;
  return nowDate;
}