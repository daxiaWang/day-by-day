export default {
  data() {
    return {
      pages: {
        rows: 20,
        page: 1,
        pageCount: 1
      },
      dataList: [],
      loading: false,
      finished: false,
      dataOver: false,
      error: false,
      refreshing: false
    }
  },

  methods: {
    onRefresh() {
      this.finished = true
      this.error = false
      this.loading = true
      this.pages.page = 1
      this.onLoadList()
    },
    onLoadList() {
      this.getList()
    },
    getList() {
      this.finished = true
      this.loadData()
        .then(res => {
          this.dataOver = true
          this.loading = false
          this.refreshing = false
          this.error = false
          this.finished = false
          const { record, total } = res
          if (this.pages.page > 1) {
            this.dataList = this.dataList.concat(record)
          } else {
            this.dataList = record || []
          }
          if (this.dataList.length >= total) {
            this.finished = true
          } else {
            this.pages.page++
          }
        })
        .catch(err => {
          console.log('error=' + err)
          this.dataOver = false
          this.finished = false
          this.loading = false
          this.refreshing = false
          this.error = true
        })
    },
    resetData() {
      this.dataList = []
      this.pages = {
        rows: 50,
        page: 1
      }
      this.loading = true
      this.finished = false
      this.dataOver = false
      this.error = false
      this.refreshing = false
      this.getList()
    }
  }
}
