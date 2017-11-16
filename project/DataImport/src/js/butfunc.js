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
      var table = JSON.parse(xmlhttp.responseText)
      createTableMsg(table)
      msgPanelShow(p2, '提示', '上传成功', '进入映射', showTableMappingPanel, null)
    }, fd)
  }
}

function sendMapping () {
  let mappingJson = getMappingMsg()
  let fd = new FormData()
  fd.append('mapping', mappingJson)
  postReq('http://localhost:8080/mapHandle', function () {
    console.log(xmlhttp)
  }, fd)
}
