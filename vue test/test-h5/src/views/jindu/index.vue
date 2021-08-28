<template>
  <div>
    <van-cell-group>
      <van-cell
        title="我发起的"
        :value="typeText"
        is-link
        size="large"
        @click="showScreenPicker = true"
      />
    </van-cell-group>
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
                :key="item.PROCESSID"
                title="退宿申请"
                :label="item.CREATETIME"
                is-link
                center
                :to="`jddetail?id=${item.PROCESSID}`"
              >
                <template #default>
                  <span :style="{ color: `${formatState(item.STATUS).color}` }">{{ formatState(item.STATUS).zh }}</span>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
        </van-list>
      </van-pull-refresh>

    </div>
    <!-- 筛选类型选择 -->
    <van-popup v-model="showScreenPicker" position="bottom" @click="showScreenPicker = false">
      <van-picker
        title="进度类型"
        show-toolbar
        :columns="columnsList"
        @confirm="screenSureClick"
      />
    </van-popup>
  </div>
</template>

<script>
import listMixin from '@/mixins/list'
import { getWithdrawalApplicationList } from '@/services/api'

const STATEARR = {
  0: {
    zh: '待审核',
    color: '#9199A3'
  },
  1: {
    zh: '已通过',
    color: '#00D19D'
  },
  2: {
    zh: '未通过',
    color: '#FF4E53'
  }
}
export default {
  filters: {

  },
  mixins: [listMixin],
  data() {
    return {
      showScreenPicker: false,
      columnsList: [
        { text: '全部', value: 3 },
        { text: '待审核', value: 0 },
        { text: '已通过', value: 1 },
        { text: '未通过', value: 2 }
      ],
      type: 3,
      typeText: '全部',
      list: [
        {
          cont: '退宿申请',
          state: '0',
          date: '2021-01-02'
        },
        {
          cont: '入住申请',
          state: '1',
          date: '2020-11-02'
        },
        {
          cont: '调宿申请',
          state: '2',
          date: '2021-01-02'
        },
        {
          cont: '调宿申请',
          state: '3',
          date: '2021-01-02'
        }
      ]
    }
  },
  mounted() {
    this.onLoadList()
  },
  methods: {
    formatState(value) {
      return STATEARR[value]
    },
    loadData() {
      const params = {
        type: this.type,
        page: this.pages.page,
        rows: this.pages.rows
      }
      return new Promise((resolve, reject) => {
        getWithdrawalApplicationList(params)
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
    screenSureClick(value, index) {
      this.type = value.value
      this.typeText = value.text
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
}

.refresh-wrap{
  height: calc( 100vh - 120px );
  overflow-y: auto;
}
</style>
