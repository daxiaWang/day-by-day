<template>
  <div>

    <p> {{ getRate(2) }} </p>
  </div>
</template>

<script>
// import { useRefHistory } from '@vueuse/core'
export default {
  data() {
    return {
      text: '',
      history: [],
      info: {
        a: 'a',
        b: 'b',
        c1: 'c'
      }
    }
  },
  mounted() {
    // this.init()
    // this.undo()
    // this.redo()
    // this.link()
    // this.nullFn()
    // this.numberFn()
    this.test()
  },
  methods: {
    getRate(rate = 0) {
      return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
    },
    init() {
      const { a, b } = this.info
      console.log('a,b', a, b)
      const { c1: c } = this.info
      console.log('c', c)
    },
    undo() {
      const a = [1, 2, 3]
      const b = [1, 5, 6]
      const c = [...new Set([...a, ...b])]// [1,2,3,5,6]

      console.log('c', c)

      const obj1 = {
        a: 1
      }
      const obj2 = {
        b: 1
      }
      const obj = { ...obj1, ...obj2 }// {a:1,b:1}
      console.log('obj', obj)
    },
    redo() {
      const deps = {
        '采购部': [1, 2, 3],
        '人事部': [5, 8, 12],
        '行政部': [5, 14, 79],
        '运输部': [3, 64, 105]
      }
      const depsV = Object.values(deps)
      console.log('depsV', depsV)
      const member = Object.values(deps).flat(Infinity)
      console.log('member', [...new Set(member)])

      const objArr = [
        [
          { name: 'wang', age: 12 },
          { name: 'zhang', age: 22 },
          { name: 'li', age: 32 }
        ],
        [
          { name: 'wang1', age: 12 },
          { name: 'zhang1', age: 22 },
          { name: 'li1', age: 32 }
        ]
      ]

      console.log('objArr', objArr.flat(Infinity))
    },
    link() {
      // const name = this.info1.name
      // console.log('name', name)   //"TypeError: Cannot read property 'name' of undefined"

      const name1 = this.info1 && this.info1.name
      console.log('name1', name1)

      /**
       * ES6中的可选链操作符   ?.
       * ?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为空(nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。
       *
       *  obj?.prop
          obj?.[expr]
          arr?.[index]
          func?.(args)

       * */

      const name2 = this.info1?.name
      console.log('name2', name2)

      console.log('fun', this.info.method ?.())

      const adventurer = {
        name: 'Alice',
        cat: {
          name: 'Dinah'
        }
      }

      const dogName = adventurer.dog?.name
      console.log(dogName)
      // expected output: undefined

      console.log(adventurer.someNonExistentMethod?.())
      // expected output: undefined

      // if (onError) { // 校验onError是否真的存在
      //   onError(err.message)
      // }

      // onError?.(err.messaage)
      const nestedPropObj = {
        prop: 'lllll',
        Name: 'wwwwww',
        propName: 'qqqqqqqqqqqqqq'
      }
      const nestedProp = nestedPropObj?.['prop' + 'Name']
      console.log('nestedProp', nestedProp) // qqqqqqqqqqqqqq

      const arr = [1, 2, 3, 4, 5, 42]
      const arrayItem = arr?.[2]
      console.log('arrayItem', arrayItem) // 3

      const customer = {
        name: 'Carl',
        details: { age: 82 }
        // city: 'city'
      }
      const customerCity = customer?.city ?? '暗之城'
      console.log(customerCity) // “暗之城”
    },
    nullFn() {
      /**
       * ??   空值合并运算符  是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
       *
       *
       * 使用空值合并操作符为常量提供默认值，保证常量不为 null 或者 undefined。
       *
       * ||   逻辑或操作符  会在左侧操作数为假值时返回右侧操作数
      */
      // if ((value ?? '') !== '') {
      //   // ...
      // }

      const obj = null
      console.log('nullFn', obj ?? 'aaaaaa') // aaaaaa
      const obj1 = {}
      console.log('nullFn1', obj1 ?? 'aaaaaa') // {}
    },
    numberFn() {
      // (5).add(6).minus(2)
      Number.prototype.add = function(n) {
        return this + n
      }
      Number.prototype.minus = function(n) {
        return this - n
      }

      console.log('numberFn', (5).add(6).minus(2))
    },
    test() {
      function A() { console.log('函数 A 被调用了'); return undefined }
      function B() { console.log('函数 B 被调用了'); return false }
      function C() { console.log('函数 C 被调用了'); return 'foo' }

      console.log(A() ?? C())
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
