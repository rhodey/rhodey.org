var html = require('choo/html')
var Component = require('choo/component')

module.exports = class Header extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = { }
  }

  update () {
    return false
  }

  createElement () {
    return html`
      <div className="header">
        <h1><a href="/">#rhodey.org</a>
          <span className="headerLinks">
            <a href="https://rhodeyorbits.bandcamp.com"> music</a>
            <a href="https://github.com/rhodey"> software</a>
            <a href="mailto:rhodey@anhonesteffort.org"> email</a>
          </span>
        </h1>
        <div className="headerBorder"/>
      </div>`
  }
}
