/*
  es6支持引入rest参数 即形式为：...变量名
  用于获取函数多余的参数 这样就不需要使用arguments对象了
  rest参数搭配的变量是一个数组 该变量将多余的参数放进数组里面
*/
function add (...args) {
  let sum = 0

  for (var val of args) {
    sum += val
  }

  console.log(sum)
}

add(3, 4, 5)
