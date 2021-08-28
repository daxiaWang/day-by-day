export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
export const getObjType = obj => {
  var toString = Object.prototype.toString
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
/**
     *判断是否为json对象
     */

export const isJson = str => {
  if (Array.isArray(str)) {
    if (str[0] instanceof Object) {
      return true
    } else {
      return false
    }
  } else if (str instanceof Object) {
    return true
  }
  return false
}
/**
     * 对象深拷贝
     */
export const deepClone = data => {
  var type = getObjType(data)
  var obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      data[i] = (() => {
        if (data[i] === 0) {
          return data[i]
        }
        return data[i]
      })()
      delete data[i].$parent
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      delete data.$parent
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

export const computeColor = data => {
  let color = ''
  switch (data) {
    case '0':
      color = '#F76A00'
      break
    case '1':
      color = '#3296FA'
      break
    case '2':
      color = '#728FF0'
      break
    case '99':
      color = '#00B77A'
      break
    case '-1':
      color = '#BABABA'
      break
    default:
      break
  }
  return color
}
export const computeText = data => {
  let text = ''
  switch (data) {
    case '0':
      text = '待接单'
      break
    case '1':
      text = '待发车'
      break
    case '2':
      text = '已发车'
      break
    case '99':
      text = '已结束'
      break
    case '-1':
      text = '已取消'
      break
    default:
      break
  }
  return text
}
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * @description [throttle 节流函数]
 * @author shanshuizinong
 * @param {Function} fn 延时调用函数
 * @param {Number} delay 延迟多长时间
 * @param {Number} atleast 至少多长时间触发一次
 * @return {Function} 延迟执行的方法
 */
export function throttle(fn, delay, atleast) {
  let timer = null
  let previous = null
  return function() {
    const now = +new Date()
    if (!previous) previous = now
    if (atleast && now - previous > atleast) {
      fn()
      previous = now
      clearTimeout(timer)
    } else {
      clearTimeout(timer)
      timer = setTimeout(function() {
        fn()
        previous = null
      }, delay)
    }
  }
}

export function initMonthDate(params = {}) {
  const { value, str = '-', type = 'month' } = params
  const today = value ? new Date(value) : new Date()
  const year = today.getFullYear()
  let month = today.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let date = today.getDate()
  date = date < 10 ? '0' + date : date
  const monthDateStr = `${year}${str}${month}`
  const dateStr = `${year}${str}${month}${str}${date}`
  return type === 'month' ? monthDateStr : dateStr
}

export function set_content_security_policy() {
  console.log('window.location.protocol', window.location.protocol)
  if (window.location.protocol == 'http:') return

  var metas = document.getElementsByTagName('meta')
  var has_set = false
  for (var i = 0; i < metas.length; i++) {
    if (metas[i].getAttributeNode('http-equiv') != null &&
            metas[i].getAttributeNode('http-equiv').value == 'Content-Security-Policy' &&
            metas[i].getAttributeNode('content') != null &&
            metas[i].getAttributeNode('content').value == 'upgrade-insecure-requests'
    ) {
      has_set = true
      break
    }
  }
  if (!has_set) {
    var meta_new = document.createElement('META')
    var http_equiv = document.createAttribute('http-equiv')
    var content = document.createAttribute('content')
    http_equiv.value = 'Content-Security-Policy'
    content.value = 'upgrade-insecure-requests'
    meta_new.setAttributeNode(http_equiv)
    meta_new.setAttributeNode(content)
    document.getElementsByTagName('head')[0].appendChild(meta_new)
  }
}
