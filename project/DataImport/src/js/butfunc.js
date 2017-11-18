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
        createTableMsg(headers)
        msgPanelShow(p2, '提示', '上传成功', '进入映射', showTableMappingPanel, null)
      } else {
        msgPanelShow(p2, '提示', '上传失败', '好的', null, null)
      }
    }, fd)
  }
}

function sendMapping () {
  let mappingJson = getMappingMsg()
  msgPanelShow(p2, '提示', '映射发送成功，正在生成数据表文件...', '请稍等', downloadFile, null)
  let fd = new FormData()
  fd.append('mapping', mappingJson)
  postReq('http://localhost:8080/mapHandle', function () {
    pexit2.disabled = 'true'
    changeClass(pexit2, 'pexitUnable')
    console.log(xmlhttp.responseText)
  }, fd)
}

function downloadFile () {

}
