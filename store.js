module.exports = store

function store (state, emitter) {
  state.emoticount = 0

  emitter.on('DOMContentLoaded', function () {
    setInterval(() => emitter.emit('emoticon:next'), 800)
    emitter.on('emoticon:next', function () {
      state.emoticount += 1
      emitter.emit(state.events.RENDER)
    })
  })
}
