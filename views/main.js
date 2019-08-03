var html = require('choo/html')
var Component = require('choo/component')
var Header = require('./header.js')
var blogidx = require('../blog-index.js')

var TITLE = 'choo.rhodey.org - main'

module.exports = view

class BlogListItem extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = { }
  }

  update (key) {
    return key !== this.local.key
  }

    /*<div className="blogEntryGist">
        <h2 className="row">
          <Link to={"/blog/" + this.props.entry.path}>{this.props.entry.title}</Link>
        </h2>
        <div className="row">
          <p className="col-xs-12">
            <span dangerouslySetInnerHTML={this.getSummaryHtml()}/>
          </p>
        </div>
      </div>
      */
  createElement (key) {
    this.local.key = key
    let entry = blogidx[key]
    return html`
      <div class="blogListItem">
        <div class="row">
          <div class="col-xs-3">
            <div class="blogEntryMeta"><p>
              <span class="blogEntryDate row">
                ${entry.date}
              </span>
              <span class="blogEntryEmoticon row">
                :D
              </span>
            </p></div>
          </div>
          <div class="col-xs-9">
            <div class="blogEntryGist">
              <h2 class="row">
                <a href=${"/blog/" + key}>${entry.title}</a>
              </h2>
              <div class="row">
                <p class="col-xs-12">
                  ${entry.summary}
                </p>
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
    .map((key) => state.cache(BlogListItem, key).render(key))

  return html`
    <body class="app">
      ${state.cache(Header, 'header').render()}
      <div class="blogListBox">
        ${items}
      </div>
    </body>
  `
}
