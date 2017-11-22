home = true
currentSecondPanel = null

let homesidebut = document.getElementById('homesidebut')
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
  let functionArea = document.getElementById('functionArea')
  let tableName = createInputRow('表名', true, 'tableName', null, sendMapping)
  let optionmap = new Map()
  optionmap.set('MySQL', 0)
  optionmap.set('MongoDB', 1)
  let dbselect = createSelect('dbselect', 'database', '数据库选择：', optionmap)
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
  tableNameElement.xixi = i
  tableNameElement.haha = filemark
}

function createFormatPanel (type) {
  let functionArea = document.getElementById('functionArea')
  let tableName = createInputRow('表名', true, 'tableName', null, sendFormat)
  let optionmap = new Map()
  optionmap.set('.xlsx', '.xlsx')
  optionmap.set('.xls', '.xls')
  optionmap.set('.csv', '.csv')
  let dbselect = createSelect('format', 'format', '导出格式：', optionmap)
  appendC(functionArea, tableName)
  appendC(functionArea, dbselect)
  let tableNameElement = document.getElementById('tableName')
  tableNameElement.xixi = 0
  if (type === 'json') {
    tableNameElement.heihei = 1
    let num = new Map()
    for (let i = 0; i < 23; ++i) {
      num.set(i, i)
    }
    let columnNumRow = createSelect('columnNum', 'columnNum', '表中一共多少字段：', num)
    columnNumRow.style.width = '700px'
    appendC(functionArea, columnNumRow)
    let columnNum = document.getElementById('columnNum')
    bind(columnNum, 'change', function () {
      let columnNumVal = parseInt(columnNum.value)
      if (tableNameElement.xixi < columnNumVal) {
        for (let i = tableNameElement.xixi; i < columnNumVal; ++i) {
          let columnMappingRow = createInputRow('第' + (i + 1) + '列', true, 'columnMappingRow_' + i, i, sendFormat)
          appendC(functionArea, columnMappingRow)
        }
      } else if (tableNameElement.xixi > columnNumVal) {
        for (let i = tableNameElement.xixi; i > columnNumVal; --i) {
          removeLastC(functionArea)
        }
      }
      let add = (Math.round((columnNumVal) / 2)) * 43
      resetFunctionPanelHeight(190 + add)
      tableNameElement.xixi = columnNumVal
    })
    let line = createLine()
    appendC(functionArea, line)
  } else {
    tableNameElement.heihei = 0
  }
}

function createTransferPanel (type) {
  let functionArea = document.getElementById('functionArea')
  let tableName = createInputRow('表名', true, 'tableName', null, sendTransfer)
  appendC(functionArea, tableName)
  let tableNameElement = document.getElementById('tableName')
  tableNameElement.xixi = 0
  if (type === 'json') {
    tableNameElement.heihei = 1
    let num = new Map()
    for (let i = 0; i < 23; ++i) {
      num.set(i, i)
    }
    let columnNumRow = createSelect('columnNum', 'columnNum', '表中一共多少字段：', num)
    columnNumRow.style.width = '700px'
    appendC(functionArea, columnNumRow)
    let columnNum = document.getElementById('columnNum')
    bind(columnNum, 'change', function () {
      let columnNumVal = parseInt(columnNum.value)
      if (tableNameElement.xixi < columnNumVal) {
        for (let i = tableNameElement.xixi; i < columnNumVal; ++i) {
          let columnMappingRow = createInputRow('第' + (i + 1) + '列', true, 'columnMappingRow_' + i, i, sendTransfer)
          appendC(functionArea, columnMappingRow)
        }
      } else if (tableNameElement.xixi > columnNumVal) {
        for (let i = tableNameElement.xixi; i > columnNumVal; --i) {
          removeLastC(functionArea)
        }
      }
      let add = (Math.round((columnNumVal) / 2)) * 43
      resetFunctionPanelHeight(190 + add)
      tableNameElement.xixi = columnNumVal
    })
    let line = createLine()
    appendC(functionArea, line)
  } else {
    tableNameElement.heihei = 0
  }
}

function chackFunctioPanelBut (check, butfun) {
  let functionbut = document.getElementById('functionbut')
  if (check === 'error') {
    addClass(functionbut, 'errorbut')
    functionbut.innerHTML = '命名只接受字母与下划线且不能为空'
    functionbut.onclick = null
  } else if (check === 'right') {
    removeClass(functionbut, 'errorbut')
    functionbut.innerHTML = '确定'
    functionbut.onclick = butfun
  }
}

function inputStrWrong (input) {
  let rgx = new RegExp('[a-zA-Z_]', 'g')
  if (input.value.length === 0) {
    return true
  }
  for (var i = 0; i < input.value.length; i++) {
    let char = input.value.charAt(i)
    if (char.search(rgx) !== 0) {
      return true
    }
  }
  return false
}

function inputStrAllWrong () {
  let tableName = document.getElementById('tableName')
  check = inputStrWrong(tableName)
  if (check) {
    return check
  }
  let columnNumber = tableName.xixi
  if (columnNumber !== 0) {
    for (var i = 0; i < columnNumber; i++) {
      let column = document.getElementById('columnMappingRow_' + i)
      check = inputStrWrong(column)
      if (check) {
        return check
      }
    }
  }

  return check
}

function getMappingMsg () {
  let fd = new FormData()
  let tableName = document.getElementById('tableName')
  let dbselect = document.getElementById('dbselect')
  let columnNumber = tableName.xixi
  let filemark = tableName.haha
  fd.append('filemark', filemark)
  fd.append('table', tableName.value)
  fd.append('brand', dbselect.value)
  let fields = new Array(columnNumber)
  for (var i = 0; i < columnNumber; i++) {
    let column = document.getElementById('columnMappingRow_' + i)
    fields[i] = column.value
  }
  fd.append('fields', fields)
  return fd
}

function getFormatMsg () {
  let fd = new FormData()
  let tableName = document.getElementById('tableName')
  let format = document.getElementById('format')
  let columnNumber = tableName.xixi
  let brand = tableName.heihei
  let file = input.files[0]
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
  let columnNumber = tableName.xixi
  let brand = tableName.heihei
  let file = input.files[0]
  fd.append('brand', brand)
  fd.append('file', file)
  fd.append('table', tableName.value)
  let fields = new Array(columnNumber)
  for (var i = 0; i < columnNumber; i++) {
    let column = document.getElementById('columnMappingRow_' + i)
    fields[i] = column.value
  }
  fd.append('fields', fields)
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
