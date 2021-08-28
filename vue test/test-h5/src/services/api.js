import request from './request'
import store from '@/store'
// const APIURL = '/shuttle_internal/common/call.do'
const APIURL = 'gateway/campus/cam_iface/invokFrontMethodForSys.action'
const APIURLNOTOKEN = '/gateway/notoken/campus/cam_iface/invokFrontMethodForSys.action'

export function login(data) {
  // 登录
  return request({
    url: '/h5/login',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json',
      loadingText: encodeURI('校验中')
    }
  })
}
console.log('BASEINFO this.$store ', store.getters.userInfo)
const BASEINFO = {
  // username: 'ZX001',
  // dpcode: store.getters.userInfo && store.getters.userInfo.dpcode
}
export function getDromInfo(data = {}) {
  const paramsObj = {
    method: 'getDromInfo',
    request_data: Object.assign(data)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getBillList
export function getBillList(data = {}) {
  const paramsObj = {
    method: 'getBillList',
    request_data: Object.assign(data, BASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getRoomAndBillInfo
export function getRoomAndBillInfo(data = {}) {
  const paramsObj = {
    method: 'getRoomAndBillInfo',
    request_data: Object.assign(data, BASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getUserInfo 获取姓名和电话
export function getUserInfo(data = {}) {
  const paramsObj = {
    method: 'getUserInfo',
    request_data: Object.assign(data, BASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// putWithdrawalApplication
export function putWithdrawalApplication(data = {}) {
  const paramsObj = {
    method: 'putWithdrawalApplication',
    request_data: Object.assign(data, BASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('提交中')
    }
  })
}
// putWithdrawalApplication 进度
export function getWithdrawalApplicationList(data = {}) {
  const paramsObj = {
    method: 'getWithdrawalApplicationList',
    request_data: Object.assign(data, BASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getApproveHistory   进度详情
export function getApproveHistory(data = {}) {
  const paramsObj = {
    method: 'getApproveHistory',
    request_data: Object.assign(data, BASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
const SGBASEINFO = {
  // username: '000029S1',
  // username: '160836',
  // dpcode: store.getters.userInfo && store.getters.userInfo.dpcode
}
// 宿管
// getMenu
export function getMenu(data = {}) {
  const paramsObj = {
    method: 'getMenu',
    request_data: Object.assign(data, {
      username: '000029S1',
      dpcode: store.getters.userInfo && store.getters.userInfo.dpcode
    })
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getCampus  厂区 1
export function getCampus(data = {}) {
  const paramsObj = {
    method: 'getCampus',
    request_data: Object.assign(data, {
      username: '000029S1',
      dpcode: store.getters.userInfo && store.getters.userInfo.dpcode
    })
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getPark  园区 2
export function getPark(data = {}) {
  const paramsObj = {
    method: 'getPark',
    request_data: Object.assign(data, SGBASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getBuild  楼宇 3
export function getBuild(data = {}) {
  const paramsObj = {
    method: 'getBuild',
    request_data: Object.assign(data, SGBASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getUnit  单元 4
export function getUnit(data = {}) {
  const paramsObj = {
    method: 'getUnit',
    request_data: Object.assign(data, SGBASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getBuildInfo 楼栋入住详细信息
export function getBuildInfo(data = {}) {
  const paramsObj = {
    method: 'getBuildInfo',
    request_data: Object.assign(data, SGBASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getRoomInfo 房间入住详细信息
export function getRoomInfo(data = {}) {
  const paramsObj = {
    method: 'getRoomInfo',
    request_data: Object.assign(data, SGBASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getBedInfo 床位入住详细信息
export function getBedInfo(data = {}) {
  const paramsObj = {
    method: 'getBedInfo',
    request_data: Object.assign(data, SGBASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getLevels 楼层详细信息
export function getLevels(data = {}) {
  const paramsObj = {
    method: 'getLevels',
    request_data: Object.assign(data, SGBASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}
// getFloorRoomInfo 楼层房间详细信息
export function getFloorRoomInfo(data = {}) {
  const paramsObj = {
    method: 'getFloorRoomInfo',
    request_data: Object.assign(data, SGBASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}

// getAgent 退宿申请审批查询(宿管端)
export function getAgent(data = {}) {
  const paramsObj = {
    method: 'getAgent',
    request_data: Object.assign(data, SGBASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}

// getWithdrawalApplicationInfo 退宿申请审批查询详情(宿管端)
export function getWithdrawalApplicationInfo(data = {}) {
  const paramsObj = {
    method: 'getWithdrawalApplicationInfo',
    request_data: Object.assign(data, SGBASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('查询中')
    }
  })
}

// putApprove 退宿申请审批(宿管端)
export function putApprove(data = {}) {
  const paramsObj = {
    method: 'putApprove',
    request_data: Object.assign(data, SGBASEINFO)
  }
  return request({
    url: APIURL,
    method: 'post',
    data: paramsObj,
    headers: {
      loadingText: encodeURI('提交中')
    }
  })
}
