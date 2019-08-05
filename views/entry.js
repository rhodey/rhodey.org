var html      = require('choo/html')
var raw       = require('choo/html/raw')
var Component = require('choo/component')
var marked    = require('marked')
var highlight = require('highlight.js')
var Header    = require('./header.js')
var blogidx   = require('../blog-index.js')

var TITLE = 'loading...'

module.exports = view
marked.setOptions({highlight: function (code) { return highlight.highlightAuto(code).value }})

class BlogEntry extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = { }
  }

  update (key, content) {
    return key !== this.local.key ||
      content !== this.local.content
  }

  createElement (key, content) {
    this.local.key = key
    this.local.content = content
    let meta = blogidx[key]

    if (!content) {
      return html`
        <div class="blogLoading row">
          <img class="col-xs-12" src="/assets/img/loading.gif"></img>
        </div>`
    }

    let markdown = content.split('\n').slice(9).join('\n')

    return html`
      <div class="blogEntry">
        <h1>${meta.title}</h1>
        <div class="blogEntryBanner">
          ${raw(marked(meta.banner))}
        </div>
        <div class="blogEntryMarkdown">
          ${raw(marked(markdown))}
        </div>
      </div>`
  }
}

function view (state, emit) {
  let key = state.params.entry
  let content = state.fetch[key]
  let title = 'loading...'

  if (!blogidx[key]) {
    emit(state.events.REPLACESTATE, '/404')
  } else if (!content) {
    title = blogidx[key].title
    emit('fetch', key)
  } else {
    title = blogidx[key].title
  }

  if (state.title !== title) {
    emit(state.events.DOMTITLECHANGE, title)
  }

  return html`
    <body class="app">
      ${state.cache(Header, 'header').render()}
      <div class="blogEntryBox">
        ${state.cache(BlogEntry, 'entry'+key).render(key, content)}
      </div>
    </body>
  `
}
