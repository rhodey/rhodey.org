var html = require('choo/html')

var TITLE = 'Support'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <div class="app sans-serif pa3">
      <h1>Support</h1>
      <p style="font-size: 20px">
        Please direct all support requests to mike@rhodey.org.
      </p>
    </div>
  `
}
