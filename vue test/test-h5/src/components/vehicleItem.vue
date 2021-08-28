<template>
  <div class="vehicleItem">
    <div class="item" @click="lookMoreClick(dataItem)">
      <div class="item__title flex-b">
        <div class="item__title-lfCt flex-Vcenter flex-l">
          <div>
            <span style="color:#333;font-size:14px" v-if="isDriverCode"
              >班次信息：</span
            >
            <van-tag
              type="primary"
              size="medium"
              :color="tagColor(dataItem.status)"
              >{{ tagText(dataItem.status) }}</van-tag
            >
          </div>
          <div class="item__title-lf flex-l" v-if="!isDriverCode">
            <span>{{ dataItem.startName }}</span>
            <span><i></i><i></i></span>
            <span>{{ dataItem.endName }}</span>
          </div>
        </div>
        <a class="item__title-rt">查看详情<van-icon name="arrow" /> </a>
      </div>
      <div class="item__content">
        <div class="item__content-i" v-if="isDriverCode">
          <span :style="isDriverCode ? 'width:85px' : ''">起始站：</span
          ><span>{{ dataItem.startName }}</span>
        </div>
        <div class="item__content-i" v-if="isDriverCode">
          <span :style="isDriverCode ? 'width:85px' : ''">终点站：</span
          ><span>{{ dataItem.endName }}</span>
        </div>
        <div class="item__content-i">
          <span :style="isDriverCode ? 'width:85px' : ''">车牌号：</span
          ><span>{{ dataItem.vehicleNumber }}</span>
        </div>
        <div class="item__content-i">
          <span :style="isDriverCode ? 'width:85px' : ''">发车班次：</span
          ><span style="color:#3296fa">{{ dataItem.applyUseTime }}</span>
        </div>
        <div class="item__content-i" v-if="isDriverCode">
          <span :style="isDriverCode ? 'width:85px' : ''">计划乘车人数：</span
          ><span style="color:#3296fa">{{ dataItem.applyUserCount }}</span>
        </div>
        <div class="item__content-i" v-if="!isMyorder">
          <span :style="isDriverCode ? 'width:85px' : ''">线路性质：</span
          ><span>{{
            dataItem.lineType == 0
              ? '普通线路'
              : dataItem.lineType == 1
              ? '临时线路'
              : dataItem.lineType == 2
              ? '拼车线路'
              : ''
          }}</span>
        </div>
        <div class="item__content-i" v-if="!isMyorder">
          <span :style="isDriverCode ? 'width:85px' : ''">班次单号：</span
          ><span>{{ dataItem.applyCode }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computeColor, computeText } from '@/utils/utils'
export default {
  data() {
    return {}
  },
  props: {
    dataItem: {
      type: Object,
      default: () => {}
    },
    isMyorder: {
      type: Boolean,
      default: false
    },
    isDriverCode: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    tagColor(data) {
      return computeColor(data)
    },
    tagText(data) {
      return computeText(data)
    },
    lookMoreClick(item) {
      this.$store.commit('vehicleDispatch/saveVehicleItemData', item)
      this.$router.push({
        name: 'vehicleDispatchDetails'
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/style/commonItem.scss';
.vehicleItem {
  width: 100%;
}
</style>
