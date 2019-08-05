var html      = require('choo/html')
var raw       = require('choo/html/raw')
var Component = require('choo/component')
var marked    = require('marked')
var Header    = require('./header.js')
var blogidx   = require('../blog-index.js')

var TITLE = 'rhodey.org'
var EMOTICONS = [
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

module.exports = view

class BlogListItem extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = { }
  }

  update (key, eidx) {
    return key !== this.local.key ||
      eidx !== this.local.eidx
  }

  createElement (key, eidx) {
    this.local.key = key
    this.local.eidx = eidx

    let emoticon = EMOTICONS[eidx % EMOTICONS.length]
    let entry = blogidx[key]
    let summary = marked(entry.summary)

    return html`
      <div class="blogListItem">
        <div class="row">
          <div class="col-xs-3">
            <div class="blogEntryMeta"><p>
              <span class="blogEntryDate row">
                ${entry.date}
              </span>
              <span class="blogEntryEmoticon row">
                ${emoticon}
              </span>
            </p></div>
          </div>
          <div class="col-xs-9">
            <div class="blogEntryGist">
              <h2 class="row">
                <a href=${"/blog/" + key}>${entry.title}</a>
              </h2>
              <div class="row">
                <div class="col-xs-12">
                  ${raw(summary)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
  }
}

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  let items = Object.keys(blogidx)
    .map((key, idx) => state.cache(BlogListItem, 'item'+key).render(key, state.emoticount - idx))

  return html`
    <body class="app">
      ${state.cache(Header, 'header').render()}
      <div class="blogListBox">
        ${items}
      </div>
    </body>
  `
}
