var html = require('choo/html')

var TITLE = 'Privacy Policy'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <div class="app sans-serif pa3">
      <h1>Privacy</h1>
      <p style="font-size: 20px">
        This privacy policy applies to the AI Ching mobile application: no data is collected and no data is shared with third parties.
      </p>
    </div>
  `
}
