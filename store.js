module.exports = store

function store (state, emitter) {
  state.emoticount = 0
  state.fetch = { }
  state.fetching = false

  emitter.on('DOMContentLoaded', function () {
    setInterval(() => emitter.emit('emoticon:next'), 800)

    emitter.on('emoticon:next', function () {
      state.emoticount += 1
      emitter.emit(state.events.RENDER)
    })

    emitter.on('fetch', function(key) {
      if (state.fetching || state.fetch[key]) { return }
      state.fetching = true
      fetch(`/assets/md/${key}.md#${Date.now()}`)
        .then((res) => res.text())
        .then((txt) => {
          state.fetch[key] = txt
          state.fetching = false
        }).catch(console.error)
    })
  })
}
