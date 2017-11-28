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

function msgPanelShow (msgPanel, title, msg, exitText, exitFunc, exitFuncParameter) {
  let ptitle = msgPanel.childNodes[1]
  let pmessage = msgPanel.childNodes[3]
  ptitle.innerHTML = title
  pmessage.innerHTML = msg
  changePanel(p2, 'showPanel', 'hidePanel')
  c2.style.cssText = 'visibility : visible; opacity: 1;'

  if (exitText === null || exitText === undefined) {
    pexit2.innerHTML = '好的'
  } else {
    pexit2.innerHTML = exitText
  }
  pexit2.onclick = function () {
    changePanel(p2, 'showPanel', 'hidePanel')
    c2.style.cssText = 'visibility : hidden; opacity: 0;'

    if (exitFunc instanceof Function) {
      exitFunc(exitFuncParameter)
    }
  }
}

function createMappingPanel (tableColumns, filemark) {
  let tableName = createInputRow('表名', true, 'tableName', null, sendMapping)
  let optionmap = new Map()
  optionmap.set('MySQL', 0)
  optionmap.set('MongoDB', 1)
  let dbselect = createSelect('dbselect', 'database', '数据库选择', optionmap)
  appendC(functionArea, tableName)
  appendC(functionArea, dbselect)

  let line = createLine()
  appendC(functionArea, line)
  for (var i = 0; i < tableColumns.length; i++) {
    let columnMappingRow = createInputRow(tableColumns[i], true, tableColumns[i], i, sendMapping)
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
  functionArea.xixi = 0
  if (type === 'json') {
    functionArea.heihei = 1
    let num = new Map()
    for (let i = 0; i < 23; ++i) {
      num.set(i, i)
    }
    let columnNumRow = createSelect('columnNum', 'columnNum', '表中一共多少字段', num)
    columnNumRow.style.width = '700px'
    appendC(functionArea, columnNumRow)
    let columnNum = document.getElementById('columnNum')
    bind(columnNum, 'change', function () {
      let columnNumVal = parseInt(columnNum.value)
      if (functionArea.xixi < columnNumVal) {
        for (let i = functionArea.xixi; i < columnNumVal; ++i) {
          let columnMappingRow = createInputRow('第' + (i + 1) + '列', true, 'columnMappingRow_' + i, i, sendFormat)
          appendC(functionArea, columnMappingRow)
        }
      } else if (functionArea.xixi > columnNumVal) {
        for (let i = functionArea.xixi; i > columnNumVal; --i) {
          removeLastC(functionArea)
        }
      }
      let add = (Math.round((columnNumVal) / 2)) * 43
      resetFunctionPanelHeight(190 + add)
      functionArea.xixi = columnNumVal
    })
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
  functionArea.xixi = 0
  if (type === 'json') {
    functionArea.heihei = 1
    let num = new Map()
    for (let i = 0; i < 23; ++i) {
      num.set(i, i)
    }
    let columnNumRow = createSelect('columnNum', 'columnNum', '表中一共多少字段', num)
    columnNumRow.style.width = '700px'
    appendC(functionArea, columnNumRow)
    let columnNum = document.getElementById('columnNum')
    bind(columnNum, 'change', function () {
      let columnNumVal = parseInt(columnNum.value)
      if (functionArea.xixi < columnNumVal) {
        for (let i = functionArea.xixi; i < columnNumVal; ++i) {
          let columnMappingRow = createInputRow('第' + (i + 1) + '列', true, 'columnMappingRow_' + i, i, sendTransfer)
          appendC(functionArea, columnMappingRow)
        }
      } else if (functionArea.xixi > columnNumVal) {
        for (let i = functionArea.xixi; i > columnNumVal; --i) {
          removeLastC(functionArea)
        }
      }
      let add = (Math.round((columnNumVal) / 2)) * 43
      resetFunctionPanelHeight(190 + add)
      functionArea.xixi = columnNumVal
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
  if (dbselect.value === '0') {
    functionArea.lualua = tableName.value + '.sql'
  } else {
    functionArea.lualua = tableName.value + '.json'
  }
  let form = 'filemark=' + filemark + '&table=' + tableName.value + '&brand=' + dbselect.value
  for (var i = 0; i < columnNumber; i++) {
    let column = document.getElementById('columnMappingRow_' + i)
    form += '&fields=' + column.value
  }
  return form
}

function getFormatMsg () {
  let fd = new FormData()
  let tableName = document.getElementById('tableName')
  let format = document.getElementById('format')
  let columnNumber = functionArea.xixi
  let brand = functionArea.heihei
  let file = input.files[0]
  functionArea.lualua = tableName.value + format.value
  fd.append('brand', brand)
  fd.append('file', file)
  fd.append('table', tableName.value)
  fd.append('format', format.value)
  let fields = new Array(columnNumber)
  for (var i = 0; i < columnNumber; i++) {
    let column = document.getElementById('columnMappingRow_' + i)
    fields[i] = column.value
  }
  fd.append('fields', fields)
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
  let fields = new Array(columnNumber)
  for (var i = 0; i < columnNumber; i++) {
    let column = document.getElementById('columnMappingRow_' + i)
    fd.append('fields', column.value)
  }
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
  msgPanelShow(p2, '错误', '服务器未启动 请联系管理员', null, null)
}

function serverWrong () {
  fixMsgPanel()
  msgPanelShow(p2, '错误', '服务器内部错误 请联系管理员', null, null)
}

function fixMsgPanel () {
  if (hasClass(p2, 'showPanel')) {
    changePanel(p2, 'showPanel', 'hidePanel')
    c2.style.cssText = 'visibility : hidden; opacity: 0;'
  }
  if (hasClass(pexit2, 'pexitUnable')) {
    removeClass(pexit2, 'pexitUnable')
    pexit2.disabled = null
  }
}
