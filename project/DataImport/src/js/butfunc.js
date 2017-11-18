var input = document.createElement('input')
input.setAttribute('id', 'uploadFile')
input.setAttribute('type', 'file')
input.setAttribute('value', null)
input.style.display = 'none'

/* global postReq xmlhttp input msgPanelShow p2 */
function uploadbut (maxSise, acceptableFileArr, url) {
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
    fd.append('myfile', input.files[0])
    fd.append('msg', '你好')

    postReq(url, function () {
      let respJson = JSON.parse(xmlhttp.responseText)
      let code = respJson.code
      if (code === 'H000') {
        let filemark = respJson.filemark
        let headers = respJson.headers
        createTableMsg(headers, filemark)
        msgPanelShow(p2, '提示', '上传成功', '进入映射', showTableMappingPanel, null)
      } else {
        msgPanelShow(p2, '提示', '上传失败', '好的', null, null)
      }
    }, fd)
  }
}

function sendMapping () {
  let mappingJson = getMappingMsg()
  pexit2.disabled = 'true'
  addClass(pexit2, 'pexitUnable')
  msgPanelShow(p2, '提示', '正在发送映射并等待生成数据库文件...', '请稍等', null, null)
  let fd = new FormData()
  fd.append('mapping', mappingJson)
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
      pexit2.disabled = null
      removeClass(pexit2, 'pexitUnable')
      pexit2.innerHTML = '返回'
      p2.childNodes[3].innerHTML = '文件生成失败，请返回重试。'
    }
  }, fd)
}

function downloadFile (token) {
  // getReq('http://localhost:8080/download?token=' + token, null)
  getReq('http://localhost:8080/images/hexo.png', null)
}
