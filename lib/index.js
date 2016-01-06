export default class Router {
  constructor (routes) {
    this.routes = routes

    window.addEventListener('popstate', function (event) {
      this.route()
    }.bind(this))

    document.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        if (event.target.href.startsWith(window.location.origin)) {
          event.preventDefault()
          window.history.pushState(null, '', event.target.attributes.href.value)
          this.route()
        }
      }
    }.bind(this))

    this.route()
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
