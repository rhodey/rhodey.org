let choo = require('choo')
let app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

function store (state, emitter) {
  state.fetch = { }
  state.fetching = false
  state.emoticounter = 0

  emitter.on('DOMContentLoaded', function () {
    setInterval(() => emitter.emit('emoticon:next'), 800)

    emitter.on('emoticon:next', function () {
      state.emoticounter += 1
      emitter.emit(state.events.RENDER)
    })

    emitter.on('fetch', function(key) {
      if (state.fetching || state.fetch[key]) { return }
      state.fetching = true

      fetch(`/assets/md/${key}.md?${Date.now()}`)
        .then((res) => res.text())
        .then((txt) => {
          state.fetch[key] = txt
          state.fetching = false
          emitter.emit(state.events.RENDER)
        }).catch(console.error)
    })
  })
}

app.use(store)

app.route('/', require('./lib/home.js'))
app.route('/blog/:path', require('./lib/entry.js'))
app.route('/privacy', require('./lib/privacy.js'))
app.route('/support', require('./lib/support.js'))
app.route('/*', require('./lib/404.js'))

module.exports = app.mount('.app')
