var html = require('choo/html')
var Component = require('choo/component')

module.exports = class Header extends Component {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = { }
  }

  createElement () {
    return html`
      <div className="header">
        <h1><a href="/">#rhodey.org</a>
          <span className="headerLinks">
            <a href="https://github.com/rhodey"> github</a>
            <a href="mailto:rhodey@anhonesteffort.org"> email</a>
            <a href="https://radiowitness.org/"> radiowitness</a>
          </span>
        </h1>
        <div className="headerBorder"/>
      </div>`
  }
}
