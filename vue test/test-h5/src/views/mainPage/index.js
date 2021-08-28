import axios from 'axios'
import { getQueryString } from '@/utils/utils'
import { login, getDromInfo, getBillList } from '@/services/api'
export default {

  computed: {},
  created() {
    this.$nextTick(() => {
      this.checkCode()
    })
  },
  mounted() {
    // this.checkCode()
  },
  methods: {
    checkCode() {
      const userInfo = window.sessionStorage.getItem('userInfo')
      if (window.sessionStorage.getItem('userInfo') && JSON.stringify(userInfo) !== '{}') {
        this.userInfo = userInfo.userInfo
        // this.$store.commit('user/saveToken', JSON.parse(userInfo).token) // "outid":"410411202010084035","id":67
        this.$store.commit('user/saveUserInfo', JSON.parse(userInfo))
        this.getDromInfo()
      } else {
        const code = getQueryString('code')
        if (code) {
          const params = {
            code: code,
            flag: 'wmqy_bc_routine_car'
          }
          login(params).then((res) => {
            const { data } = res
            // this.$store.commit('user/saveToken', data.token) // "outid":"410411202010084035","id":67
            this.$store.commit('user/saveUserInfo', data)
            window.sessionStorage.setItem('userInfo', JSON.stringify(data))
            this.userInfo = data.userInfo
            // debugger
            this.$nextTick(() => {
              this.getDromInfo()
            })
          })
        } else {
          this.$toast.fail('code获取失败')
        }
      }
    },
    getDromInfo() {
      getDromInfo().then((res) => {
        console.log('getDromInfo res', res)
        const { body } = res
        if (body.code === 20000) {
          this.state = false
          this.userInfo = body.result
        } else {
          this.state = true
          this.$toast.fail(body.message)
        }
      })
    },

    retNnm(arr, num) {
      return arr.includes(num) ? 1 : 0
    },

    authFilter() {
      const actions = new Map([
        ['guest_1', () => { /* do sth*/ }],
        ['guest_2', () => { /* do sth*/ }],
        ['guest_3', () => { /* do sth*/ }],
        ['guest_4', () => { /* do sth*/ }],
        ['guest_5', () => { /* do sth*/ }],
        ['master_1', () => { /* do sth*/ }],
        ['master_2', () => { /* do sth*/ }],
        ['master_3', () => { /* do sth*/ }],
        ['master_4', () => { /* do sth*/ }],
        ['master_5', () => { /* do sth*/ }],
        ['default', () => { /* do sth*/ }]
      ])

      /**
     * 按钮点击事件
     * @param {string} identity 身份标识：guest客态 master主态
     * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
     */
      const onButtonClick = (identity, status) => {
        const action = actions.get(`${identity}_${status}`) || actions.get('default')
        action.call(this)
      }
    },

    handleGo(item) {
      this.$router.push({
        path: item.to
      })
    }
  }
}
