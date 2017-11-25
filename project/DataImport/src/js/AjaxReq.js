/*
  使用回调函数的套路写Ajax
*/
var xmlhttp

var getReq = function () {
  ajaxReq(null, null)
}

var postReq = function (func, form) {
  ajaxReq(func, form)
}

var ajaxReq = function (func, form) {
  // xmlhttp = createCORS(method, url)
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 0) {
      if (hasClass(p2, 'hidePanel')) {
        msgPanelShow(p2, '错误', '服务器未启动', null, null)
      } else {
        pexit2Retry()
      }
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
  xmlhttp = xhr
}

function openPost (url) {
  createCORS('POST', url)
}

function openGet (url) {
  createCORS('GET', url)
}
