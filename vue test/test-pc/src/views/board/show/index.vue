<template>
  <div class="wrap">
    <div class="top">
      <div class="title">政 企 经 营 数 据 看 板</div>
    </div>
    <div class="container">
      <div class="c_left">
        <div class="item_box item-gdqs">
          <h3>工单趋势</h3>
          <div id="orderTrend" class="chart_box" />
        </div>
        <div class="item_box">
          <h3>产品销售数据排行榜</h3>
          <div class="chart_box sell-swiper">
            <dl width="100%">
              <dt>产品</dt>
              <dt>产品负责人</dt>
              <dt>销售(套)</dt>
              <dt>软件(万)</dt>
              <dt>硬件(万)</dt>
            </dl>
            <div ref="sellRef" class="swiper-container">
              <div class="swiper-wrapper">
                <dl v-for="(item, index) in salesData" class="swiper-slide">
                  <dd>
                    <span>{{ item.product_name }}</span>
                  </dd>
                  <dd>
                    <span>{{ item.principal || "---" }}</span>
                  </dd>
                  <dd>
                    <span>{{ item.sum_sale_num || 0 }}</span>
                    <span
                      class="numBar"
                      :style="{
                        width: (item.sum_sale_num / numScalePlate) * 100 + '%',
                      }"
                    />
                  </dd>
                  <dd>
                    <span>{{ item.software || 0 }}</span>
                    <span
                      class="moneyBar"
                      :style="{
                        width: (item.software / smoneyScalePlate) * 100 + '%',
                      }"
                    />
                  </dd>
                  <dd>
                    <span>{{ item.hardware || 0 }}</span>
                    <span
                      class="moneyBar1"
                      :style="{
                        width: (item.hardware / moneyScalePlate) * 100 + '%',
                      }"
                    />
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div class="item_box">
          <h3>产品三端导入</h3>
          <div class="chart_box import_box import-swiper">
            <dl width="100%">
              <dt>产品</dt>
              <dt>产品负责人</dt>
              <dt>市场导入</dt>
              <dt>客服导入</dt>
              <dt>交付导入</dt>
            </dl>
            <div ref="importRef" class="swiper-container">
              <div class="swiper-wrapper">
                <dl
                  v-for="(item, index) in importData"
                  :key="item.product_name"
                  class="swiper-slide"
                >
                  <dd>{{ item.product_name }}</dd>
                  <dd>{{ item.product_manager }}</dd>
                  <dd>
                    <i v-if="item.market === 0" class="flower prefect" />
                    <template v-else>
                      <i v-for="item in item.market" class="qi" />
                    </template>
                  </dd>
                  <dd>
                    <i v-if="item.customer === 0" class="flower prefect" />
                    <template v-else>
                      <i v-for="item in item.customer" class="qi" />
                    </template>
                  </dd>
                  <dd>
                    <i v-if="item.deliver === 0" class="flower prefect" />
                    <template v-else>
                      <i v-for="item in item.deliver" class="qi" />
                    </template>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="c_cneter">
        <div class="map_box">
          <h3>市场区域热力图</h3>
          <div id="mapBox" class="chart_box" />
        </div>
        <div class="item_box">
          <h3>
            项目收入数据
            <span
              v-if="incomeData.endDate"
              class="end_date"
            >截止到 {{ incomeData.endDate | fnData }}</span>
          </h3>
          <div class="income_wrap">
            <div id="projectIncome" class="chart_box income_box" />
            <div class="income_table">
              <table>
                <tr>
                  <th>同期<br>(年份)</th>
                  <th>实际<br>(万元)</th>
                  <!-- <th>计划<br/>（万元）</th> -->
                </tr>
                <tr v-for="(item, key) in incomeData.tableData">
                  <td>{{ key | fnName }}</td>
                  <td>{{ item.real_income }}</td>
                  <!-- <td>{{item.real_income}}</td> -->
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="item_box">
          <h3>
            当前中标数据
            <span
              v-if="moneyData.endDate"
              class="end_date"
            >
              截止到 {{ moneyData.endDate | fnData }}</span>
          </h3>
          <div class="bid_wrap">
            <div id="moneyBox" class="chart_box bid_chart" />
            <div class="bid_table">
              <table>
                <tr>
                  <th>同期<br>(年份)</th>
                  <th>实际<br>(万元)</th>
                  <!-- <th>计划<br/>（万元）</th> -->
                </tr>
                <tr v-for="(item, key) in moneyData.tableData">
                  <td>{{ key }}</td>
                  <td>{{ item.sum_real_win }}</td>
                  <!-- <td>{{item.sum_plan_win}}</td> -->
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="c_right">
        <div class="item_box">
          <h3>当周需求评审</h3>
          <div id="reviewBox" class="chart_box" />
        </div>
        <div class="item_box">
          <h3>需求分析趋势</h3>
          <div id="classfiyBox" class="chart_box" />
        </div>
        <div class="item_box">
          <h3>市场商机趋势</h3>
          <div id="incrementBox" class="chart_box" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from '@/api/product'
