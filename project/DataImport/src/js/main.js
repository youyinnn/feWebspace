home = true
currentSecondPanel = null

var sidebut = document.getElementById('sidebut')
sidebut.onclick = function getHome () {
  if (!home) {
    changePanel(mainPanel, 'showPanel', 'hidePanel')
    changePanel(currentSecondPanel, 'showPanel', 'hidePanel')
    home = true
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

function msgPanelShow (msgPanel, title, msg, exitFunc, exitFuncParameter) {
  var ptitle = msgPanel.childNodes[1]
  var pmessage = msgPanel.childNodes[3]
  ptitle.innerHTML = title
  pmessage.innerHTML = msg
  p2.style.cssText = 'transform: scale(1, 1);'
  c2.style.cssText = 'visibility : visible; opacity: 1;'

  pexit2.onclick = function () {
    var msp = this.parentElement
    var cur = msp.parentElement
    msp.style.cssText = 'transform: scale(.65, .65);'
    cur.style.cssText = 'visibility : hidden; opacity: 0;'

    if (exitFunc instanceof Function) {
      exitFunc(exitFuncParameter)
    }
  }
}

function createTableMsg (table) {
  var tableName = table.tableName
  var tableColumns = table.tableColumns
  var tablemsg = document.getElementById('tablemsg')

  var form = document.createElement('form')
  form.class = 'tablemmsgform'
  form.method = 'POST'
  form.action = '#'
  form.innerHTML = form.innerHTML + tableName + '<br/>'
  form.innerHTML = form.innerHTML + tableName + '<br/>'
  form.innerHTML = form.innerHTML + tableName + '<br/>'
  form.innerHTML = form.innerHTML + tableName + '<br/>'

  var formHead = document.createElement('input')
  formHead.type = 'text'
  formHead.name = tableName


  for (var column in tableColumns) {

  }

  tablemsg.appendChild(form)

}
