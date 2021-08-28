<template>
  <div>
    <van-field
      v-model="fieldValue"
      is-link
      readonly
      label="地区"
      placeholder="请选择所在地区"
      @click="show = true"
    />
    <!-- <van-popup v-model="show" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择所在地区"
        :options="options"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup> -->
    <van-overlay
      :show="show"
      class-name="place_overlay"
      @click="show = false"
    >
      <div
        class="place_overlay_wrapper"
        :style="{ 'height: 10rem;margin-top': `${navHeight + navHeight + 2}px` }"
        @click.stop
      >
        <van-cascader
          v-model="cascaderValue"
          title="请选择区域"
          active-color="#4997F9"
          :options="options"
          :closeable="false"
          :field-names="fieldNames"
          @close="show = false"
          @finish="onFinish"
        />
        <!-- @change="onChange" -->
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      fieldValue: '',
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [
        {
          text: '浙江省',
          value: '330000',
          children: [
            { text: '杭州市', value: '330100' },
            { text: '杭州市1', value: '3301001' },
            { text: '杭州市2', value: '3301002' },
            { text: '杭州市3', value: '3301003' },
            { text: '杭州市4', value: '3301004' },
            { text: '杭州市5', value: '3301005' },
            { text: '杭州市6', value: '3301006' },
            { text: '杭州市7', value: '3301007' },
            { text: '杭州市8', value: '3301008' },
            { text: '杭州市9', value: '3301009' },
            { text: '杭州市11', value: '3301000' },
            { text: '杭州市22', value: '3130100' },
            { text: '杭州市33', value: '3230100' },
            { text: '杭州市44', value: '3330100' },
            { text: '杭州市55', value: '3430100' },
            { text: '杭州市66', value: '3530100' },
            { text: '杭州市77', value: '3630100' },
            { text: '杭州市88', value: '3730100' },
            { text: '杭州市99', value: '3830100' },
            { text: '杭州市133', value: '3930100' },
            { text: '杭州市144', value: '3030100' },
            { text: '杭州市155', value: '3130100' },
            { text: '杭州市166', value: '3230100' },
            { text: '杭州市177', value: '32230100' },
            { text: '杭州市6', value: '33061006' },
            { text: '杭州市7', value: '33051007' },
            { text: '杭州市8', value: '33016008' },
            { text: '杭州市9', value: '3301y009' },
            { text: '杭州市11', value: '330y1000' },
            { text: '杭州市22', value: '3130r100' },
            { text: '杭州市33', value: '32430r100' },
            { text: '杭州市44', value: '33340100' },
            { text: '杭州市55', value: '34301500' },
            { text: '杭州市66', value: '353301r00' },
            { text: '杭州市77', value: '3q630100' },
            { text: '杭州市88', value: '37301ww00' },
            { text: '杭州市99', value: '3830w100' },
            { text: '杭州市133', value: '3930w100' },
            { text: '杭州市144', value: '3030f100' },
            { text: '杭州市155', value: '313d0100' },
            { text: '杭州市166', value: '323c0100' },
            { text: '杭州市177', value: '322d30100' }
          ]
        },
        {
          text: '江苏省',
          value: '320000',
          children: [{ text: '南京市', value: '320100' }]
        }
      ]
    }
  },
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.show = false
      this.fieldValue = selectedOptions.map((option) => option.text).join('/')
    }
  }
}

</script>
