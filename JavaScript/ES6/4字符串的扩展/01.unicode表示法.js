/*
  js允许使用\uxxxx的形式表示一个字符串
  其中xxxx表示unicode的码点

  但是这种表示法只限于码点在\u0000~\uFFFF之间的字符
  超出这个范围的字符就必须使用两个双字节的形式表示
*/
var a = '\u0061'
console.log(a)
var b = '\uD842\uDFB7'
console.log(b)

/*
  上面代码表示，如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7）
  JavaScript会理解成\u20BB+7 由于\u20BB是一个不可打印字符
  所以只会显示一个空格 后面跟着一个7
*/
var c = '\u20BB7'
console.log(c)

/*
  es6对这做出了改进 只要将码点放入大括号内 就能正确解析该字符
*/
var d = '\u{20BB7}' // 和'\uD842\uDFB7'一样
console.log(d)
