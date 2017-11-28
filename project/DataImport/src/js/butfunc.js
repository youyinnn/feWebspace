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
      return
    }
    if (maxSise && input.files[0].size > maxSise * 1024 * 1024) {
      console.log(input.files[0].size)
      msgPanelShow(p2, '错误', '请上传小于' + maxSise + 'M的文件！', null, null, null)
      return
    }
    let fileType = input.files[0].name.split('.')[1]
    if (acceptableFileArr.indexOf(fileType.toLocaleLowerCase()) === -1) {
      msgPanelShow(p2, '错误', '不接受的文件类型' + fileType, null, null, null)
      return
    }
    let fileName = input.files[0].name.split('.')[0]
    if (fileType.toLocaleLowerCase() === 'sql') {
      let rgx = new RegExp('[a-zA-Z]', 'g')
      let fileNameIllegal = false
      for (let i = 0; i < fileName.length; i++) {
        let char = fileName.charAt(i)
        if (char.search(rgx) !== 0) {
          fileNameIllegal = true
          break
        }
      }
      if (fileNameIllegal) {
        msgPanelShow(p2, '错误', 'SQL文件必须全英文命名' + fileType, null, null, null)
        return
      }
    }

    let fd = new FormData()
    fd.append('file', input.files[0])
    fd.append('msg', '你好')

    if (url !== null) {
      disablePexit2But()
      msgPanelShow(p2, '提示', '正在上传文件至数据库并等待返回需要映射的字段头部...', '请稍等', null, null)
      createCORS('POST', url)
      postReq(func, fd)
    } else {
      func()
    }
  }
}

function sendMapping () {
  let form = getMappingMsg()
  disablePexit2But()
  msgPanelShow(p2, '提示', '正在发送映射并等待生成数据库文件...', '请稍等', null, null)
  openPost(host + '/sf/dataimoprt/doimport')
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  postReq(function () {
    let respJson = JSON.parse(xmlhttp.responseText)
    if (respJson.code === 'I000') {
      clickDownload(respJson.token, true)
    } else {
      enablePexit2But('返回', '文件生成失败，请返回重试。')
    }
  }, form)
}

function downloadFile (token) {
  openGet(host + '/pf/downloadfile?token=' + token)
  xmlhttp.responseType = 'arraybuffer'
  getReq(outputBinaryFile)
}

function outputBinaryFile () {
  if (functionArea.baba) {
    enablePexit2But('返回主界面', '下载成功！你需要返回主界面才能进行其他操作！')
    pexit2.onclick = function () {
      changePanel(p2, 'showPanel', 'hidePanel')
      c2.style.cssText = 'visibility : hidden; opacity: 0;'
      homesidebut.onclick()
    }
  } else {
    enablePexit2But('继续下载', '下载成功！你可以在当前面板继续下载！')
    pexit2.onclick = function () {
      changePanel(p2, 'showPanel', 'hidePanel')
      c2.style.cssText = 'visibility : hidden; opacity: 0;'
    }
  }
  let filename = functionArea.lualua
  let blob = new Blob([xmlhttp.response])
  let href = URL.createObjectURL(blob)
  Adownload(href, filename)
  URL.revokeObjectURL(href)
}

function Adownload (href, title) {
  const a = document.createElement('a')
  a.setAttribute('href', href)
  a.setAttribute('download', title)
  a.click()
}

function mapping () {
  let respJson = JSON.parse(xmlhttp.responseText)
  let code = respJson.code
  if (code === 'H000') {
    let filemark = respJson.filemark
    let headers = respJson.headers
    createMappingPanel(headers, filemark)
    lockFunctioPanelBut('请填写信息')
    let headerslength = headers.length
    let panelheight = 165 + Math.round(headerslength / 2) * 43
    enablePexit2But('进入映射', '上传成功')
    pexit2.onclick = function () {
      changePanel(p2, 'showPanel', 'hidePanel')
      c2.style.cssText = 'visibility : hidden; opacity: 0;'
      showFunctionPanel(panelheight)
    }
  } else {
    msgPanelShow(p2, '提示', '上传失败', '好的', null, null)
  }
}

function format () {
  let type = input.files[0].name.split('.').pop()
  lockFunctioPanelBut('请填写信息')
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
  lockFunctioPanelBut('请填写信息')
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
  disablePexit2But()
  msgPanelShow(p2, '提示', '正在转换文件...', '请稍等', null, null)
  openPost(host + '/sf/changefileformat')
  postReq(function () {
    let respJson = JSON.parse(xmlhttp.responseText)
    if (respJson.code === 'F000') {
      clickDownload(respJson.token, false)
    } else {
      enablePexit2But('返回', '文件生成失败，请返回重试。')
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
  disablePexit2But()
  msgPanelShow(p2, '提示', '正在转换数据库文件...', '请稍等', null, null)
  openPost(host + '/sf/changebrand')
  postReq(function () {
    let respJson = JSON.parse(xmlhttp.responseText)
    if (respJson.code === 'C000') {
      clickDownload(respJson.token, true)
    } else {
      enablePexit2But('返回', '文件生成失败，请返回重试。')
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
  disablePexit2But()
  msgPanelShow(p2, '提示', '正在导出为数据库文件...', '请稍等', null, null)
  openPost(host + '/sf/exportformdb')
  postReq(function () {
    let respJson = JSON.parse(xmlhttp.responseText)
    if (respJson.code === 'E000') {
      clickDownload(respJson.token, false)
    } else {
      enablePexit2But('返回', '文件生成失败，请返回重试。')
    }
  }, fd)
}

function clickDownload (token, returnHome) {
  enablePexit2But('下载', '文件生成成功')
  pexit2.onclick = function () {
    disablePexit2But()
    pexit2.innerHTML = '请稍等'
    p2.childNodes[3].innerHTML = '正在下载....'
    downloadFile(token)
    functionArea.baba = returnHome
  }
}

function enablePexit2But (butText, msgPanelText) {
  pexit2.disabled = null
  removeClass(pexit2, 'pexitUnable')
  pexit2.innerHTML = butText
  p2.childNodes[3].innerHTML = msgPanelText
}

function disablePexit2But () {
  pexit2.disabled = 'true'
  addClass(pexit2, 'pexitUnable')
}
