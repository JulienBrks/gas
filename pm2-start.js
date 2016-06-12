var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()
var fs = require('fs')

server.use(middlewares)

router.db._.rewriteId = JSON.parse(fs.readFileSync('ids.json', 'utf-8').trim())
server.use(router)
server.listen(8081, function () {
  console.log('JSON Server is running')
})
