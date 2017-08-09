/* 第一种
 var timer = setTimeout(ss, 1000)

 function ss () {
   console.log('hi')
   setTimeout(ss, 1000)
}
*/

// 第二种
var timer = setTimeout(function a () {
  var i = 0
  while (i++ < 100000000) {}
  console.log('horse')
  timer = setTimeout(a, 1000)
}, 1)

// 设定10秒终止程序执行
setTimeout(function kill () {
  clearTimeout(timer)
}, 10000)
