export default {
  data() {
    return {
      testMsg: 'testMsg'
    }
  },
  beforeCreate() {
    window.sessionStorage.setItem('mixisBeforeCreate', new Date())
  },
  created() {
    console.log('mixis create')
    window.sessionStorage.setItem('mixisCreate', new Date())
  },
  mounted() {
    this.test()
  },
  methods: {
    test() {
      console.log('mixis mounted test()')
    }
  }
}
