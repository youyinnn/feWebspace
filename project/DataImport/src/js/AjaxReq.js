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
  xmlhttp = createCORS(method, url)
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 0) {
      msgPanelShow(p2, '错误', '服务器未启动', null, null)
      return 0
    }
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      if (func !== null) {
        func()
      }
    }
  }

  xmlhttp.send(form)
}

function createCORS (method, url) {
  var xhr = new XMLHttpRequest()
  if ('withCredentials' in xhr) {
    xhr.open(method, url, true)
  } else if (typeof XDomainRequest !== 'undefined') {
    xhr = new XDomainRequest()
    xhr.open(method, url)
  } else {
    xhr = null
  }
  return xhr
}
