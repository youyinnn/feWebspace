home = true
currentSecondPanel = null

var sidebut = document.getElementById('sidebut')
var timer
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

function msgPanelShow (msgPanel, title, msg, exitFunc, exitFuncParameter) {
  var ptitle = msgPanel.childNodes[1]
  var pmessage = msgPanel.childNodes[3]
  ptitle.innerHTML = title
  pmessage.innerHTML = msg
  changePanel(p2, 'showPanel', 'hidePanel')
  c2.style.cssText = 'visibility : visible; opacity: 1;'

  pexit2.onclick = function () {
    var msp = this.parentElement
    var cur = msp.parentElement
    changePanel(p2, 'showPanel', 'hidePanel')
    cur.style.cssText = 'visibility : hidden; opacity: 0;'

    if (exitFunc instanceof Function) {
      exitFunc(exitFuncParameter)
    }
  }
}

function createTableMsg (table) {
  var tableName = table.tableName
  var tableColumns = table.tableColumns

  var tablemmsgform = document.getElementById('tablemmsgform')


  for (var column in tableColumns) {

  }

}

function unfold () {
  var tablemmsgform = document.getElementById('tablemmsgform')
  changePanel(tablemmsgform, 'fold', 'unfold')
}
