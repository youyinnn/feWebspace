/*
  函数参数也可以使用解构赋值
*/
function add ([x, y]) {
  return x + y
}

console.log(add([1, 2]))

// 也可以使用默认值
function move ({x = 0, y = 0}) {
  return [x, y]
}

console.log(move({x: 3, y: 4}))
console.log(move({x: 3}))
