import moment from 'moment'
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
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

export function momentDate(value, type = 'W') {
  return moment(value)
    .utcOffset(480)
    .format(type)
}

export function getBrowser() {
  var ua = window.navigator.userAgent
  var isIE = window.ActiveXObject || 'ActiveXObject' in window
  var isChrome = ua.indexOf('Chrome') && window.chrome

  if (isIE) {
    return 'IE'
  } else if (isChrome) {
    return 'Chrome'
  } else {
    return 'Unkown'
  }
}

export function throttle(fn, wait, options = {}) {
  let timer
  let previous = 0
  const throttled = function() {
    const now = +new Date()
    // remaining 不触发下一次函数的剩余时间
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous)
    if (remaining < 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      previous = now
      fn.apply(this, arguments)
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(() => {
        previous = options.leading === false ? 0 : new Date().getTime()
        timer = null
        fn.apply(this, arguments)
      }, remaining)
    }
  }
  return throttled
}
