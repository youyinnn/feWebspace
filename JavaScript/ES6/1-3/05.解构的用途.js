// 1、交换变量
let x = 1
let y = 2; // 禁止使用令人困惑的多行表达式 (no-unexpected-multiline) 所以这里加个分号
[x, y] = [y, x]

console.log(x)
console.log(y)

// 2、从函数返回多个值
function ex () {
  return [11, 22, 33]
}
var [a, b, c] = ex()
console.log(b)

// 3、函数参数定义
// 有序
function f ([x, y, z]) {
  return x + y + z
}
console.log(f([1, 3, 4]))
// 无序
function aa ({x, y, z}) {
  return x + y + z
}
console.log(aa({x: 1, z: 'aaa', y: 4}))

// 4、提取JSON
let jsonData = {
  id: 42,
  status: 'ok',
  data: [222, 321]
}
let {id, status, data: number} = jsonData
console.log(id, status, number)

// 5、遍历Map
var map = new Map()
map.set('one', 'hello')
map.set('two', 'world')

for (let [key, val] of map) {
  console.log(key + ' is ' + val)
}
