var css = require('sheetify')
var choo = require('choo')

css('./assets/style.css')
css('./assets/bootstrap-3.3.6.css')
css('./assets/highlightjs-9.6.0.css')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./store'))

app.route('/', require('./views/main'))
app.route('/blog/:entry', require('./views/entry'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
