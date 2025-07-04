const raw = require('choo/html/raw')
const html = require('choo/html')
const toHTML = require('marked')
const Component = require('choo/component')
const Header = require('./header.js')

const LIST = require('./list.js')

const WAVES = [
  "🌊🌊",
  "🌊🌊🌊",
  "🌊🌊",
  "🌊",
]

class BlogListItem extends Component {
  constructor(id, state, emit) {
    super(id)
    this.path = null
    this.counter = null
  }

  update(path, counter) {
    return path !== this.path ||
      counter !== this.counter
  }

  createElement(path, counter) {
    this.path = path
    this.counter = counter

    const metadata = LIST[path]
    path = `/blog/${path}`

    const markdown = metadata.summary
    const summary  = raw(toHTML(markdown))

    return html`
      <div class="blogListItem">
        <div class="row">
          <div class="col-xs-4">
            <div class="blogListItemLeft"><p>
              <span class="date row">
                ${metadata.date}
              </span>
              <span class="emoticon row">
                ${WAVES[counter % WAVES.length]}
              </span>
            </p></div>
          </div>
          <div class="col-xs-8">
            <div class="blogListItemRight">
              <div class="title row">
                <a href=${path}>${metadata.title}</a>
              </div>
              <div class="summary row">
                ${summary}
              </div>
            </div>
          </div>
        </div>
      </div>`
  }
}

const title = 'rhodey.org'

module.exports = function home(state, emit) {
  (state.title !== title) && emit('DOMTitleChange', title)

  const rows = Object.keys(LIST).map(
      (path, idx) =>
         state.cache(BlogListItem, 'item' + idx)
              .render(path, state.counter + idx)
  )

  return html`
    <div class="app">
      ${state.cache(Header, 'header').render()}
      <div class="blogListBox">
        ${rows}
      </div>
    </div>
  `
}
