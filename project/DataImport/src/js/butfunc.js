var input = document.createElement('input')
input.setAttribute('id', 'uploadFile')
input.setAttribute('type', 'file')
input.setAttribute('value', null)
input.style.display = 'none'

/* global postReq xmlhttp input msgPanelShow p2 */
function upload (maxSise, acceptableFileArr, url, func) {
  input.click()
  input.onchange = function (event) {
    if (!input.value) {
      return 0
    }
    if (maxSise && input.files[0].size > maxSise * 1024 * 1024) {
      console.log(input.files[0].size)
      msgPanelShow(p2, '错误', '请上传小于' + maxSise + 'M的文件！', null, null, null)
      return 0
    }
    var fileType = input.value.split('.').pop()
    if (acceptableFileArr.indexOf(fileType.toLocaleLowerCase()) === -1) {
      msgPanelShow(p2, '错误', '不接受的文件类型' + fileType, null, null, null)
      return 0
    }
    var fd = new FormData()
    fd.append('file', input.files[0])
    fd.append('msg', '你好')

    if (url !== null) {
      postReq(url, func, fd)
    } else {
      func()
    }
  }
}

function sendMapping () {
  let fd = getMappingMsg()
  pexit2.disabled = 'true'
  addClass(pexit2, 'pexitUnable')
  msgPanelShow(p2, '提示', '正在发送映射并等待生成数据库文件...', '请稍等', null, null)
  postReq('http://localhost:8080/mapHandle', function () {
    let respJson = JSON.parse(xmlhttp.responseText)
    if (respJson.code === 'I000') {
      pexit2.disabled = null
      removeClass(pexit2, 'pexitUnable')
      pexit2.innerHTML = '下载'
      p2.childNodes[3].innerHTML = '文件生成成功'
      pexit2.onclick = function () {
        changePanel(p2, 'showPanel', 'hidePanel')
        c2.style.cssText = 'visibility : hidden; opacity: 0;'
        downloadFile(respJson.token)
      }
    } else {
      pexit2Retry()
    }
  }, fd)
}

function downloadFile (token) {
  console.log(token)
  getReq('http://localhost:8080/download?token=' + token, null)
}

function mapping () {
  let respJson = JSON.parse(xmlhttp.responseText)
  let code = respJson.code
  if (code === 'H000') {
    let filemark = respJson.filemark
    let headers = respJson.headers
    createMappingPanel(headers, filemark)
    chackFunctioPanelBut('error')
    let headerslength = headers.length
    let panelheight = 165 + Math.round(headerslength / 2) * 43
    msgPanelShow(p2, '提示', '上传成功', '进入映射', showFunctionPanel, panelheight)
  } else {
    msgPanelShow(p2, '提示', '上传失败', '好的', null, null)
  }
}

function format () {
  let type = input.files[0].name.split('.').pop()
  chackFunctioPanelBut('error')
  createFormatPanel(type)
  if (type === 'sql') {
    functionpaneltitle.innerHTML = 'Format：sql文件转换导出'
    showFunctionPanel(150)
  } else if (type === 'json') {
    functionpaneltitle.innerHTML = 'Format：json文件转换导出'
    showFunctionPanel(190)
  }
}

function transfer () {
  let type = input.files[0].name.split('.').pop()
  chackFunctioPanelBut('error')
  createTransferPanel(type)
  if (type === 'sql') {
    functionpaneltitle.innerHTML = 'MySQL转MongoDB'
    showFunctionPanel(150)
  } else if (type === 'json') {
    functionpaneltitle.innerHTML = 'MongoDB转MySQL'
    showFunctionPanel(190)
  }
}

function transfer2 () {
  let type = input.files[0].name.split('.').pop()
  createTransferPanel2(type)
  if (type === 'csv') {
    functionpaneltitle.innerHTML = 'CSV转其他'
  } else if (type === 'xls') {
    functionpaneltitle.innerHTML = 'XLS转其他'
  } else if (type === 'xlsx') {
    functionpaneltitle.innerHTML = 'XLSX转其他'
  }
  functionbut.onclick = sendTransfer2
  showFunctionPanel(150)
}

function sendTransfer2 () {
  let fd = getTransfer2Msg()
  pexit2.disabled = 'true'
  addClass(pexit2, 'pexitUnable')
  msgPanelShow(p2, '提示', '正在发送映射并等待生成数据库文件...', '请稍等', null, null)
  postReq('http://localhost:8080/transfer2Handle', function () {
    let respJson = JSON.parse(xmlhttp.responseText)
    if (respJson.code === 'F000') {
      pexit2.disabled = null
      removeClass(pexit2, 'pexitUnable')
      pexit2.innerHTML = '下载'
      p2.childNodes[3].innerHTML = '文件生成成功'
      pexit2.onclick = function () {
        changePanel(p2, 'showPanel', 'hidePanel')
        c2.style.cssText = 'visibility : hidden; opacity: 0;'
        downloadFile(respJson.token)
      }
    } else {
      pexit2Retry()
    }
  }, fd)
}

function sendTransfer () {
  let columnNum = document.getElementById('columnNum')
  if (columnNum !== null) {
    if (columnNum.value === '0') {
      addClass(functionbut, 'errorbut')
      functionbut.innerHTML = 'MongoDB数据必须填入你要导出的字段名'
      functionbut.onclick = null
      return
    }
  }
  let fd = getTransferMsg()
  pexit2.disabled = 'true'
  addClass(pexit2, 'pexitUnable')
  msgPanelShow(p2, '提示', '正在发送映射并等待生成数据库文件...', '请稍等', null, null)
  postReq('http://localhost:8080/transferHandle', function () {
    let respJson = JSON.parse(xmlhttp.responseText)
    if (respJson.code === 'C000') {
      pexit2.disabled = null
      removeClass(pexit2, 'pexitUnable')
      pexit2.innerHTML = '下载'
      p2.childNodes[3].innerHTML = '文件生成成功'
      pexit2.onclick = function () {
        changePanel(p2, 'showPanel', 'hidePanel')
        c2.style.cssText = 'visibility : hidden; opacity: 0;'
        downloadFile(respJson.token)
      }
    } else {
      pexit2Retry()
    }
  }, fd)
}

function sendFormat () {
  let columnNum = document.getElementById('columnNum')
  if (columnNum !== null) {
    if (columnNum.value === '0') {
      addClass(functionbut, 'errorbut')
      functionbut.innerHTML = 'MongoDB数据必须填入你要导出的字段名'
      functionbut.onclick = null
      return
    }
  }
  let fd = getFormatMsg()
  pexit2.disabled = 'true'
  addClass(pexit2, 'pexitUnable')
  msgPanelShow(p2, '提示', '正在发送数据库文件并生成目标文件...', '请稍等', null, null)
  postReq('http://localhost:8080/formatHandle', function () {
    let respJson = JSON.parse(xmlhttp.responseText)
    if (respJson.code === 'E000') {
      pexit2.disabled = null
      removeClass(pexit2, 'pexitUnable')
      pexit2.innerHTML = '下载'
      p2.childNodes[3].innerHTML = '文件生成成功'
      pexit2.onclick = function () {
        changePanel(p2, 'showPanel', 'hidePanel')
        c2.style.cssText = 'visibility : hidden; opacity: 0;'
        downloadFile(respJson.token)
      }
    } else {
      pexit2Retry()
    }
  }, fd)
}

function pexit2Retry () {
  pexit2.disabled = null
  removeClass(pexit2, 'pexitUnable')
  pexit2.innerHTML = '返回'
  p2.childNodes[3].innerHTML = '文件生成失败，请返回重试。'
}
