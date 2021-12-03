var html = require('choo/html')

var TITLE = '404 not found'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <div class="app sans-serif pa3">
      <h1>Nothing Here.</h1>
      <a class="pt2" href="/">Back to home.</a>
    </div>
  `
}
