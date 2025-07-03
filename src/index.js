const choo = require('choo')
const app = choo()

function store(state, emitter) {
  state.fetch = {}
  state.fetching = false
  state.counter = 0

  emitter.on('DOMContentLoaded', () => {
    setInterval(() => emitter.emit('animate'), 800)

    emitter.on('animate', () => {
      state.counter += 1
      emitter.emit('render')
    })

    emitter.on('fetch', (key) => {
      if (state.fetching || state.fetch[key]) { return }
      state.fetching = true
      fetch(`/assets/md/${key}.md?${Date.now()}`)
        .then((res) => res.text())
        .then((txt) => {
          state.fetch[key] = txt
          state.fetching = false
          emitter.emit('render')
        }).catch(console.error)
    })
  })
}

app.use(store)
app.use(require('choo-devtools')())

app.route('/', require('./home.js'))
app.route('/blog/:path', require('./entry.js'))
app.route('/privacy', require('./privacy.js'))
app.route('/*', require('./404.js'))

app.route('/blog/ai-ching-rejected-by-apple', (state, emit) => {
  emit('replaceState', '/blog/introducing-the-ai-ching')
  return require('./entry.js')(state, emit)
})

module.exports = app.mount('.app')
