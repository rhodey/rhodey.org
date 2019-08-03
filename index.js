var css = require('sheetify')
var choo = require('choo')

css('tachyons')
css('./assets/style.css')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/clicks'))

app.route('/', require('./views/main'))
app.route('/blog/:entry', require('./views/entry'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
