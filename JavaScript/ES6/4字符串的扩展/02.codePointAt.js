/*
  JavaScript内部，字符以UTF-16的格式存储 每个字符固定为2个字节
  对于那些需要4个字节存储的字符（unicode码点大于0xFFFF）
  JavaScript会认为它们的两个字
*/
var s = '𠮷'

console.log(s.length) // 2
console.log(s.charAt(0)) // �
console.log(s.charAt(1)) // �
console.log(s.charCodeAt(0)) // 55362
console.log(s.charCodeAt(1)) // 57271

/*
  汉字'𠮷'的码点是0x20BB7 UTF-16编码为0xD842 0xDFB7（十进制为55362 57271）
  需要4个字节存储 对于四个字节的字JavaScript不能正常处理 长度判断会误判为2
  而且CharAt方法无法读取整个字符
  CharCodeAt方法只能分别返回前两个字节和后两个字节的值

  es6提供了codePointAt方法 可以正确处理四个字节存储的字符 返回一个字符的码点
*/
var ss = '𠮷a'

console.log(ss.codePointAt(0)) // 134071
console.log(ss.codePointAt(1)) // 57271
console.log(ss.codePointAt(2)) // 97

/*
  JavaScript将'𠮷a'视为三个字符
  codePointAt在识别第一个字符的时候是识别整个'𠮷'字 返回了它的十进制码点134071
  然后第二个字符就会识别为'𠮷'字的后两个字节 这个方法和charPointAt是一样的
  第三个也是一样的

  然后可以使用toString方法将10进制转换为16进制
*/
console.log(ss.codePointAt(0).toString(16)) // 20bb7

// codePointAt方法是测试一个字符是否是四个字符的最简单方法
function is32Bit (c) {
  return c.codePointAt(0) > 0xFFFF
}
console.log(is32Bit('𠮷'))
console.log(is32Bit('a'))
console.log(typeof 0xFFFF)
