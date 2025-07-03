const html = require('choo/html')

const title = 'Privacy Policy'

module.exports = function privacy(state, emit) {
  (state.title !== title) && emit('DOMTitleChange', title)
  return html`
    <div class="app sans-serif pa3">
      <h1>Privacy</h1>
      <p style="font-size: 20px">
        This privacy policy applies to the AI Ching mobile application: no data is collected and no data is shared with third parties.
      </p>
    </div>
  `
}
