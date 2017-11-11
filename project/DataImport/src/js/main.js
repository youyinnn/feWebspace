home = true
currentSecondPanel = null
var sidebut = document.getElementById('sidebut')
sidebut.onclick = function getHome () {
  if (!home) {
    showPanel(mainPanel)
    hidePanel(currentSecondPanel)
    home = true
  }
}

function hidePanel (panel) {
  panel.style.cssText = 'transform: translate(-50%, -50%) scale(.55, .55); visibility : hidden; opacity: 0;'
}

function showPanel (panel) {
  panel.style.cssText = 'transform: translate(-50%, -50%) scale(1, 1); visibility : visible; opacity: 1;'
}

function showSecondPanel (secondPanel) {
  currentSecondPanel = secondPanel
  showPanel(secondPanel)
}

function hideMainPanel (mainPanel) {
  home = false
  hidePanel(mainPanel)
}

function msgPanelShow (msgPanel, title, msg) {
  var ptitle = msgPanel.childNodes[1]
  var pmessage = msgPanel.childNodes[3]
  ptitle.innerHTML = title
  pmessage.innerHTML = msg
  p2.style.cssText = 'transform: scale(1, 1);'
  c2.style.cssText = 'visibility : visible; opacity: 1;'
}
pexit2.onclick = function () {
  var msp = this.parentElement
  var cur = msp.parentElement
  msp.style.cssText = 'transform: scale(.65, .65);'
  cur.style.cssText = 'visibility : hidden; opacity: 0;'
}
