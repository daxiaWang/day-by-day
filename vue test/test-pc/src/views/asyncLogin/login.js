export default {
  data() {
    return {
      userInfo: { name: 1 },
      code: 1,
      error_msg: '',
      oToken: ''
    }
  },
  computed: {
  },

  created() {
    // this.checkCode()
  },
  methods: {
    checkCode() {
      const userInfo = sessionStorage.getItem('userInfo')
      return new Promise((resolve, reject) => {
        if (userInfo) {
          console.log('userinfo', 'tokentokentokentoken111')
          sessionStorage.setItem('token', 'tokentokentokentoken111')
          resolve()
        } else {
          if (this.code) {
            const params = {
              code: this.code,
              flag: 'wmqy_dc_order'
            }
            console.log('!userInfo', 'tokentokentokentoken111')
            sessionStorage.setItem('token', 'tokentokentokentoken222')
            resolve()
          } else {
            reject()
          }
        }
      })
    },
    GetUserLogin() {
      console.log('GetUserLogin methods')
      return new Promise((resolve, reject) => {
        const params = {
          ...this.userInfo,
          zoneid: 1,
          customerCode: '10001504' // customer_code
        }
        const paramsObj = {
          method: 'h5UserLogin',
          param: params,
          command: 'food_order'
        }
        if (paramsObj) {
          const data = {
            code: 1,
            orderToken: 'orderTokenorderTokenorderToken1111'
          }
          sessionStorage.setItem('orderToken', data.orderToken)
          resolve(data)
        }
      })
    }
  }
}
