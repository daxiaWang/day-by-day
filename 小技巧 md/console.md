1.使用 ES6 解构输出变量名称

const x = 42;

console.log('variableX:', variableX);
// or
console.log(`variableX: ${ variableX }`);

/*
output:
variableX: 42
*/

或
console.log({ variableX });

/*
output:
{ variableX: 42 }
*/

2.日志消息类型
console.log('no-frills log message');
console.info('this is an information message');
console.warn('I warned you this could happen!');
console.error('I\'m sorry Dave, I\'m afraid I can\'t do that');
console.debug('nothing to see here - please move along');
console.dir( obj ) 在 JavaScript 对象中显示属性的交互式列表
console.dirxml( element ) 显示来自指定 HTML 或 XML 节点的后代元素的交互式树
console.clear() 清除控制台中所有以前的消息。

const obj = {
  propA: 1,
  propB: 2,
  propC: 3
};
const arr = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 },
    { a: 7, b: 8, c: 9 }
  ];
console.table( obj );


3.使用类似测试的断言
console.assert() 当条件失败时，可以使用类似 test 的命令来输出消息

console.assert(
  life === 42,
  'life is expected to be',
  42,
  'but is set to',
  life
);
console.assert(
  life === 42,
  'life is expected to be %s but is set to %s',
  42,
  life
);

4.输出构成当前执行点的所有函数调用的日志  console.trace()

5.组日志消息
console.group( label )
console.groupEnd()
console.groupCollapsed( label )










