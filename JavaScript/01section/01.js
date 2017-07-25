// 数组
var arr = Array(4);
var arr = Array();

arr[0] = "hello";
arr[1] = "Java";
arr[2] = "C++";
arr[3] = "php";

var arr = Array("hello", "Java", "C++", "php");

var arr = ["hello", "Java", "C++", "php"];

var arr = [1, "javaScript", true];

var brr = [];

brr[0] = arr;

alert(brr[0][2]);

var a = false;
var b = "";

// ==并表示严格相等
if (a == b)
  alert("a equals b  ==");

// 使用===表示严格相等 !==表示严格不相等
if (a === b) {
  alert("a equals b");
} else {
  alert("a not equals b ===");
}

var count = 1;
while (count < 5) {
  alert(count);
  count++;
}

// 函数名在这里不要和变量名重名
function aaa() {
  var ar = ["a", "b", "c", "d"];
  for (var i = 0; i < ar.length; i++) {
    alert(ar[i]);
  }
  return "aaa的返回值";
}

var c = aaa();

alert("打印：" + c);

var d = new Date();
