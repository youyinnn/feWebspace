/*
  forEach
  forEach方法中的function回调支持3个参数
  由以下的打印结果知 分别是
    1、数组元素的内容
    2、数组元素当前索引
    3、数组本身

  因此我们有
  [].forEach(function(value, index, array){
    ...
  })
*/
[1, 2, 3, 4].forEach(console.log)
// 1 0 [ 1, 2, 3, 4 ]
// 2 1 [ 1, 2, 3, 4 ]
// 3 2 [ 1, 2, 3, 4 ]
// 4 3 [ 1, 2, 3, 4 ]
