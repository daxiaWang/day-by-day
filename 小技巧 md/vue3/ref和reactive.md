



> #### ref
>
> 在setup中使用，接收一个内部值并返回一个响应式且可变的ref对象。**定义一个基本类型的响应式数据**
>
> ref对象具有指向内部值的单个property    .value
>
> ```javascript
> const count = ref(0)
>
> count
> RefImpl {
>   __v_isRef: true
>   _rawValue: 0
>   _shallow: false
>   _value: 0
>   value: 0
> }
> ```
>
> 



> #### reactive
>
> 在setup中使用，需要声明一个响应式的对象数据时，使用reactive()
>
> reactive()接收一个普通对象，然后返回该普通对象的响应式代理器对象。
> 内部基于ES6的Proxy实现，通过代理对象操作源对象，内部数据都是响应式的。
>
> 







> #### reactive和ref的关系
>
> - 都是Vue3组合API中2个最重要的响应式API
> - ref用来处理基本类型数据，reactive用来处理对象（递归深度响应式）
> - 如果用ref处理对象或数组，内部会自动将对象/数组转换为reactive的代理对象
> - ref内部：通过给value属性添加getter/setter来实现对数据的劫持
> - reactive内部：通过使用proxy来实现对对象内部所有数据的劫持，并通过Reflect反射操作对象内部数据
> - ref的数据操作：在js中使用ref对象.value获取数据，在模板中可直接使用
>
> 1

https://segmentfault.com/a/1190000039864464

https://v3.cn.vuejs.org/api/basic-reactivity.html