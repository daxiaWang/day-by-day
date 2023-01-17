<template>
  <div>
    <!-- 视口 -->
    <div ref="months" class="nut-calendar-content" @scroll="mothsViewScroll">
      <!-- 整体容器-设置一个总体高度用以撑起视口 -->
      <div ref="monthsPanel" class="calendar-months-panel">
        <!-- 月份容器 -->
        <div
          ref="viewArea"
          class="viewArea"
          :style="{ transform: `translateY(${translateY}px)` }"
        >
          <div
            v-for="(month, index) of compConthsData"
            :key="index"
            class="calendar-month"
          >
            <div class="calendar-month-title">{{ month.title }}</div>
            <div class="calendar-month-con">
              <div
                class="calendar-month-item"
                :class="type === 'range' ? 'month-item-range' : ''"
              >
                <div v-for="(day, i) of month.monthData" :key="i">
                  <div
                    class="calendar-month-day"
                    :class="getClass(day, month)"
                    @click="chooseDay(day, month)"
                  >
                    <!-- 日期显示slot -->
                    <div class="calendar-day">
                      <slot name="day" :date="day.type == 'curr' ? day : ''">
                        {{ day.type == 'curr' ? day.day : '' }}
                      </slot>
                    </div>
                    <div
                      v-if="!bottomInfo && showToday && isCurrDay(day)"
                      class="calendar-curr-tip-curr"
                    >
                      今天
                    </div>
                    <div
                      v-if="isStartTip(day, month)"
                      class="calendar-day-tip"
                      :class="{
                        'calendar-curr-tips-top': rangeTip(day, month),
                      }"
                    >
                      {{ startText }}
                    </div>
                    <div v-if="isEndTip(day, month)" class="calendar-day-tip">
                      {{ endText }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 获取单个月的日期与状态
      const getDaysStatus = (currMonthDays, dateInfo) => {
        const { year, month } = dateInfo
        return Array.from(Array(currMonthDays), (v, k) => {
          return {
            day: k + 1,
            type: 'curr',
            year,
            month
          }
        })
        // 获取上一个月的最后一周天数，填充当月空白
        const getPreDaysStatus = (preCurrMonthDays, weekNum, dateInfo) => {
          const { year, month } = dateInfo
          if (weekNum >= 7) {
            weekNum -= 7
          }
          const months = Array.from(Array(preCurrMonthDays), (v, k) => {
            return {
              day: k + 1,
              type: 'prev',
              year,
              month
            }
          })
          return months.slice(preCurrMonthDays - weekNum)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
