let home = true
let currentSecondPanel = null

let timer
homesidebut.onclick = function getHome () {
  if (!home) {
    changePanel(mainPanel, 'showPanel', 'hidePanel')
    changePanel(currentSecondPanel, 'showPanel', 'hidePanel')
    home = true
    clearInterval(timer)
    timer = setInterval(function () {
      location.reload()
    }, 360)
  }
}

function changePanel (panel, showClass, hideClass) {
  changeClass(panel, showClass)
  changeClass(panel, hideClass)
}

function showSecondPanel (panel) {
  currentSecondPanel = panel
  changePanel(panel, 'showPanel', 'hidePanel')
}

function hideMainPanel (mainPanel) {
  home = false
  changePanel(mainPanel, 'showPanel', 'hidePanel')
}

function msgPanelShow (title, msg, exitText) {
  let ptitle = p2.childNodes[1]
  let pmessage = p2.childNodes[3]
  ptitle.innerHTML = title
  pmessage.innerHTML = msg
  changePanel(c2, 'showPanel', 'hidePanel')

  if (exitText === null || exitText === undefined) {
    pexit2.innerHTML = '好的'
  } else {
    pexit2.innerHTML = exitText
  }
  pexit2.onclick = function () {
    if (title === '错误') {
      input.value = null
    }
    removeClass(c2, 'showPanel')
    addClass(c2, 'hidePanel')
  }
}

function createMappingPanel (tableColumns, filemark) {
  let tableName = createInputRow('表名', true, 'tableName', null, sendMapping)
  let optionmap = new Map()
  optionmap.set('MySQL——导出一张完整的表', 0)
  optionmap.set('MySQL——将数据导入已有表', 1)
  optionmap.set('MongoDB', 2)
  let dbselect = createSelect('dbselect', 'database', '目标', optionmap)
  appendC(functionArea, tableName)
  appendC(functionArea, dbselect)

  let line = createLine()
  appendC(functionArea, line)

  let mappingHead = document.createElement('div')
  addClass(mappingHead, 'mapRow')
  mappingHead.style.width = '900px'
  appendC(functionArea, mappingHead)

  let columnNameHead = document.createElement('span')
  columnNameHead.innerHTML = '列名映射'
  columnNameHead.style.cssText = 'width: 300px; margin: 0 5px;'
  appendC(mappingHead, columnNameHead)

  let dataTypeHead = document.createElement('span')
  dataTypeHead.innerHTML = '数据类型'
  dataTypeHead.style.cssText = 'width: 185px; margin: 0 5px;'
  appendC(mappingHead, dataTypeHead)

  let dataLengthHead = document.createElement('span')
  dataLengthHead.innerHTML = '数据长度'
  dataLengthHead.style.cssText = 'width: 185px; margin: 0 5px;'
  appendC(mappingHead, dataLengthHead)

  let pkHead = document.createElement('span')
  pkHead.innerHTML = '是否主键'
  pkHead.style.cssText = 'width: 185px; margin: 0 5px;'
  appendC(mappingHead, pkHead)

  let dataTypeSelectMap = new Map()
  dataTypeSelectMap.set('varchar', 'varchar')
  dataTypeSelectMap.set('tinyint', 'tinyint')
  dataTypeSelectMap.set('smallint', 'smallint')
  dataTypeSelectMap.set('mediumint', 'mediumint')
  dataTypeSelectMap.set('int', 'int')
  dataTypeSelectMap.set('bigint', 'bigint')
  dataTypeSelectMap.set('float', 'float')
  dataTypeSelectMap.set('double', 'double')
  dataTypeSelectMap.set('decimal', 'decimal')

  dataTypeSelectMap.set('date', 'date')
  dataTypeSelectMap.set('time', 'time')
  dataTypeSelectMap.set('year', 'year')
  dataTypeSelectMap.set('datetime', 'datetime')
  dataTypeSelectMap.set('timestamp', 'timestamp')

  dataTypeSelectMap.set('char', 'char')
  dataTypeSelectMap.set('tinyblob', 'tinyblob')
  dataTypeSelectMap.set('tinytext', 'tinytext')
  dataTypeSelectMap.set('blob', 'blob')
  dataTypeSelectMap.set('mediumblob', 'mediumblob')
  dataTypeSelectMap.set('mediumtext', 'mediumtext')
  dataTypeSelectMap.set('longblob', 'longblob')

  dataTypeSelectMap.set('numeric', 'numeric')
  dataTypeSelectMap.set('bool', 'bool')
  dataTypeSelectMap.set('boolean', 'boolean')
  dataTypeSelectMap.set('varbinary', 'varbinary')

  let i = 0
  for (; i < tableColumns.length; i++) {
    let columnMappingRow = createInputRow(tableColumns[i], true, tableColumns[i], i, sendMapping)
    columnMappingRow.style.width = '900px'
    let label = columnMappingRow.childNodes[0]
    label.style.cssText = 'width: 300px; margin: 0 5px; display: inline-block;'
    let dataTypeSelect = createSelect('columnDataTypeSelect_' + i, 'columnDataTypeSelect_' + i, null, dataTypeSelectMap)
    dataTypeSelect.style.cssText = 'width: 185px; margin: 0 5px;'

    let dataLength = document.createElement('input')
    dataLength.onkeyup = function () {
      if (dataLength.value.length === 1) {
        dataLength.value = dataLength.value.replace(/[^1-9]/g, '')
      } else {
        dataLength.value = dataLength.value.replace(/\D/g, '')
      }
    }
    dataLength.onafterpaste = function () {
      if (this.value.length === 1) {
        this.value = this.value.replace(/[^1-9]/g, '')
      } else {
        this.value = this.value.replace(/\D/g, '')
      }
    }
    dataLength.type = 'text'
    dataLength.id = 'columnDataLength_' + i
    dataLength.style.cssText = 'width: 185px; margin: 0 5px;'

    let pk = document.createElement('input')
    pk.name = 'pk'
    pk.type = 'radio'
    pk.value = i
    pk.style.cssText = 'width: 185px; margin: 0 5px;'

    appendC(columnMappingRow, dataTypeSelect)
    appendC(columnMappingRow, dataLength)
    appendC(columnMappingRow, pk)
    appendC(functionArea, columnMappingRow)
  }
  if (tableColumns.length % 2 !== 0) {
    let div = createInputRow('', false, null, null)
    appendC(functionArea, div)
  }

  let tableNameElement = document.getElementById('tableName')
  functionArea.xixi = i
  functionArea.haha = filemark
}

