如果computed中的值要再进行赋值的话，要用get和set



thirdId: {

      get() {

        this.$route.query.thirdId

      },

      set(v) {

        this.thirdIdss = v

      },

    },

#### 只赋值

customerCode() {

      return this.$route.query.customerCode

    },

