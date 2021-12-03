let html = require('choo/html')
let Component = require('choo/component')

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
        <h1><a href="/">rhodey.org</a>
          <span className="headerLinksOut">
            <a href="mailto:mike@rhodey.org"> email</a>
            <a href="https://github.com/rhodey"> software</a>
            <a href="https://rhodeyorbits.bandcamp.com"> music</a>
            <a href="https://www.instagram.com/cranberry_juice_conspiracy"> photo</a>
            <a href="https://www.youtube.com/channel/UC_UKaZIS54H0yy_Od3cnyKw"> video</a>
          </span>
        </h1>
        <div className="headerFooter"/>
      </div>`
  }
}