import Swiper from 'swiper'
export default {
  name: 'Zhengqi',
  filters: {
    fnName(key) {
      let value = ''
      switch (key) {
        case 'preYear':
          value = '2020'
          break
        case 'prepreYear':
          value = '2019'
          break
        default:
          value = '2021'
          break
      }
      return value
    },
    fnData(item) {
      return item.slice(0, 4) + '-' + item.slice(4, 6)
    }
  },
  data() {
    return {
      apiTimer: null,
      mapTimer: null,
      moneyScalePlate: 0,
      smoneyScalePlate: 0,
      numScalePlate: 0,
      importData: [],
      salesData: [],
      mapData: [],
      timerIndex: 0,
      incomeData: {
        lastYear: [],
        beforeLastYear: [],
        tableData: {},
        endDate: '',
        staDate: ''
      },
      moneyData: {
        lastYear: [],
        beforeLastYear: [],
        tableData: {},
        endDate: '',
        staDate: ''
      },
      timerF: true
    }
  },
  watch: {
    timerF(value) {
      if (value) {
        console.log(0)
        this.timerFn()
      } else {
        console.log(1)
        clearInterval(this.apiTimer)
        clearInterval(this.mapTimer)
        this.timerF = true
      }
    }
  },
  created() {
    this.timerFn()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.mapTimer)
  },
  mounted() {
    this.$nextTick(() => {
      this.initOrderTrend()
      this.getSellRef()
      this.getImportData()
      this.initTimeline()
      this.initProjectIncome()
      this.initReviewBox()
      this.initClassfiyBox()
      this.initIncrementBox()
      this.initMoneyBox()
    })
  },
  methods: {
    timerFn() {
      this.apiTimer = setInterval(() => {
        this.initOrderTrend() // 一分钟调用接口一次
        this.getSellRef()
        this.getImportData()
        this.initTimeline()
        this.initProjectIncome()
        this.initReviewBox()
        this.initClassfiyBox()
        this.initIncrementBox()
        this.initMoneyBox()
        this.timerF = false
      }, 1800000)
    },
    getAdd(arr, type) {
      const totalScore = arr.reduce((pre, cur) => {
        return pre + cur[type]
      }, 0)
      return totalScore
    },
    getMax(prev, next) {
      return Math.max(prev, next)
    },
    classify(arr) {
      const map = {}
      const myArr = []
      for (let i = 0; i < arr.length; i++) {
        if (!map[arr[i].month]) {
          myArr.push({
            month: arr[i].month,
            data: [arr[i]]
          })
          map[arr[i].month] = arr[i]
        } else {
          for (let j = 0; j < myArr.length; j++) {
            if (arr[i].month === myArr[j].month) {
              myArr[j].data.push(arr[i])
              break
            }
          }
        }
      }
      return myArr
    },
    formatWeek(key) {
      let value = ''
      if (key === 0) {
        value = 0
      } else if (key > 0 && key <= 4) {
        value = 1
      } else if (key > 4 && key <= 8) {
        value = 2
      } else if (key > 8) {
        value = 3
      }
      return value
    },
    async initOrderTrend() {
      const $orderTrendBox = this.$echarts.init(
        document.getElementById('orderTrend')
      )
      window.addEventListener('resize', function() {
        $orderTrendBox.resize()
      })
      getData('left1').then((res) => {
        // })
        // fetch_GET('left1', {}, function(res) {
        // console.log('res', res)
        let xAxisData = []
        const yAxisData = []
        const yValueData = []
        xAxisData = res.x.map(
          (item) => item.slice(0, 4) + '-' + item.slice(4, 6)
        )
        for (const key in res.typeAndYList) {
          if (Object.hasOwnProperty.call(res.typeAndYList, key)) {
            const element = res.typeAndYList[key]
            const dataY = []
            element.forEach((ele) => {
              if (ele) {
                dataY.push(ele.work_order_num)
              } else {
                dataY.push(0)
              }
            })
            yAxisData.push(key)
            yValueData.push({
              name: key,
              type: 'line',
              symbol: 'circle',
              endLabel: {
                show: true,
                color: 'inherit', // inherit 同色系
                formatter: function(params) {
                  return params.seriesName
                }
              },
              labelLine: {
                show: true
              },
              labelLayout: {
                moveOverlap: 'shiftY' // 设置这个配置项之后标签不在重叠
              },
              data: dataY
            })
          }
        }

        const option = {
          grid: {
            left: '5%',
            right: '25%',
            bottom: '5%',
            top: '10%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              // type: 'cross' // 十字线显示
            }
          },
          xAxis: {
            type: 'category',
            // name: '时间', // 轴名称
            boundaryGap: false,
            axisLabel: {
              verticalAlign: 'middle',
              margin: 20,
              color: 'rgba(255, 255, 255, 0.8)'
            },
            axisLine: {
              show: true,
              // color: '#fff',
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.35)',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            },
            data: xAxisData
          },
          yAxis: {
            type: 'value',

            nameLocation: 'end', // 轴名称相对位置value
            offset: 5, // x轴相对于默认位置的偏移
            nameTextStyle: {
              // 坐标轴名称样式
              color: 'rgba(255, 255, 255, 0.8)',
              padding: [0, 0, 10, -40] // 坐标轴名称相对位置
            },
            nameGap: 5, // 坐标轴名称与轴线之间的距离
            axisLabel: {
              verticalAlign: 'middle',
              color: 'rgba(255, 255, 255, 0.8)'
              // fontSize: '12'
            },
            axisLine: {
              show: false,
              color: '#fff'
            },
            splitLine: {
              // gird区域中的分割线
              show: true, // 是否显示
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.05)',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            }
          },
          series: yValueData
        }
        $orderTrendBox.setOption({}, true)
        $orderTrendBox.setOption(option, true)
      })
    },
    async getSellRef() {
      const that = this
      getData('left2').then((res) => {
        var softwareArr = []
        var hardwareArr = []
        var numArr = []
        res.forEach((element) => {
          softwareArr.push(Number(element.software))
          hardwareArr.push(Number(element.hardware))
          numArr.push(element.sum_sale_num)
          that.salesData.push(element)
        })
        // that.salesData = that.salesData.concat(that.salesData)
        that.moneyScalePlate = hardwareArr.reduce(that.getMax)
        that.smoneyScalePlate = softwareArr.reduce(that.getMax)
        that.numScalePlate = numArr.reduce(that.getMax)
        that.$nextTick(() => {
          that.initSellRef(res.length)
        })
      })
    },
    async initSellRef(length) {
      new Swiper(this.$refs.sellRef, {
        autoplay: 1000,
        loop: true,
        speed: 1000,
        slidesPerView: 5,
        calculateHeight: true,
        mode: 'vertical'
      })
    },
    async getImportData() {
      const that = this
      getData('left3').then((res) => {
        that.importData = res.map((item) => {
          return {
            ...item,
            market: that.formatWeek(item.market),
            customer: that.formatWeek(item.customer),
            deliver: that.formatWeek(item.deliver)
          }
        })
        // that.importData = that.importData.concat(that.importData)
        that.$nextTick(() => {
          that.initImportRef()
        })
      })
    },
    async initImportRef() {
      new Swiper(this.$refs.importRef, {
        // direction: 'vertical',
        // slidesPerView: 5, // 每页显示几个slide
        // spaceBetween: 10, // slide的间距px
        // followFinger: false, //
        // speed: 1000, // 速度
        // // mousewheel: true, // 鼠标滚轮控制
        // // loop: $('.import-container .swiper-slide').length > 2, // 循环
        // observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        // observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        // autoplay: {
        //   delay: 1200,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false
        // }
        // autoplay: 2000,
        // loop: true,
        // speed: 1000,
        // slidesPerView: 5,
        // // calculateHeight: true,
        // observer: true,
        // observeParents: true,
        // mode: 'vertical'
        autoplay: 1000,
        loop: true,
        speed: 2000,
        slidesPerView: 5,
        calculateHeight: true,
        mode: 'vertical'
      })
    },
    change(type) {
      let value = 0
      if (type === '高') {
        value = 300
      } else if (type === '中') {
        value = 100
      } else {
        value = 0
      }
      return value
    },
    async initTimeline() {
      const that = this
      const $mapBox = this.$echarts.init(document.getElementById('mapBox'))
      window.addEventListener('resize', function() {
        $mapBox.resize()
      })
      getData('middle1').then((res) => {
        const aaa = res.map((item) => {
          return {
            ...item,
            name: item.area,
            value: that.change(item.heat)
          }
        })
        const option = {
          tooltip: {
            trigger: 'item', // hover触发器
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            formatter: function(params) {
              if (
                params.componentType === 'series' &&
                typeof params.data !== 'undefined'
              ) {
                const htmlStr = `
                  <div class="maptooltip_box">
                      <h4>中标情况</h4>
                      <div class="maptooltip_cont">
                          <p>${params.data.name} <span>${
  params.data.director
}</span> 中标${params.data.sale}万</p>
                                                    <p>${
  params.data.name
} <span>${
  params.data.director
}</span> 商机${params.data.time || 0}万</p>
                      </div>
                  </div>
                  `
                return htmlStr
              } else {
                return ''
              }
            }
          },
          title: {
            text: '',
            textAlign: 'center',
            left: 180,
            bottom: 10,
            textStyle: {
              fontSize: 70,
              color: 'rgba(255, 255, 255, 0.5)'
            }
          },
          visualMap: {
            type: 'piecewise',
            right: '2%',
            bottom: '2%',
            align: 'left',
            textStyle: {
              color: '#fff'
            },
            pieces: [
              { gt: 200, color: 'red', label: '高' }, // (1500, Infinity]
              { gt: 50, color: 'orange', lte: 200, label: '中' }, // (100, 200]
              { lt: 50, color: 'gray', label: '差' } // (-Infinity, 100)
            ]
          },
          geo: {
            map: 'china',
            roam: true,
            zoom: 1.3,
            scaleLimit: {
              min: 0.7,
              max: 3
            },
            label: {
              emphasis: {
                show: true,
                color: '#fff'
              },
              normal: {
                show: false,
                color: '#fff'
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: 'rgba(32, 124, 254, 1)',
                borderWidth: 1,
                borderColor: 'rgba(0, 255, 246, 1)'
              }
            }
          },
          series: {
            type: 'map',
            mapType: 'china',
            geoIndex: 0,
            // zoom: 2.2,
            scaleLimit: {
              min: 0.7,
              max: 3
            },
            center: 'center',
            label: {
              emphasis: {
                show: true,
                color: '#fff'
              },
              normal: {
                show: false,
                color: '#fff'
              }
            },
            emphasis: {
              itemStyle: {
                areaColor: 'rgba(32, 124, 254, 1)',
                borderWidth: 1,
                borderColor: 'rgba(0, 255, 246, 1)'
              }
            },
            data: aaa
          }
        }
        $mapBox.setOption({}, true)
        $mapBox.setOption(option, true)

        let index = 0 // 播放所在下标
        that.mapTimer = setInterval(function() {
          $mapBox.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          })
          index++
          if (index > aaa.length) {
            index = 0
          }
        }, 5000)
      })
    },
    async initProjectIncome() {
      const $incomepBox = this.$echarts.init(
        document.getElementById('projectIncome')
      )
      window.addEventListener('resize', function() {
        $incomepBox.resize()
      })

      const that = this
      // console.log("date", new Date().getFullYear())
      // fetch_GET('middle2', {}, function(res) {
      getData('middle2').then((res) => {
        const planIncome = []
        const realIncome = []
        const lastYear = []
        const beforeLastYear = []
        let xName = []
        const nowYear = new Date().getFullYear()
        // console.log("that.getAdd(res.nowYear, 'plan_income')", )

        // that.incomeData.tableData[res.nowYear] = {
        //     'year': res.nowYear,
        //     'plan_sum':  that.getAdd(res.nowYear, 'plan_income'),
        //     'real_sum':  that.getAdd(res.nowYear, 'real_income'),
        // }
        // console.log("that.incomeData", that.incomeData)
        that.incomeData.staDate = res.staDate
        that.incomeData.endDate = res.endDate
        that.incomeData.tableData = res.total
        res.nowYear.forEach((value) => {
          if (value) {
            planIncome.push(value.plan_income)
            realIncome.push(value.real_income)
          } else {
            planIncome.push(0)
            realIncome.push(0)
          }
        })

        res.preYear.forEach((value) => {
          if (value) {
            lastYear.push(value.real_income)
          } else {
            lastYear.push('暂无')
          }
        })
        // that.incomeData.lastYear = lastYear
        that.$set(that.incomeData, 'lastYear', `${nowYear - 1}`)
        that.$set(that.incomeData, 'lastYearData', lastYear)
        res.prepreYear.forEach((value) => {
          if (value) {
            beforeLastYear.push(value.real_income)
          } else {
            beforeLastYear.push('暂无')
          }
        })
        // that.incomeData.beforeLastYear = beforeLastYear
        that.$set(that.incomeData, 'beforeLastYear', `${nowYear - 2}`)
        that.$set(that.incomeData, 'beforeLastYearData', beforeLastYear)
        xName = res.x.map((item) => item.slice(0, 4) + '-' + item.slice(4, 6))
        const option = {
          grid: {
            left: '10%',
            top: 40, // 设置条形图的边距
            right: '5%',
            bottom: 40
          },
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          xAxis: {
            data: xName,
            show: true,
            // name: '时间', // 轴名称
            position: 'bottom', // x轴的位置
            offset: 5, // x轴相对于默认位置的偏移
            axisLabel: {
              verticalAlign: 'middle',
              margin: 15,
              color: 'rgba(255, 255, 255, 0.8)'
            },
            axisLine: {
              show: true,
              // color: '#fff',
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.35)',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            show: true,
            name: '万元', // 轴名称
            nameLocation: 'end', // 轴名称相对位置value
            offset: 5, // x轴相对于默认位置的偏移
            nameTextStyle: {
              // 坐标轴名称样式
              color: 'rgba(255, 255, 255, 0.8)',
              padding: [0, 0, 10, -40] // 坐标轴名称相对位置
            },
            nameGap: 5, // 坐标轴名称与轴线之间的距离
            axisLabel: {
              verticalAlign: 'middle',
              color: 'rgba(255, 255, 255, 0.8)'
              // fontSize: '12'
            },
            axisLine: {
              show: false,
              color: '#fff'
            },
            splitLine: {
              // gird区域中的分割线
              show: true, // 是否显示
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.05)',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['每月计划收入', '每月实际收入'],
            right: 0,
            icon: 'square',
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name: '每月计划收入', // blue bar
              type: 'pictorialBar',
              symbol: 'rect',
              barWidth: '40%',
              // label: labelSetting,
              barGap: '10%',
              barCategoryGap: '90%',
              itemStyle: {
                normal: {
                  barMaxWidth: '20%',
                  barBorderRadius: 100,
                  color: '#00FBCC'
                }
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#00FBCC',
                  fontSize: 10
                }
              },
              symbolRepeat: 'true',
              symbolMargin: '20%',
              symbolClip: true,
              symbolSize: ['60%', '20%'],
              symbolBoundingData: 2000,
              data: planIncome
            },
            {
              name: '每月实际收入', // blue bar
              type: 'pictorialBar',
              symbol: 'rect',
              barWidth: '40%',
              barGap: '10%',
              barCategoryGap: '90%',
              itemStyle: {
                normal: {
                  barMaxWidth: '20%',
                  barBorderRadius: 100,
                  color: '#FFEA00'
                }
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#FFEA00',
                  fontSize: 10
                }
              },
              symbolRepeat: 'true',
              symbolMargin: '20%',
              symbolClip: true,
              symbolSize: ['60%', '20%'],
              data: realIncome
            }
          ]
        }
        $incomepBox.setOption({}, true)
        $incomepBox.setOption(option, true)
      })
    },
    async initMoneyBox() {
      const $moneyBox = this.$echarts.init(document.getElementById('moneyBox'))

      window.addEventListener('resize', function(params) {
        $moneyBox.resize()
      })
      const that = this
      // fetch_GET('middle3', {}, function(res) {
      getData('middle3').then((res) => {
        // console.log("middle3 res", res)
        const xName = res.x
        const nowYear = new Date().getFullYear()
        that.moneyData.staDate = res.staDate
        that.moneyData.endDate = res.endDate
        that.moneyData.tableData = res.total
        const aaa =
          (res['typeAndYList'][nowYear] &&
            res['typeAndYList'][nowYear].map((item, index) => {
              if (item) {
                return {
                  ...item,
                  product: item.industry,
                  中标毛利: item.sum_real_profit,
                  实际中标: item.sum_real_win,
                  计划中标: item.sum_plan_win
                }
              } else {
                return {
                  product: xName[index],
                  中标毛利: '无',
                  实际中标: '无',
                  计划中标: '无'
                }
              }
            })) ||
          []
        const aaaa = [
          aaa[0],
          aaa[5],
          aaa[6],
          aaa[7],
          aaa[4],
          aaa[3],
          aaa[2],
          aaa[1]
        ]
        const bbb = (that.moneyData.lastYear =
          (res['typeAndYList'][nowYear - 1] &&
            res['typeAndYList'][nowYear - 1].map((item, index) => {
              if (item) {
                return {
                  ...item,
                  product: item.industry,
                  [nowYear - 1]: item.sum_real_win
                }
              } else {
                return {
                  product: xName[index],
                  [nowYear - 1]: '无',
                  sum_real_win: '无'
                }
              }
            })) ||
          [])
        // console.log("bbb", bbb)
        that.$set(that.moneyData, 'lastYearLabel', `${nowYear - 1}`)
        const ccc = (that.moneyData.beforeLastYear =
          (res['typeAndYList'][nowYear - 2] &&
            res['typeAndYList'][nowYear - 2].map((item, index) => {
              if (item) {
                return {
                  ...item,
                  product: item.industry,
                  [nowYear - 2]: item.sum_real_win
                }
              } else {
                return {
                  product: xName[index],
                  [nowYear - 2]: '无'
                }
              }
            })) ||
          [])
        that.$set(that.moneyData, 'beforeLastYearLabel', `${nowYear - 2}`)
        // console.log("that.moneyData", that.moneyData)
        const option = {
          grid: {
            top: '25%',
            left: '10%',
            right: '5%',
            bottom: '34%'
          },
          legend: {
            right: 0,
            data: ['中标毛利', '实际中标', '计划中标'],
            textStyle: {
              color: '#fff'
            },
            icon: 'square'
          },
          tooltip: [
            {
              show: true,
              type: 'xAxis'
            }
          ],
          dataset: [
            {
              dimensions: ['product', '计划中标', '实际中标', '中标毛利'],
              source: aaaa
            }
          ],
          xAxis: {
            type: 'category',
            name: '', // 轴名称
            offset: 10,
            interval: 0,
            rotate: 40,
            axisLabel: {
              verticalAlign: 'middle',
              margin: 20,
              interval: 0,
              // rotate:5,
              color: 'rgba(255, 255, 255, 0.8)'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.35)',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            name: '万元', // 轴名称
            nameLocation: 'end', // 轴名称相对位置value
            offset: 5, // x轴相对于默认位置的偏移
            gridIndex: 0,
            nameTextStyle: {
              // 坐标轴名称样式
              color: 'rgba(255, 255, 255, 0.8)',
              padding: [0, 0, 10, -40] // 坐标轴名称相对位置
            },
            nameGap: 5, // 坐标轴名称与轴线之间的距离
            axisLabel: {
              verticalAlign: 'middle',
              color: 'rgba(255, 255, 255, 0.8)'
              // fontSize: '12'
            },
            axisLine: {
              show: false,
              color: '#fff'
            },
            splitLine: {
              // gird区域中的分割线
              show: true, // 是否显示
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.05)',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            }
          },
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            {
              type: 'bar',
              name: '计划中标',
              // stack: 'total',
              datasetIndex: 0,
              itemStyle: {
                normal: {
                  color: '#00FFF6'
                }
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#00FFF6',
                  fontSize: 10
                }
              }
            },
            {
              type: 'bar',
              name: '实际中标',
              stack: 'total',
              datasetIndex: 0,
              itemStyle: {
                normal: {
                  color: '#0091FF'
                }
              },
              label: {
                show: true,
                position: 'bottom',
                textStyle: {
                  color: '#0091FF',
                  fontSize: 10
                }
              }
            },
            {
              name: '中标毛利',
              type: 'bar',

              datasetIndex: 0,
              itemStyle: {
                normal: {
                  color: '#FFEA00'
                }
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#FFEA00',
                  fontSize: 10
                }
              }
            }
          ]
        }
        $moneyBox.setOption({}, true)
        $moneyBox.setOption(option, true)
      })
    },
    async initReviewBox() {
      const that = this
      const $reviewBox = this.$echarts.init(
        document.getElementById('reviewBox')
      )

      // fetch_GET('right1', {}, function(res) {
      getData('right1').then((res) => {
        const data = res[0]
        const pieDatas = [
          { value: data.overstock_num, name: '积压数' },
          { value: data.cost_unit_num, name: '已评审数' },
          { value: data.add_unit_num, name: '新增数' }
        ]

        window.addEventListener('resize', function() {
          $reviewBox.resize()
        })
        const option = {
          // 设置主副标题
          title: {
            show: true,
            text: '总需求', // 主标题
            subtext: data.demand_num, // 副标题：企业数量值，此处用标题方式来显示
            left: 'center',
            top: '40%',
            z: 0,
            zlevel: 100,
            textStyle: {
              // 设置主标题的 样式
              textAlign: 'center',
              color: '#FFFFFF',
              fontSize: 14
            },
            subtextStyle: {
              // 设置副标题的样式
              textAlign: 'center',
              color: '#fff',
              fontSize: 22,
              fontWeight: 600
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            data: ['已评审数', '积压数', '新增数'],
            right: 0,
            // orient: 'vertical',
            icon: 'circle',
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name: '总需求',
              type: 'pie',
              radius: ['40%', '60%'],
              labelLine: {
                length: 10
              },
              label: {
                formatter: '{b|{b}} \n{c|{c}}',
                backgroundColor: '#7FC9FB',
                borderColor: '#7FC9FB',
                borderWidth: 1,
                borderRadius: 2,
                padding: 3,
                align: 'center',
                rich: {
                  color: '#0C143D',
                  fontSize: 12,
                  a: {
                    color: '#6E7079',
                    lineHeight: 22,
                    align: 'center'
                  },
                  hr: {
                    borderColor: '#8C8D8E',
                    width: '100%',
                    borderWidth: 1,
                    height: 0
                  },
                  b: {
                    color: '#0C143D',
                    fontSize: 12
                  }
                }
              },
              data: pieDatas
            }
          ]
        }
        $reviewBox.setOption({}, true)
        $reviewBox.setOption(option, true)
      })
    },
    async initClassfiyBox() {
      const $classfiyBox = this.$echarts.init(
        document.getElementById('classfiyBox')
      )
      const xName = []
      const compoundInterestNum = [] // 复利
      const costUnitNum = [] // 费用单元个数
      const overstockNum = [] // 当前积压数
      // fetch_GET('right2', {}, function(res) {
      getData('right2').then((res) => {
        res.forEach((element) => {
          xName.push(element.week)
          compoundInterestNum.push(element.compound_interest_num)
          costUnitNum.push(element.cost_unit_num)
          overstockNum.push(element.overstock_num)
        })
        const option = {
          grid: {
            left: '7%',
            right: '10%',
            top: '15%'
            // containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              // type: 'cross' // 十字线显示
            }
          },
          legend: {
            type: 'scroll',
            textStyle: {
              color: '#fff'
            },
            data: ['可复用', '定制化', '未评审'],
            // orient: 'vertical',
            bottom: 10,
            icon: 'square'
          },
          xAxis: {
            type: 'category',
            name: '周', // 轴名称
            boundaryGap: false,
            // offset: "5", // x轴相对于默认位置的偏移
            axisLabel: {
              verticalAlign: 'middle',
              margin: 20,
              color: 'rgba(255, 255, 255, 0.8)'
            },
            axisLine: {
              show: true,
              // color: '#fff',

              lineStyle: {
                color: 'rgba(255, 255, 255, 0.35)',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            },
            data: xName
          },
          yAxis: {
            type: 'value',
            nameLocation: 'end', // 轴名称相对位置value
            // offset: 5, // x轴相对于默认位置的偏移
            nameTextStyle: {
              // 坐标轴名称样式
              color: 'rgba(255, 255, 255, 0.8)',
              padding: [0, 0, 10, -40] // 坐标轴名称相对位置
            },
            nameGap: 5, // 坐标轴名称与轴线之间的距离
            axisLabel: {
              show: false,
              verticalAlign: 'middle',
              color: 'rgba(255, 255, 255, 0.8)'
              // fontSize: '12'
            },
            axisLine: {
              show: false,
              color: '#fff'
            },
            splitLine: {
              // gird区域中的分割线
              show: true, // 是否显示
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.05)',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            }
          },
          series: [
            {
              name: '可复用',
              type: 'line',
              lineStyle: lineStyle,
              label: {
                show: true,
                position: 'top',
                color: '#fff'
              },
              data: compoundInterestNum
            },
            {
              name: '定制化',
              type: 'line',
              lineStyle: lineStyle,
              label: {
                show: true,
                position: 'top',
                color: '#fff'
              },
              data: costUnitNum
            },
            {
              name: '未评审',
              type: 'line',
              lineStyle: lineStyle,
              label: {
                show: true,
                position: 'top',
                color: '#fff'
              },
              data: overstockNum
            }
          ]
        }

        $classfiyBox.showLoading({
          text: '加载中',
          color: 'rgba(145,213,255,0.85)', // 设置转圈圈字体颜色
          textColor: 'rgba(145,213,255,0.85)', // 设置文字字体颜色
          maskColor: 'rgba(36, 102, 175, 0.05)',
          zlevel: 0
        })
        $classfiyBox.setOption({}, true)
        $classfiyBox.setOption(option, true)
        $classfiyBox.hideLoading()
      })
      const lineStyle = {
        width: 2,
        type: 'dashed'
      }

      // 自动渲染this.$echarts
      window.addEventListener('resize', () => {
        $classfiyBox.resize()
      })
    },
    async initIncrementBox() {
      const $incrementBox = this.$echarts.init(
        document.getElementById('incrementBox')
      )
      // fetch_GET('right3', {}, function(res) {
      getData('right3').then((res) => {
        const typeAndYList = res.typeAndYList
        let xName = []
        const yValueData = []
        for (const key in typeAndYList) {
          if (Object.hasOwnProperty.call(typeAndYList, key)) {
            const element = typeAndYList[key]
            // xName.push(key)
            const dataY = []
            element.forEach((ele) => {
              if (ele) {
                dataY.push(ele.opportunity_num)
              } else {
                dataY.push(0)
              }
            })
            yValueData.push({
              name: key,
              type: 'line',
              symbol: 'none',
              endLabel: {
                show: true,
                color: 'inherit', // inherit 同色系
                formatter: function(params) {
                  return params.seriesName
                }
              },
              labelLine: {
                show: true
              },
              labelLayout: {
                moveOverlap: 'shiftY' // 设置这个配置项之后标签不在重叠
              },
              data: dataY
            })
          }
        }
        xName = res.x.map((item) => item.slice(0, 4) + '-' + item.slice(4, 6))
        const option = {
          grid: {
            left: '5%',
            right: '25%',
            bottom: '5%',
            top: '10%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              // type: 'cross' // 十字线显示
            }
          },
          xAxis: {
            type: 'category',
            // name: '时间', // 轴名称
            boundaryGap: false,
            axisLabel: {
              verticalAlign: 'middle',
              margin: 20,
              color: 'rgba(255, 255, 255, 0.8)'
            },
            axisLine: {
              show: true,
              // color: '#fff',
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.35)',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            },
            data: xName
          },
          yAxis: {
            type: 'value',
            nameLocation: 'end', // 轴名称相对位置value
            offset: 5, // x轴相对于默认位置的偏移
            nameTextStyle: {
              // 坐标轴名称样式
              color: 'rgba(255, 255, 255, 0.8)',
              padding: [0, 0, 10, -40] // 坐标轴名称相对位置
            },
            nameGap: 5, // 坐标轴名称与轴线之间的距离
            axisLabel: {
              verticalAlign: 'middle',
              color: 'rgba(255, 255, 255, 0.8)'
              // fontSize: '12'
            },
            axisLine: {
              show: false,
              color: '#fff'
            },
            splitLine: {
              // gird区域中的分割线
              show: true, // 是否显示
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.05)',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            }
          },
          series: yValueData
        }
        $incrementBox.setOption({}, true)
        $incrementBox.setOption(option, true)
      })
      window.addEventListener('resize', () => {
        $incrementBox.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
$borderColor: #999;
$blueColor: #7fc9fb;
$width: (1 / 1920 * 100vw);
$height: (1 / 1080 * 100vh);
// @media screen and (max-width:1440px){
//   $width: (1 / 1366 * 100vw);
//   $height: (1 / 768 * 100vh);
// }
.sell-swiper {
  height: calc(100% - 30 * #{$height}) !important;
  margin-top: 20 * $height;

  .swiper-container {
    width: 100%;
    height: calc(100% - 40 * #{$height}) !important;
    margin-top: 10 * $height;
    font-size: 12 * $width;
  }

  .swiper-slide {
    height: auto !important;
    display: flex;
    align-items: center;
    font-size: 12 * $width;
    padding-bottom: 10px;
    padding-top: 3px;
  }

  dl {
    display: flex;
    width: 100%;
    font-size: 12 * $width;
    dt {
      color: #7fc9fb;
      font-size: 12 * $width;
      &:nth-child(3) {
        color: #3aa0ff;
        text-align: right;
        padding: 0 10 * $width 0 0;
      }

      &:nth-child(4) {
        color: #00fde8;
        padding: 0 0 0 10 * $width;
      }
    }

    dd {
      &:nth-child(2) {
        text-align: center;
      }

      &:nth-child(3) {
        padding: 0 5 * $width 0 0;
        // border-left: 1px solid;
      }
      &:nth-child(4) {
        position: relative;
        padding: 0 10 * $width 0 5 * $width;

        span {
          text-align: right;
        }
      }

      &:nth-child(5) {
        padding: 0 0 0 10 * $width;
        span {
          // text-align: right;
        }
      }
    }

    dt,
    dd {
      &:nth-child(1),
      &:nth-child(2) {
        width: 20%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5) {
        width: 20%;
        box-sizing: border-box;
      }

      span {
        display: block;
        margin-bottom: 5px;
      }
    }
  }
}

.import-swiper {
  height: calc(100% - 40 * #{$height}) !important;
  margin-top: 10 * $height;
  .swiper-container {
    width: 100%;
    height: 100% !important;
    font-size: 12 * $width;
    margin-top: 10px;
  }

  .swiper-slide {
    height: auto !important;
    display: flex;
    align-items: center;
    font-size: 12 * $width;
    padding-bottom: 10px;
  }

  dl {
    display: flex;
    width: 100%;
    font-size: 12 * $width;
    dt {
      color: #7fc9fb;
    }
    dd {
      padding: 5px 0;
    }
    dt,
    dd {
      width: 20%;
      box-sizing: border-box;
      // border: 1px solid;

      &:nth-child(1),
      &:nth-child(2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5) {
        text-align: center;
      }
    }
  }
}
.import {
  &_item {
    display: flex;
    width: 100%;
    height: 100%;
    border: 1px solid;

    .import_left {
      width: 106 * $width;
      height: 54 * $height;
      font-size: 12 * $width;
      padding: 4 * $height 0 0 5 * $width;
    }

    .swiper-container {
      width: 100%;
      font-size: 12 * $width;
      margin-left: 20px;
    }

    .swiper-slide {
      height: auto !important;
      display: flex;
      align-items: center;
      font-size: 12 * $width;
    }
    dl {
      display: flex;
      justify-content: space-between;
      width: 100%;
      dd {
        &:nth-child(1) {
          width: calc(50% - 60 *#{$width});
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:nth-child(2) {
          width: calc(50% - 45 *#{$width});
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:nth-child(3) {
          width: 90 * $width;
          text-align: right;
        }
      }
    }

    .market-icon {
      background: url(~@/assets/img/drsc.png) no-repeat top left;
      background-size: contain;
    }

    .customerService-icon {
      background: url(~@/assets/img/drjf.png) no-repeat top left;
      background-size: contain;
    }

    .deliver-icon {
      background: url(~@/assets/img/drkf.png) no-repeat top left;
      background-size: contain;
    }
  }

  &_box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 40 * #{$height});
    margin-top: 20 * $height;
  }
}
.maptooltip_box {
  width: 155px;
  height: 126px;
  background: rgba(#07123a, 0.5) url(~@/assets/img/tooltip.png) no-repeat center;
  background-size: contain;
  font-size: 12 * $width;
  padding: 5px 0;
  h4 {
    color: #7fc9fb;
    font-size: 14 * $width;
    padding: 2px 5px;
  }
  .maptooltip_cont {
    // margin-top: 10px;
    p {
      line-height: 25px;
      padding: 2px 6px;
      color: #ffffff;
      &:nth-child(2n-1) {
        background-color: rgba(32, 124, 254, 0.15);
      }
    }
  }
}
</style>