function createFormatPanel (type) {
  let tableName = createInputRow('数据表名', true, 'tableName', null, sendFormat)
  let optionmap = new Map()
  optionmap.set('.xlsx', '.xlsx')
  optionmap.set('.xls', '.xls')
  optionmap.set('.csv', '.csv')
  let dbselect = createSelect('format', 'format', '导出格式', optionmap)
  appendC(functionArea, tableName)
  appendC(functionArea, dbselect)
  let tableNameElement = document.getElementById('tableName')
  if (type === 'json') {
    functionArea.heihei = 1
    let num = new Map()
    for (let i = 0; i < 23; ++i) {
      num.set(i, i)
    }
    let line = createLine()
    appendC(functionArea, line)
  } else {
    functionArea.heihei = 0
  }
}

function createTransferPanel (type) {
  let tableName = createInputRow('数据表名', true, 'tableName', null, sendTransfer)
  appendC(functionArea, tableName)
  let tableNameElement = document.getElementById('tableName')
  if (type === 'json') {
    let opMap = new Map()
    opMap.set('导出为一张新表', 1)
    opMap.set('导入到已有的表', 2)
    let opSelectRow = createSelect('opSelect', 'opSelect', '目标', opMap)
    appendC(functionArea, opSelectRow)
    let opSelect = document.getElementById('opSelect')
    functionArea.heihei = 1
    bind(opSelect, 'change', function () {
      if (opSelect.value === '1') {
        functionArea.heihei = 1
      } else {
        functionArea.heihei = 2
      }
    })
    let line = createLine()
    appendC(functionArea, line)
  } else {
    functionArea.heihei = 0
  }
}

