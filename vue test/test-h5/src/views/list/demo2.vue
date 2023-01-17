<template>
  <div>
    <ul>
      <li
        v-for="item in list"
        :key="item"
        :data-src="item"
      >{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      treeList: [
        {
          id: 1,
          pid: null,
          label: '一级',
          value: '1',
          flag: true,
          children: [
            {
              id: 2,
              pid: 1,
              label: '二级1',
              value: '2.1',
              flag: false,
              children: []
            },
            {
              id: 3,
              pid: 1,
              label: '二级2',
              value: '2.2',
              flag: true,
              children: []
            },
            {
              id: 4,
              pid: 1,
              label: '二级3',
              value: '2.3',
              flag: true,
              children: [
                {
                  id: 5,
                  pid: 4,
                  label: '三级1',
                  value: '3.1',
                  flag: true,
                  children: []
                },
                {
                  id: 6,
                  pid: 4,
                  label: '三级2',
                  value: '3.2',
                  flag: true,
                  children: []
                }
              ]
            }
          ]
        }
      ]

    }
  },
  created() {
    this.list = Array.from({ length: 600 }, (v, i) => i)
    console.log('this.list', this.list)
  },
  mounted() {
    const that = this
    window.addEventListener('scroll', function() {
      console.log('1')
      that.lazyload()
    })
    const newList = []
    console.log('扁平化前：', this.treeList)
    this.treeTranslate(this.treeList, newList)
    console.log('扁平化后：', newList)

    // 反扁平化
    this.toTree(JSON.parse(JSON.stringify(newList)))
  },
  methods: {
    lazyload() {
      const imgs = document.getElementsByTagName('li')
      const len = imgs.length
      // 视口的高度
      const viewHeight = document.documentElement.clientHeight
      // 滚动条高度
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop
      console.log('scrollHeight', scrollHeight)
      for (let i = 0; i < len; i++) {
        const offsetHeight = imgs[i].offsetTop
        if (offsetHeight < viewHeight + scrollHeight) {
          const src = imgs[i].dataset.src
          imgs[i].src = src
        }
      }
    },

    /**
   *将 tree 数据扁平化
   * @param tree 需要被扁平化的具有层级结构的 tree 数据
   * @param newList 接收扁平数据的数组
   */
    treeTranslate(tree, newList) {
    // （tips：Mozilla上关于递归的这个术语，解释说一个递归函数可以接受两个输入参数：一个最终状态（终止递归）或一个递归状态（继续递归）。）
    // 从两个入参的角度看，newList.length>10000 为真可以理解为“最终状态”。
    // 这个条件设置无关业务，是出于极限保护设置的，可不设。因为假设这个 tree 数据扁平化后不可能超过 100000，
    // 一旦超过说明出错了，所以做出了这个极限保护条件。
      if (newList.length > 100000) {
        return
      }

      tree.map(e => {
        newList.push(e)

        // 自己调用自己，条件是 e.children.length 为真
        // 从两个入参的角度看，e.children.length 为真可以理解为“递归状态”。
        if (e.children && e.children.length) {
          this.treeTranslate(e.children, newList)
        }
      })
    },

    /**
   * 反扁平化：将扁平数据转换为 tree 数据
   * @param list 扁平数据
   */
    toTree(list) {
      const tree = []
      list.map(e => {
      // 以 e.pid===null,作为判断是否根节点的依据，或者直接写死根节点（如果确定的话），
      // 具体以什么为根节点的依据得看数据的设计规则，通常是判断层级或是否根节点的标记
        if (e.pid === null) {
          tree.push(e)
        }

        list.map(e2 => {
          if (e2.pid === e.id) {
          // 避免出现重复数据
            const index = e.children.findIndex(sub => sub.id === e2.id)
            if (index === -1) {
              e.children.push(e2)
            }
          }
        })
      })

      console.log('反扁平化后：', tree)
    }
  }
}
</script>

<style lang="scss" scoped>
li{
  padding: 20px;
  font-size: 30px;
  border-bottom: 1px solid #ddd;
}
</style>
