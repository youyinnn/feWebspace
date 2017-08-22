/*
  es6允许按照一定的模式，从数组和对象中提取值，对变量进行赋值，这被成为解构
*/
// 以前的变量赋值是这样的
var a = 1
var b = 2
var c = 3

// es6中可以这样写
var [d, e, f] = [1, 2, 3]

// 本质上 这种写法属于模式匹配 只要等号两边的模式对上了 左边的变量就会被对应赋值 下面是一些栗子
let [foo, [[bar], baz]] = [1, [[2], 3]]

/*
  如果解析不成功 则变量的值等于undefined
  如果等号右边不等于数组的话（准确来说 不是可遍历的结构 即具备Iterator接口）那就会报错
  解构赋值不仅适用于var 也适用于let和const 对于set也可以使用数组的解构赋值

  事实上 只要某种数据结构具有Iterator接口 就都可以采用解构赋值
*/
let [x, y, z] = new Set(['a', 'b', 'c'])

// 解构赋值允许默认值
var [fff = true] = []
var [aaa = 'aaa'] = []

/*
  需要注意的是 es6严格使用===来判断一个变量是否有值
  所以一个数组成员如果不严格等于undefined 那么默认值不会生效
*/
var [h = 1] = [undefined] // 生效
var [zz = 1] = [null] // 不生效

// 默认值可以引用其他已经声明过的变量
let [r = 1, u = r] = []
