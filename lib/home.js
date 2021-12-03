let raw       = require('choo/html/raw')
let html      = require('choo/html')
let toHTML    = require('marked')
let Component = require('choo/component')
let Header    = require('./header.js')

const INDEX = require('./blog-index.js')
const EMOTICONS = [
  "o_o",     "0_o",        "o_0",
  "(>_<)",   "<(>_<)",     "(>_<)>",
  "(^_^)",   "<(^_^)",     "(^_^)>",
  "(*_*)",   "(;*_*)",     "(*_*;)",
  "(＠_＠)", "(;＠_＠)",   "(＠_＠;)",
  "(T_T)",   "(T-T)",      "(Ｔ▽Ｔ)",
  "(≧∇≦)",   "\\(≧∇≦)",    "(≧∇≦)/",
  "(◕ヮ◕)",  "\\(◕ヮ◕\\)", "(/◕ヮ◕)/",
  "(◠‿◠)",   "(✿◠‿◠)",     "(◠‿◠✿)",
  "（´ー｀）", "（´ー｀）┌", "ヽ（´ー｀）┌"
]

/* Notice that the constructor of this class involves a double assignment expression
 * which initializes HTML component state to one empty object and creates a second reference to that.
 * Following this way state.components is well-organized for index.js */
class BlogListItem extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = { }
  }

  update (path, counter) {
    return path !== this.local.path ||
      counter !== this.local.counter
  }

  createElement (path, counter) {
    this.local.path = path
    this.local.counter = counter

    let metadata = INDEX[path]
    let markdown = metadata.summary
    let summary  = raw(toHTML(markdown))

    return html`
      <div class="blogListItem">
        <div class="row">
          <div class="col-xs-4">
            <div class="blogListItemLeft"><p>
              <span class="date row">
                ${metadata.date}
              </span>
              <span class="emoticon row">
                ${EMOTICONS[counter % EMOTICONS.length]}
              </span>
            </p></div>
          </div>
          <div class="col-xs-8">
            <div class="blogListItemRight">
              <div class="title row">
                <a href=${"/blog/" + path}>${metadata.title}</a>
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

module.exports = function createView (state, emit) {
  /* rendering the home page involves updating document.title and returning html */
  if (document.title !== 'rhodey.org') {
    document.title = 'rhodey.org'
  }

  let rows = Object.keys(INDEX).map(
      (httpPath, index) =>
         state.cache(BlogListItem, 'row' + httpPath) // a BlogListItem will be in cache or createElement() will be called.
              .render(httpPath, state.emoticounter - index)
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
