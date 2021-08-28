<template>
  <div>
    <div class="filter flex_b">
      <div class="filter-time" @click="showdate = true">
        {{ datetime }}
        <svg-icon icon-class="rili-blue" class="rili"></svg-icon>
      </div>
      <!-- <div class="filter-type" @click="showScreenPicker = true">
        筛选
        <van-icon name="arrow-down" />
      </div> -->
    </div>
    <div class="jindu_box">
      <van-pull-refresh v-model="refreshing" class="refresh-wrap" @refresh="onRefresh">
        <van-empty
          v-if="dataList.length == 0"
          class="custom-image"
          description="没有查到相关信息"
        />
        <van-list
          v-else
          v-model="loading"
          :finished="finished"
          :immediate-check="true"
          :finished-text="dataList.length > 0 ? '没有更多了' : ''"
          :error.sync="error"
          error-text="请求失败,点击重新加载"
          @load="onLoadList"
        >
          <div class="list_detail">
            <van-cell-group>
              <van-cell
                v-for="item in dataList"
                :key="item.ID"
                :title="item.BILLDATE"
                :to="`zdDetail?id=${item.ID}`"
                is-link
                center
              >
                <!-- <template #icon>
                  <i
                    class="type_icon"
                    :style="{
                      background: `url(${item.icon}) no-repeat left center/40px 40px`,
                    }"
                  ></i>
                </template> -->
                <template #default>
                  <span :style="{ color: `${formatState(item.STATUSNAME).color}` }">{{ item.STATUSNAME }}</span>
                  <!-- <span>{{ item.STATUSNAME }}</span> -->
                </template>
              </van-cell>
            </van-cell-group>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 时间选择 -->
    <van-popup v-model="showdate" position="bottom" @click="showdate = false">
      <!-- <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="dateConfirm"
        @cancel="showdate = false"
      /> -->
      <van-picker
        title="选择时间"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 筛选类型选择 -->
    <van-popup v-model="showScreenPicker" position="bottom" @click="showScreenPicker = false">
      <van-picker
        title="账单类型"
        show-toolbar
        :columns="columnsAccount"
        @confirm="screenSureClick"
      />
    </van-popup>
    <!-- <screen-item
      :data-list="screenList"
      :show-screen-picker.sync="showScreenPicker"
      choose-type="radio"
      @screenSureClick="screenSureClick"
    ></screen-item> -->
  </div>
</template>

<script>
import { BUSINFORLIST, STATEARR } from './data'
import screenItem from '@/components/screenItem'
import { deepClone, initMonthDate } from '@/utils/utils'
import { getBillList } from '@/services/api'
import listMixin from '@/mixins/list'

export default {
  components: {
    screenItem
  },
  mixins: [listMixin],
  data() {
    return {
      columns: [new Date().getFullYear() - 3, new Date().getFullYear() - 2, new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2],
      columnsAccount: ['押金', '住宿费', '冷水费', '热水费', '电费'],
      showdate: false,
      datetime: new Date().getFullYear(),
      currentDate: new Date(),
      noDataImg: '',
      totalDates: {
        totalStartDate: null,
        totalEndDate: null
      },
      showScreenPicker: false
    }
  },
  computed: {
    screenList() {
      return BUSINFORLIST
    },
    minDate() {
      const today = new Date()
      const year = today.getFullYear() - 1
      return new Date(year, 0, 1)
    },
    maxDate() {
      const today = new Date()
      const year = today.getFullYear() + 1
      return new Date(year, 11, 1)
    }
  },
  mounted() {
    this.onLoadList()
  },
  methods: {
    loadData() {
      const params = {
        time: this.datetime
      }
      return new Promise((resolve, reject) => {
        getBillList(params)
          .then((res) => {
            const { body } = res
            if (body.code === 20000) {
              resolve(body.result)
            } else {
              reject('error')
              this.$toast.fail(body.message)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    formatState(value) {
      return STATEARR[value]
    },
    screenSureClick(data) {
      // this.params = { ...this.params, ...data }
      // this.showScreenPicker = false
      // this.onRefresh()
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    },
    // 筛选日期选择
    dateConfirm(value) {
      this.datetime = initMonthDate({ value })
      this.onRefresh()
    },
    onConfirm(value, index) {
      this.datetime = value
      // let date=new Date(value)//获取的数值可以转日期,再根据自己需求格式化日期
      this.showdate = false// 这个是关闭弹窗
      this.onRefresh()
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.jindu_box{
  padding: 10px;
  padding-top: 50px;
}
.filter {
  padding: 13px 16px;
  background: #fff;
  border-top: 1px solid rgba(211, 206, 206, 0.3);
  font-weight: 500;
  position: fixed;
  z-index: 99;
}
.type_icon{
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.refresh-wrap{
  height: calc( 100vh - 120px );
  overflow-y: auto;
}
</style>
