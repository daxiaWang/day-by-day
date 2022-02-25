1. **遍历**：指的对数据结构的每一个成员进行有规律的且为一次访问的行为。
2. **迭代**：迭代是递归的一种特殊形式，是迭代器提供的一种方法，默认情况下是按照一定顺序**逐个**访问数据结构成员。迭代也是一种遍历行为。
3. **可迭代对象**：ES6中引入了 `iterable` 类型，`Array` `Set` `Map` `String` `arguments` `NodeList` 都属于 `iterable`，他们特点就是都拥有 `[Symbol.iterator]` 方法，包含他的对象被认为是可迭代的 `iterable`。

### for 循环、forEach、map 的性能区别

#### 性能比较：for > forEach > map

在 chrome 62 和 Node.js v9.1.0 环境下：for 循环比 forEach 快 1 倍，forEach 比 map 快 20%左右。
##### 原因分析
1. for：js，for 循环没有额外的函数调用栈和上下文，所以它的实现最为简单,可以控制循环起点。
2. forEach：是一个迭代器，负责遍历可迭代对象。对于 forEach 来说，它的函数签名中包含了参数和上下文，所以性能会低于 for 循环。不能使用break中断循环，不能使用return返回到外层函数。
3. map：map 最慢的原因是因为 map 会返回一个新的数组，数组的创建和赋值会导致分配内存空间，因此会带来较大的性能开销。如果将 map 嵌套在一个循环中，便会带来更多不必要的内存消耗。可以使用break中断循环，可以使用return返回到外层函数.
4. for in：ES5，用于循环遍历数组或对象属性
5. for of：ES6，（可遍历map，object,array,set string等）用来遍历数据，比如组中的值。避免了for in的所有缺点，可以使用break,continue和return，不仅支持数组的遍历，还可以遍历类似数组的对象。

**当大家使用迭代器遍历一个数组时，如果不需要返回一个新数组却使用 map 是违背设计初衷的。在我前端合作开发时见过很多人只是为了遍历数组而用 map 的**：


```javascript
let data = [];
let data2 = [1,2,3];
data2.map(item=>data.push(item));
```