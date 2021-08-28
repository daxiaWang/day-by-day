<template>
  <!-- 宿管 退宿申请审批 -->
  <div class="tuisu_wrap">
    <div class="card_box base_info">
      <h3 class="flex_b_c">
        <span>{{ userInfo.PARKNAME }}/{{ userInfo.UNITNAME }}</span>
        <label>退宿申请</label></h3>
      <h4 class="flex_s_c">
        <span>智能生活</span><span>{{ userInfo.BASENAME }}人间</span>
        <!-- <span>233天到期</span> -->
      </h4>
      <h5>7号楼/2单元/1-5-1/2号床</h5>
    </div>
    <div class="card_box">
      <van-cell>
        <template #default>
          <h3>退宿人信息</h3>
        </template>
      </van-cell>
      <van-field v-model="infor.name" label="姓名" readonly />
      <van-field v-model="infor.date" label="退宿日期" readonly />
      <van-field v-model="infor.tel" type="tel" label="联系电话" readonly />
      <van-field v-model="infor.cardno" type="cardno" label="银行卡号" readonly />
      <van-field v-model="infor.reason" label="退宿原因" readonly />
    </div>
    <div class="card_box">
      <van-cell class="reason_box">
        <template #default>
          <h3>审批意见</h3>
        </template>
      </van-cell>
      <!-- <van-field v-model="infor.reason" placeholder="请输入姓名" /> -->
      <van-field
        v-model="infor.suggest"
        rows="3"
        autosize
        label=""
        type="textarea"
        maxlength="100"
        placeholder="请填写审批意见"
        show-word-limit
      />
    </div>
    <div class="btns_box">
      <van-button
        plain
        type="info"
      >驳回</van-button>
      <van-button
        type="info"
      >通过</van-button>
    </div>

  </div>
</template>

<script>
import { deepClone, initMonthDate } from '@/utils/utils'
export default {
  data() {
    return {
      infor: {
        name: '111',
        date: '2021-08-02',
        cardno: '',
        tel: '',
        reason: '',
        suggest: ''
      },
      userInfo: {
        PARKNAME: '桃园',
        BEDNAME: '5号床',
        UNITNAME: '东苑',
        COST: 12.0,
        STARTTIME: null,
        AREA: '13',
        ENDTIME: null,
        BASENAME: '普通宿舍',
        ROOMNAME: '501号房(男）',
        BUILDNAME: '1号楼',
        CAMPUSNAME: '主分区',
        ROOMBEDNUM: 5
      }
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.tuisu_wrap {
  padding: 10px 10px 20px;
}

.base_info {
  height: 110px;
  background: #fff url(~@/images/sofa1.png) right 39px no-repeat;
  background-size: 86px 59px;
  padding: 13px 14px;
  h3 {
    color: $color2;
    font-size: 17px;
    font-weight: 600;
    label{
      color: $redColor;
      font-size: 15px;
    }
  }
  h4 {
    margin: 13px 0;
    span {
      display: inline-block;
      background: #eaf3ff;
      border-radius: 2px;
      font-size: 13px;
      color: #4997f9;
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
}
.reason_box::after{
  border: none;
}
.btns_box{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 12px;
}
</style>
<style lang="scss">
  textarea.van-field__control{
    background: #F9FAF9;
    padding: 5px 10px;
  }
</style>
