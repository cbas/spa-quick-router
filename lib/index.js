export default class Router {
  constructor (routes) {
    this.routes = routes
  }

  start () {
    this._popstateHandler = function (event) {
      this.route()
    }.bind(this)
    window.addEventListener('popstate', this._popstateHandler)

    this._clickHandler = function (event) {
      if (event.target.tagName === 'A') {
        if (event.target.href.startsWith(window.location.origin)) {
          event.preventDefault()
          window.history.pushState(null, '', event.target.attributes.href.value)
          this.route()
        }
      }
    }.bind(this)
    document.addEventListener('click', this._clickHandler)

    this.route()
  }

  stop () {
    window.removeEventListener('popstate', this._popstateHandler)
    document.removeEventListener('click', this._clickHandler)
  }

  route () {
    var route = this.routes.find(function (route) {
      const pattern = route.route
      return pattern.test(window.location.pathname)
    })

    if (route) {
      route.view()
    }
  }
}
