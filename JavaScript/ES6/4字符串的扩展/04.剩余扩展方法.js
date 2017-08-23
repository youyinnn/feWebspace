/*
  传统JavaScript只有indexof方法
  可以用来确定一个字符串是否包含在另一个字符串中
  es6又提供了三种方法
    includes()：返回布尔值，表示是否找到了参数字符串。
    startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
    endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
    这三个方法都支持第二个参数，表示开始搜索的位置。
*/
var s = 'Hello World!'
console.log(s.includes('o'))
console.log(s.startsWith('Hell', 1))
console.log(s.endsWith('ld!'))

/*
  repeat方法返回一个新字符串，表示将原字符串重复n次。
*/
console.log('a'.repeat(5))
