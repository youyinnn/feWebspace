/*
  es6允许使用（=>）定义函数
*/
var f1 = v => v
// 等同于
var f2 = function (vv) {
  return vv
}

// 如果箭头函数不需要参数或者需要多个参数 那么就使用圆括号代表参数部分
var f3 = () => 5
var f4 = function () { return 5 }

var f5 = (x, y) => x + y
var f6 = function (x, y) { return x + y }

// 如果箭头函数的代码块部分多于一条语句 就得使用大括号括起来 并且使用return返回
var f7 = (x, y) => { x++; return x + y }

// 如果箭头函数直接返回一个对象 那么这个对象必须加圆括号
var f8 = id => ({ id: id, name: 'temp' })
console.log(f8())

// 箭头函数可以和变量解构一起使用
const full = ({first, last}) => first + ' ' + last

function full2 (person) {
  return person.first + ' ' + person.last
}
var Person = function (first, last) {
  this.first = first
  this.last = last
}
var p1 = new Person('H', 'J')
console.log(full(p1))
console.log(full2(p1))
