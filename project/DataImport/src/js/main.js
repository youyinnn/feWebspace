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

function showSecondPanel (functionPanel) {
  currentSecondPanel = functionPanel
  changePanel(functionPanel, 'showPanel', 'hidePanel')
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
  let tableName = createInputRow('表名', true, 'tableName', null)
  let optionmap = new Map()
  optionmap.set('MySQL', 0)
  optionmap.set('MongoDB', 1)
  let dbselect = createSelect('dbselect', 'database', '数据库选择：', optionmap)
  appendC(functionArea, tableName)
  appendC(functionArea, dbselect)

  let line = createLine()
  appendC(functionArea, line)
  for (var i = 0; i < tableColumns.length; i++) {
    let columnMappingRow = createInputRow(tableColumns[i], true, tableColumns[i], i)
    appendC(functionArea, columnMappingRow)
  }
  if (tableColumns.length % 2 !== 0) {
    let div = createInputRow('', false, null)
    appendC(functionArea, div)
  }

  let line2 = createLine()
  appendC(functionArea, line2)

  let tableNameElement = document.getElementById('tableName')
  tableNameElement.xixi = i
  tableNameElement.haha = filemark
}

function createSettingPanel () {
  let functionArea = document.getElementById('functionArea')
  let tableName = createInputRow('表名', true, 'tableName', null)
  let optionmap = new Map()
  optionmap.set('.xlsx', '.xlsx')
  optionmap.set('.xls', '.xls')
  optionmap.set('.csv', '.csv')
  let dbselect = createSelect('format', 'format', '导出格式：', optionmap)
  appendC(functionArea, tableName)
  appendC(functionArea, dbselect)
}

function createLine () {
  let line = document.createElement('div')
  line.style.width = '777px'
  line.style.borderBottom = '2px black solid'
  line.style.margin = '5px auto'
  return line
}

function createSelect (selectid, selectname, selecttext, optionmap) {
  let div = document.createElement('div')
  changeClass(div, 'mapRow')

  let select = document.createElement('select')
  select.name = selectname
  select.id = selectid
  let span = document.createElement('span')
  span.innerHTML = selecttext
  optionmap.forEach(function (value, key, mapObj) {
    let option = document.createElement('option')
    option.value = value
    option.innerHTML = key.toString()
    appendC(select, option)
  })

  appendC(div, span)
  appendC(div, select)
  return div
}


function createInputRow (innerhtml, isinput, inputName, index) {
  let div = document.createElement('div')
  changeClass(div, 'mapRow')

  let label = document.createElement('label')
  let input = document.createElement('input')
  let span = document.createElement('span')
  if (isinput) {
    input.type = 'text'
    input.value = ''
    span.innerHTML = innerhtml + ' : '
    input.name = inputName
    if (index === null) {
      input.id = 'tableName'
    } else {
      input.id = 'columnMappingRow_' + index
    }
    bind(input, 'blur', function () {
      if (inputStrAllWrong()) {
        changeMappingBut('error')
      } else {
        changeMappingBut('right')
      }
    })
  } else {
    input.style.visibility = 'hidden'
  }

  appendC(div, label)
  appendC(label, span)
  appendC(label, input)
  return div
}

function changeMappingBut (check) {
  let functionbut = document.getElementById('functionbut')
  if (check === 'error') {
    addClass(functionbut, 'errorbut')
    functionbut.innerHTML = '命名只接受字母与下划线且不能为空'
    functionbut.onclick = null
  } else if (check === 'right') {
    removeClass(functionbut, 'errorbut')
    functionbut.innerHTML = '确定映射'
    functionbut.onclick = function () {
      sendMapping()
    }
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
  for (var i = 0; i < columnNumber; i++) {
    let column = document.getElementById('columnMappingRow_' + i)
    check = inputStrWrong(column)
    if (check) {
      return check
    }
  }

  return check
}

function getMappingMsg () {
  let tableName = document.getElementById('tableName')
  let dbselect = document.getElementById('dbselect')
  let columnNumber = tableName.xixi
  let filemark = tableName.haha
  map = new Map()
  map.set('filemark', filemark)
  map.set('table', tableName.value)
  map.set('brand', dbselect.value)
  let fields = new Array(columnNumber)
  for (var i = 0; i < columnNumber; i++) {
    let column = document.getElementById('columnMappingRow_' + i)
    fields[i] = column.value
  }
  map.set('fields', fields)

  return strMapToJson(map)
}

function showFunctionPanel (panelheight) {
  let functionPanel = document.getElementById('functionPanel')
  functionPanel.style.height = panelheight + 'px'
  changePanel(currentSecondPanel, 'showPanel', 'hidePanel')
  showSecondPanel(functionPanel)
}
