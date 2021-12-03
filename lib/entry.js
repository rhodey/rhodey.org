var raw       = require('choo/html/raw')
var html      = require('choo/html')
let toHTML    = require('marked')
var Component = require('choo/component')
var Header    = require('./header.js')
var highlight = require('highlight.js')

const INDEX = require('./blog-index.js')

toHTML.setOptions({
  highlight : function (code) {
    return highlight.highlightAuto(code).value
  }
})

class BlogEntry extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = { }
  }

  update (path, markedup) {
    return path !== this.local.path ||
      markedup !== this.local.markedup
  }

  createElement (path, markedup) {
    this.local.path = path
    this.local.markedup = markedup

    if (!markedup) {
      return html`
        <div class="blogLoading row">
          <img class="col-xs-12" src="/assets/img/loading.gif"></img>
        </div>`
    }

    let markdown = markedup.split('\n').slice(9).join('\n')
    let metadata = INDEX[path]

    return html`
      <div class="blogEntry">
        <h1>${metadata.title}</h1>
        <div class="blogEntryBanner">
          ${raw(toHTML(metadata.banner))}
        </div>
        <div class="blogEntryMarkdown">
          ${raw(toHTML(markdown))}
        </div>
      </div>`
  }
}

module.exports = function createView (state, emit) {
  let title = 'loading...'
  let path = state.params.path
  let markedup = state.fetch[path]

  if (!INDEX[path]) {
    emit(state.events.REPLACESTATE, '/404')
  } else if (!markedup) {
    emit('fetch', path)
    title = INDEX[path].title
  } else {
    title = INDEX[path].title
  }

  if (state.title !== title) {
    document.title = title
  }

  return html`
    <div class="app">
      ${state.cache(Header, 'header').render()}
      <div class="blogEntryBox">
        ${state.cache(BlogEntry, 'entry' + path)
               .render(path, markedup)}
      </div>
    </div>
  `
}
