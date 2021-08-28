export const STATEARR = {
  0: {
    zh: '待审批',
    color: '#9199A3'
  },
  1: {
    zh: '审批中',
    color: '#FF962E'
  },
  '已缴费': {
    zh: '已缴纳',
    color: '#00D19D'
  },
  '未缴费': {
    zh: '未通过',
    color: '#FF4E53'
  }
}
export const STATECOLOR = {

  1: {
    zh: '已缴',
    zhcolor: '#464C54',
    color: '#00D19D'
  },
  0: {
    zh: '未缴',
    zhcolor: '#FF4E53',
    color: '#FF4E53'
  }
}

export const BUSINFORLIST = [{
  title: '乘车权限',
  ename: 'isTemp',
  list: [{
    id: 2,
    name: '全部',
    check: true
  },
  {
    id: 0,
    name: '长期权限'
  },
  {
    id: 1,
    name: '临时权限'
  }
  ]
},
{
  title: '乘车人',
  ename: 'isThird',
  list: [{
    id: 2,
    name: '全部',
    check: true
  },
  {
    id: 0,
    name: '只看自己'
  },
  {
    id: 1,
    name: '只看他人'
  }
  ]
},
{
  title: '支持票种',
  ename: 'isSpecial',
  list: [{
    id: 2,
    name: '全部',
    check: true
  },
  {
    id: 0,
    name: '一票制'
  },
  {
    id: 1,
    name: '定期票'
  }
  ]
}
]
