module.exports = [
  {
    url: '/getTripList',
    type: 'post',
    // Math.ceil(Math.random() * 10)
    response: config => {
      let list = []
      for (let i = 0; i < 8; i++) {
        let obj = {
          applyCode: 'bus983738272328329',
          sublineId: '1',
          sublineName: '一号线',
          applyUserCount: '15',
          lineType: '2',
          startStation: '郑州',
          endStation: '武汉',
          status: String(JSON.parse(config.body.param).status),
          vehicleProp: '大型车',
          propName: '大型车',
          vehicleModel: '大型车',
          driverName: '吴自豪',
          driverNo: '123445',
          driverTel: '1522511561',
          lineUserCount: '20',
          applyUser: '54321',
          applyUserName: '周接口',
          applyTime: '2020-09-23',
          applyUseTime: '2020-09-24'
        }
        obj.id = i
        list.push(obj)
      }
      return {
        code: 0,
        data: list
      }
    }
  },
  {
    url: '/vehicle/orderTransfer',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: {
          success: true
        }
      }
    }
  },
  {
    url: '/operBill',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: {
          success: true
        }
      }
    }
  }
]
