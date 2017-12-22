function addRstSpInnHtmlCtx (ctx) {
  resultctx.innerHTML += ctx + '</br>'
  result.scroll(0, result.scrollHeight)
}

function fib (rute, func) {
  createCORS('GET', 'http://localhost:8080/exam?route=' + rute)
  getReq(func, null)
}
