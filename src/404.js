const html = require('choo/html')

const title = 'Not found'

module.exports = function notFound(state, emit) {
  (state.title !== title) && emit('DOMTitleChange', title)
  return html`
    <div class="app sans-serif pa3">
      <h1>404.</h1>
      <a style="font-size: 20px" href="/">Back to home.</a>
    </div>
  `
}
