<template>
  <div class="main_page">
    <div v-if="state" class="info_box">
      <div class="base_info base_info_no">您当前无入住信息~</div>
    </div>
    <div v-else class="info_box">
      <div class="base_info">
        <h3>
          <span v-if="userInfo.CAMPUSNAME ">{{ userInfo.CAMPUSNAME }}</span>
          <span v-if="userInfo.PARKNAME">/{{ userInfo.PARKNAME }}</span>
        </h3>
        <h4 class="flex_s_c">
          <span v-if="userInfo.BASENAME">{{ userInfo.BASENAME }}</span>
          <span v-if="userInfo.MATURITYDAY">{{ userInfo.MATURITYDAY }}天到期</span>
        </h4>
        <h5>
          <span v-if="userInfo.BUILDNAME">{{ userInfo.BUILDNAME }}</span>
          <span v-if="userInfo.UNITNAME"> / {{ userInfo.UNITNAME }}</span>
          <span v-if="userInfo.ROOMNAME"> / {{ userInfo.ROOMNAME }}</span>
          <span v-if="userInfo.BEDNAME"> / {{ userInfo.BEDNAME }}</span>
          <span></span>
        </h5>
        <div v-if="userInfo.COST"><label>￥</label><span>{{ userInfo.COST }}</span> /月</div>
        <div v-else><label>暂无</label> /月</div>
      </div>
      <div class="state_box">
        <div class="flex_b_c state_desc">
          <label>{{ userInfo.STATUS }}</label>
          <span>{{ userInfo.STARTTIME }} 至 {{ userInfo.ENDTIME }}</span>
        </div>
        <div class="flex_b_c">
          <div class="progress_box">
            <van-progress
              :show-pivot="false"
              color="#348CFA"
              track-color="rgba(#FFFFFF, 0.4)"
              :percentage="userInfo.PERCENTAGE"
              stroke-width="8"
            />
          </div>
          <span>{{ userInfo.PERCENTAGE }}%</span>
        </div>
      </div>
    </div>

    <div class="serve_box">
      <van-notice-bar
        v-if="!state && userInfo.REMIND === 2"
        left-icon="volume-o"
        background="#FFFFFF"
        :scrollable="true"
        :text="`尊敬的租户，您的租金将于${userInfo.ENDTIME}到期，请及时缴纳`"
      />
      <ul class="card_box">
        <li
          v-for="item in pageList"
          :key="item.id"
          :title="item.name"
          :style="{ background: item.bgColor }"
          @click="handleGo(item)"
        >
          <span
            :style="{
              background: `url(${item.class}) no-repeat left center/40px 40px`,
            }"
          >{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import rzsq from '@/images/index/rzsq.png'
import tiaossq from '@/images/index/tiaossq.png'
import tuissq from '@/images/index/tuissq.png'
import jdcx from '@/images/index/jdcx.png'
import wdzd from '@/images/index/wdzd.png'
import wybx from '@/images/index/wybx.png'
import { getQueryString } from '@/utils/utils'
import { login, getDromInfo } from '@/services/api'
export default {
  name: 'MainPage',
  // mixins: [indexMixins],
  data() {
    return {
      state: true,
      userInfo: {},
      pageList: [
        // {
        //   id: '0',
        //   name: '入住申请',
        //   to: 'ruzhu',
        //   class: rzsq,
        //   bgColor: '#FEF5F1'
        // },
        // {
        //   id: '1',
        //   name: '调宿申请',
        //   to: 'tiaosu',
        //   class: tiaossq,
        //   bgColor: '#F2FCFE'
        // },

        {
          id: '3',
          name: '进度查询',
          to: 'jindu',
          class: jdcx,
          bgColor: '#FEFAF1'
        },
        {
          id: '4',
          name: '我的账单',
          to: 'zhangdan',
          class: wdzd,
          bgColor: '#FDF5F3'
        }
        // { id: '5', name: '我要保修', to: 'baoxiu', class: wybx, bgColor: '#EFF9F8' }
      ]
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.checkCode()
    })
  },
  methods: {
    checkCode() {
      const userInfo = window.sessionStorage.getItem('userInfo')
      if (window.sessionStorage.getItem('userInfo') && JSON.stringify(userInfo) !== '{}') {
        this.userInfo = userInfo.userInfo
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
            // console.log('this.$store', this.$store.getters.userInfo)
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
        const { body } = res
        if (body.code === 20000) {
          this.state = false
          // console.log('body.result', body.result)
          this.pageList.unshift({
            id: '2',
            name: '退宿申请',
            to: 'tuisu',
            class: tuissq,
            bgColor: '#F2F6FF'
          },)
          this.userInfo = body.result
        } else {
          this.state = true
          this.$toast.fail(body.message)
        }
      })
    },
    handleGo(item) {
      this.$router.push({
        path: item.to
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main_page {
  background: linear-gradient(180deg, #e0ebf9 0%, #f7f8fa 50%);
  .info_box {
    padding-top: 32px;
    .base_info {
      height: 154px;
      background: url(~@/images/index/bg.png) right bottom no-repeat;
      background-size: 100% 154px;
      padding: 5px 20px 0 20px;
      &_no {
        background: url(~@/images/index/bg-no.png) right bottom no-repeat;
        background-size: 100% 154px;
        font-size: 18px;
        color: $color2;
        font-weight: 600;
        line-height: 94px;
        padding-left: 40px;
      }
      h3 {
        color: $color2;
        font-size: 17px;
        font-weight: 600;
      }
      h4 {
        margin: 13px 0;
        span {
          display: inline-block;
          background: #cce3ff;
          border-radius: 2px;
          font-size: 13px;
          color: $themeColor;
          padding: 3px 8px;
          margin-right: 6px;
        }
      }
      h5 {
        color: $color4;
        background: url(~@/images/index/dingwei.png) no-repeat left center;
        background-size: 10px 12px;
        padding-left: 15px;
      }
      div {
        margin-top: 22px;
        color: $color6;
        font-size: 12px;
        label {
          font-size: 16px;
        }
        span {
          font-size: 32px;
        }
        label,
        span {
          color: $redColor;
          font-weight: 600;
        }
      }
    }
    .state_box {
      background: #abd1ff;
      border-radius: 8px;
      padding: 11px 20px;
      margin: 0 10px 14px;
      color: $themeColor;
      font-size: 12px;
      .state_desc {
        color: #fff;
        margin-bottom: 11px;
        label {
          display: inline-block;
          line-height: 25px;
          height: 26px;
          width: 80px;
          background: url(~@/images/index/zlzt.png) no-repeat left center;
          background-size: 69px 26px;
          padding-left: 26px;
        }
      }
      .progress_box {
        width: calc(100% - 25px);
        padding-right: 8px;
        & ~ span {
          font-weight: 600;
        }
      }
    }
  }
  .serve_box {
    padding: 5px 12px 10px 12px;
    margin: 0px 10px 0 10px;
    border-radius: 8px;
    background-color: #fff;
    .card_box {
      display: grid;
      grid-template-columns: 1fr minmax(100px, 1fr);
      grid-auto-rows: 72px;
      grid-row-gap: 7px;
      grid-column-gap: 7px;
      margin: 10px 0;
      li {
        border-radius: 8px;
        font-size: 16px;
        padding: 16px 23px;
        box-sizing: content-box;
        span {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          padding-left: 45px;
        }
      }
    }
  }
}
</style>
