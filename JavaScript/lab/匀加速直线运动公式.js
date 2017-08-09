var v0 = 1 // px/ms
var endx = 500 // px
var a = 5 // px/ms^2
var t = 0 // ms
// 11的模式下大概可以走740~860步 步数和输出语句的多少以及耗时没关系
// 多一个输出耗时就翻一倍
var timer = setTimeout(function start () {
  clearTimeout(timer)
  t++
  // 匀加速直线运动公式
  var x = v0 * t + (a * Math.pow(t, 2)) * 0.5
  if (x > 500) {
    x = 500
  }
  console.log(x)
  timer = setTimeout(start, 1)
  if (x === endx) {
    clearTimeout(timer)
  }
}, 1)

// // 设定1秒终止程序执行
// setTimeout(function kill () {
//   clearTimeout(timer)
// }, 1000)
