home = true
currentSecondPanel = null

let sidebut = document.getElementById('sidebut')
let timer
sidebut.onclick = function getHome () {
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

function showSecondPanel (secondPanel) {
  currentSecondPanel = secondPanel
  changePanel(secondPanel, 'showPanel', 'hidePanel')
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
    let msp = this.parentElement
    let cur = msp.parentElement
    changePanel(p2, 'showPanel', 'hidePanel')
    cur.style.cssText = 'visibility : hidden; opacity: 0;'

    if (exitFunc instanceof Function) {
      exitFunc(exitFuncParameter)
    }
  }
}

function createTableMsg (table) {
  let tableColumns = table.tableColumns

  let mappingArea = document.getElementById('mappingArea')
  let tableHead = createInputRow('表名', true, 'tableName', null)
  let dbselect = createSelect('MySQL', 'MongoDB')
  appendC(mappingArea, tableHead)
  appendC(mappingArea, dbselect)

  let line = createLine()
  appendC(mappingArea, line)
  for (var i = 0; i < tableColumns.length; i++) {
    let columnMappingRow = createInputRow(tableColumns[i], true, tableColumns[i], i)
    appendC(mappingArea, columnMappingRow)
  }
  if (tableColumns.length % 2 !== 0) {
    let div = createInputRow('', false, null)
    appendC(mappingArea, div)
  }

  let line2 = createLine()
  appendC(mappingArea, line2)
}

function createLine () {
  let line = document.createElement('div')
  line.style.width = '777px'
  line.style.borderBottom = '2px black solid'
  line.style.margin = '5px auto'
  return line
}

function createSelect (name) {
  let div = document.createElement('div')
  changeClass(div, 'mapRow')

  let select = document.createElement('select')
  select.name = 'database'
  select.id = 'dbselect'
  let span = document.createElement('span')
  span.innerHTML = '数据库选择：'
  for (var i = 0; i < arguments.length; i++) {
    let option = document.createElement('option')
    option.value = arguments[i]
    option.innerHTML = arguments[i]
    appendC(select, option)
  }

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
  } else {
    input.style.visibility = 'hidden'
  }

  appendC(div, label)
  appendC(label, span)
  appendC(label, input)
  return div
}

function getMappingMsg () {
  let tableName = document.getElementById('tableName')
  console.log(tableName.value)
}

function showTableMappingPanel () {
  let tableMappingPanel = document.getElementById('tableMappingPanel')
  changePanel(currentSecondPanel, 'showPanel', 'hidePanel')
  showSecondPanel(tableMappingPanel, 'showPanel', 'hidePanel')

}
