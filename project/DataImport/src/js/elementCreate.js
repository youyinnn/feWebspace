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


function createInputRow (innerhtml, isinput, inputName, index, butfunc) {
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
        chackFunctioPanelBut('error', butfunc)
      } else {
        chackFunctioPanelBut('right', butfunc)
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
