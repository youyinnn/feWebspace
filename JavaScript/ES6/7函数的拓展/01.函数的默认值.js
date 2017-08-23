/*
  es6之前 不能之间为函数的参数指定默认值 只能采用变通的方法
*/
function log (x, y) {
  y = y || 'World'
  console.log(x, y)
}
log('Hello')
log('Hello', 'JavaScript')
log('Hello', '')
/*
  上面这样的写法的缺点在域 如果y赋值了 但是对应的布尔值为false（比如''）
  则该赋值不起作用 还是会使用默认值‘world’
  我们希望的是 如果写入‘’ 我们不希望y被赋上任何值
  我们可以做以下修改
*/
function log2 (x, y) {
  if (y === undefined) {
    y = 'World'
  }
  console.log(x, y)
}
log2('Hello', 'Java')
log2('Hello', '')

/*
  然而 在es6里 我们可以直接给参数设置默认值
  可以看到 这样的写法比上面的写法更加自然
*/
function log3 (x, y = 'World') {
  console.log(x, y)
}
log3('Hello', 'China')
log3('Hello', '')

// 我们还可以这样使用
function A (x = 0, y = 0) {
  this.x = x
  this.y = y
}
var a = new A()
console.log(a)

/*
  需要注意的是 函数的变量是默认声明的 所以不能在函数内使用let和const再次去声明
  另外一个需要注意的是 参数默认值不是传值的 而是每次都重新技术俺默认值表达式
  也就是说 参数默认值是惰性求值的
*/
let x = 99
function foo (p = x + 1) {
  console.log(p)
}

foo() // 100
x = 100
foo() // 100

// 上面的代码显示 每次都会使用x去计算x+1等于p值 而不是p默认等于100

/*
  我们可以将默认值和解构赋值结合使用
*/
function bar ({x, y = 100}) {
  console.log(x, y)
}

bar({x: 2}) // 2, 100
bar({x: 2, y: 3}) // 2, 3
bar({}) // undefined, 100
// bar() 这样就会报错

function bar2 ({x, y = 10} = {}) {
  console.log(x, y)
}
bar2() // 这样就不会报错 我们为整个参数列表都设置了默认值{}

// 我们可以指定某个参数不可省略 否则就抛出一个错误
function throwIfMissing () {
  throw new Error('Missing parameter')
}

function fff (mustBeProvided = throwIfMissing()) {
  return mustBeProvided
}
// fff() 就会报错
// Error: Missing parameter
//     at throwIfMissing (D:\Users\bigyellow\feWebspace\JavaScript\ES6\7函数的拓展\01.函数的默认值.js:79:9)
//     at fff (D:\Users\bigyellow\feWebspace\JavaScript\ES6\7函数的拓展\01.函数的默认值.js:82:32)
//     at Object.<anonymous> (D:\Users\bigyellow\feWebspace\JavaScript\ES6\7函数的拓展\01.函数的默认值.js:85:1)
//     ...
