/*
  使用回调函数的套路写Ajax
*/
var xmlhttp

var getReq = function (url, func) {
  ajaxReq(url, func, 'GET', null, null)
}

var postReq = function (url, func, form) {
  ajaxReq(url, func, 'POST', form)
}

var ajaxReq = function (url, func, method, form) {
  xmlhttp = new XMLHttpRequest()
  xmlhttp.open(method, url)

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      func()
    }
  }

  xmlhttp.send(form)
}
