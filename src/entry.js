const raw = require('choo/html/raw')
const html = require('choo/html')
const toHTML = require('marked')
const highlight = require('highlight.js')
const Component = require('choo/component')
const Header = require('./header.js')

const LIST = require('./list.js')

toHTML.setOptions({
  highlight: (code) => {
    return highlight.highlightAuto(code).value
  }
})

class BlogEntry extends Component {
  constructor(id, state, emit) {
    super(id)
    this.path = null
    this.markedup = null
  }

  update (path, markedup) {
    return path !== this.path ||
      markedup !== this.markedup
  }

  createElement(path, markedup) {
    this.path = path
    this.markedup = markedup

    if (!markedup) {
      return html`
        <div class="blogLoading row">
          <img class="col-xs-12" src="/assets/img/loading.gif"></img>
        </div>`
    }

    const markdown = markedup.split('\n').slice(9).join('\n')
    const metadata = LIST[path]

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

module.exports = function entry(state, emit) {
  const path = state.params.path
  const markedup = state.fetch[path]

  let title = 'loading...'
  if (!LIST[path]) {
    emit('replaceState', '/404')
  } else if (!markedup) {
    emit('fetch', path)
    title = LIST[path].title
  } else {
    title = LIST[path].title
  }

  (state.title !== title) && emit('DOMTitleChange', title)

  return html`
    <div class="app">
      ${state.cache(Header, 'header').render()}
      <div class="blogEntryBox">
        ${state.cache(BlogEntry, 'entry' + path).render(path, markedup)}
      </div>
    </div>
  `
}
