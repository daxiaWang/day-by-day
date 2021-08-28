import Vue from 'vue'
// console.log("1")
// Vue.component('button-counter', {
//     data: function() {
//         return {
//             count: 0
//         }
//     },
//     template: '<button @click="handle">点击了{{count}}次</button>',
//     methods: {
//         handle: function() {
//             this.count++
//         }
//     }
// });
// 注册组件【 全局 】
Vue.component('imitate-select', {
    // template: `<div>123s</div>`,
    data: function() { // 给每一个添加一个自己的对象
        return {
            selectShoe: false,
            val: ''
        }
    },
    props: ['h2Value', 'list'], // 这里的名称一定是驼峰式【如：上面是 h2-value（上面可以是烤串或驼峰式） ，下面必须是 h2Value】
    template: `<section class="main">
                    <div class="select">
                    <h2 class="fuzhi">{{ h2Value }}</h2>
                    <div class="select_header">
                        <input type="text" class="select_input" placeholder="模仿Select下拉框" @click="selectShoe = !selectShoe" :value="val" ><i></i>
                    </div>
                    <select-list v-show="selectShoe" :list="list" @receive="changeHandle"></select-list>
                    </div>
                </section>`,
    methods: {
        changeHandle(value) { // 自定义事件
            // alert('我被触发了！值为：' + value)
            this.val = value
        }
    }
});
Vue.component('select-list', {
    props: ['list'],
    template: `<ul class="select_list">
      <li v-for="item of list" @click="selectHandle(item)">{{ item }}</li>
     </ul>`,
    methods: {
        selectHandle: function(item) {
            this.$emit('receive', item)
        }
    }
});