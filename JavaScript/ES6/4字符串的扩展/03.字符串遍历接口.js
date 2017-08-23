/*
  在es5里面String类提供了fromCharCode方法 用于根据码点返回对应的字符
  但是这个方法无法识别大于0xFFFF码点的字符
  所以es6就提供了fromCodePoint方法 这个方法的作用和codePointAt方法正好相反
  如果这个方法有多个参数 那么就会吧字符串连成一串返回
*/
console.log(String.fromCodePoint(0x78, 0x1f680, 0x79))

/*
  es6为字符串遍历提供了遍历器接口
  使得字符串可以被for..of循环遍历
*/
for (let codePoint of 'foo') {
  console.log(codePoint)
}

/*
  这个遍历器的优点是可以识别大于0xFFFF的码点
  这是传统for循环无法做到的
*/
var s = String.fromCodePoint(0x20BB7)
for (let i = 0; i < s.length; i++) {
  console.log(s[i])
}
for (let i of s) {
  console.log(i)
}
