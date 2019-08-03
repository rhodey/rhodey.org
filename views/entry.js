var html = require('choo/html')
var Header = require('./header.js')
var blogidx = require('../blog-index.js')

var TITLE = 'choo.rhodey.org - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      ${state.cache(Header, 'header').render()}
      <main class="pa3 cf center">
      </main>
    </body>
  `
}
