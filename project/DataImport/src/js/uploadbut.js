var input = document.createElement('input')
input.setAttribute('id', 'uploadFile')
input.setAttribute('type', 'file')
input.setAttribute('name', 'myfile')
input.setAttribute('value', null)
input.style.display = 'none'

/* global postReq xmlhttp input msgPanelShow p2 */
function uploadbut (maxSise, acceptableFileArr) {
  input.click()
  input.onchange = function () {
    input.value = null
    console.log(input.files[0])
    if (!input.value) {
      return 0
    }
    if (maxSise && input.files[0].size > maxSise * 1024 * 1024) {
      console.log(input.files[0].size)
      msgPanelShow(p2, '文件过大', '请上传小于' + maxSise + 'M的文件！')
      return 0
    }
    var fileType = input.value.split('.').pop()
    if (acceptableFileArr.indexOf(fileType.toLocaleLowerCase()) === -1) {
      msgPanelShow(p2, '文件过大', '不接受的文件类型' + fileType)
      return 0
    }
  }
}