function createTransferPanel2 (type) {
  let columnNumRow
  let num = new Map()
  if (type === 'csv') {
    num.set('.csv转为.xls', 0)
    num.set('.csv转为.xlsx', 1)
  }
  if (type === 'xls') {
    num.set('.xls转.csv', 2)
    num.set('.xls转.xlsx', 3)
  }

  if (type === 'xlsx') {
    num.set('.xlsx转为.csv', 4)
    num.set('.xlsx转为.xls', 5)
  }
  columnNumRow = createSelect('operation', 'operation', '转换目标', num)
  columnNumRow.style.width = '700px'
  appendC(functionArea, columnNumRow)
}

function getMappingMsg () {
  let tableName = document.getElementById('tableName')
  let dbselect = document.getElementById('dbselect')
  let columnNumber = functionArea.xixi
  let filemark = functionArea.haha
  if (dbselect.value === '2') {
    functionArea.lualua = tableName.value + '.json'
  } else {
    functionArea.lualua = tableName.value + '.sql'
  }
  let pkInput = document.getElementsByName('pk')
  let pki
  for (var i = 0; i < pkInput.length; i++) {
    if (pkInput[i].checked) {
      pki = i
    }
  }
  let form = 'filemark=' + filemark + '&table=' + tableName.value + '&brand=' + dbselect.value
  for (let i = 0; i < columnNumber; i++) {
    let str
    let columnName = document.getElementById('columnMappingRow_' + i).value
    let columnDataType = document.getElementById('columnDataTypeSelect_' + i).value
    let columnDataLength = document.getElementById('columnDataLength_' + i).value

    if (columnDataLength === '') {
      msgPanelShow('提示', '请指定数据的长度！', null)
      return null
    }
    str = columnName + ',' + columnDataType + (columnDataLength === '' ? '' : ',' + columnDataLength)
    if (pki === i) {
      str += ',pk'
    }
    form += '&fields=' + str
  }

  return form
}

function getFormatMsg () {
  let fd = new FormData()
  let tableName = document.getElementById('tableName')
  let format = document.getElementById('format')
  let brand = functionArea.heihei
  let file = input.files[0]
  functionArea.lualua = tableName.value + format.value
  fd.append('brand', brand)
  fd.append('file', file)
  fd.append('table', tableName.value)
  fd.append('format', format.value)
  return fd
}

function getTransferMsg () {
  let fd = new FormData()
  let tableName = document.getElementById('tableName')
  let columnNumber = functionArea.xixi
  let operation = functionArea.heihei
  let file = input.files[0]
  if (operation === 0) {
    functionArea.lualua = tableName.value + '.json'
  } else {
    functionArea.lualua = tableName.value + '.sql'
  }
  fd.append('operation', operation)
  fd.append('file', file)
  fd.append('table', tableName.value)
  return fd
}

function getTransfer2Msg () {
  let fd = new FormData()
  let operationVal = document.getElementById('operation').value
  let file = input.files[0]
  let fileName = file.name.split('.')[0]
  if (operationVal === '0' || operationVal === '5') {
    functionArea.lualua = fileName + '.xls'
  }
  if (operationVal === '1' || operationVal === '3') {
    functionArea.lualua = fileName + '.xlsx'
  }
  if (operationVal === '2' || operationVal === '4') {
    functionArea.lualua = fileName + '.csv'
  }
  fd.append('operation', operationVal)
  fd.append('file', file)
  return fd
}

function showFunctionPanel (panelheight) {
  resetFunctionPanelHeight(panelheight)
  changePanel(currentSecondPanel, 'showPanel', 'hidePanel')
  showSecondPanel(functionPanel)
}

function resetFunctionPanelHeight (height) {
  functionPanel.style.height = height + 'px'
  functionArea.style.height = (height - 100) + 'px'
}

function serverUnreachabled () {
  fixMsgPanel()
  msgPanelShow('错误', '服务器未启动 请联系管理员', null)
}

function serverWrong () {
  fixMsgPanel()
  msgPanelShow('错误', '服务器内部错误 请联系管理员', null)
}

function fixMsgPanel () {
  if (hasClass(c2, 'showPanel')) {
    changePanel(c2, 'showPanel', 'hidePanel')
  }
  if (hasClass(pexit2, 'pexitUnable')) {
    removeClass(pexit2, 'pexitUnable')
    pexit2.disabled = null
  }
}
