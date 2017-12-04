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
  span.innerHTML = selecttext + '：'
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


function createInputRow (innerhtml, isinput, inputName, index, butfunc) {
  let div = document.createElement('div')
  changeClass(div, 'mapRow')

  let label = document.createElement('label')
  let input = document.createElement('input')
  let span = document.createElement('span')
  if (isinput) {
    input.type = 'text'
    input.value = ''
    span.innerHTML = innerhtml + '：'
    input.name = inputName
    if (index === null) {
      input.id = 'tableName'
    } else {
      input.id = 'columnMappingRow_' + index
    }
    bind(input, 'blur', function () {

      if (checkInputButIsWrong()) {
        return
      }

      unlockFunctioPanelBut(butfunc)

    })
  } else {
    input.style.visibility = 'hidden'
  }

  appendC(div, label)
  appendC(label, span)
  appendC(label, input)
  return div
}

function checkInputButIsWrong () {
  if (inputTextNull()) {
    lockFunctioPanelBut('不能有为空的输入')
    return true
  }
  if (inputStrPatternAllWrong()) {
    lockFunctioPanelBut('命名只接受字母与下划线')
    return true
  }

  if (inputTextDuplicate()) {
    lockFunctioPanelBut('不允许有重复列名')
    return true
  }
  return false
}

function inputTextNull () {
  let tableName = document.getElementById('tableName')
  let columnNum = functionArea.xixi
  if (tableName.value.length === 0) {
    return true
  }
  for (let i = 0; i < columnNum; ++i) {
    let c = document.getElementById('columnMappingRow_' + i)
    if (c.value.length === 0) {
      return true
    }
  }
  return false
}

function inputTextDuplicate () {
  let tableName = document.getElementById('tableName')
  let columnNum = functionArea.xixi

  if (columnNum === 1) {
    return false
  } else {
    for (let i = 0; i < columnNum; ++i) {
      let c1 = document.getElementById('columnMappingRow_' + i)
      for (let j = i + 1; j < columnNum; ++j) {
        let c2 = document.getElementById('columnMappingRow_' + j)
        if (c1.value === c2.value) {
          return true
        }
      }
    }
    return false
  }
}

function lockFunctioPanelBut (checkText) {
  let functionbut = document.getElementById('functionbut')
  addClass(functionbut, 'errorbut')
  functionbut.innerHTML = checkText
  functionbut.onclick = null
}

function unlockFunctioPanelBut (butfun) {
  let functionbut = document.getElementById('functionbut')
  removeClass(functionbut, 'errorbut')
  functionbut.innerHTML = '确定'
  functionbut.onclick = butfun
}

function inputStrPatternWrong (inputText) {
  let rgx = new RegExp('[a-zA-Z_]', 'g')
  for (let i = 0; i < inputText.value.length; i++) {
    let char = inputText.value.charAt(i)
    if (char.search(rgx) !== 0) {
      return true
    }
  }
  return false
}

function inputStrPatternAllWrong () {
  let tableName = document.getElementById('tableName')
  check = inputStrPatternWrong(tableName)
  if (check) {
    return check
  }
  let columnNumber = functionArea.xixi
  if (columnNumber !== 0) {
    for (let i = 0; i < columnNumber; i++) {
      let column = document.getElementById('columnMappingRow_' + i)
      check = inputStrPatternWrong(column)
      if (check) {
        return check
      }
    }
  }

  return check
}
