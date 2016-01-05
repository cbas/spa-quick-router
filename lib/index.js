// Array.from(document.querySelectorAll('nav a'))
//   .forEach(function (anchor) {
//     anchor.addEventListener('click', function (event) {
//       event.preventDefault()
//       // console.dir(anchor)
//       history.pushState(null, '', anchor.attributes.href.value)
//       Array.from(document.querySelectorAll('section'))
//         .forEach(function (section) {
//           section.style.display = 'none'
//         })
//       switch (anchor.attributes.href.value) {
//         case '/about':
//           document.title = 'About Us'
//           document.querySelector('#about')
//             .style.display = 'block'
//           break;
//         case '/shop':
//           document.title = 'SG50 Shop'
//           document.querySelector('#products')
//             .style.display = 'block'
//           break;
//         case '/':
//           document.title = 'Homepage'
//           document.querySelector('#landing')
//             .style.display = 'block'
//           break;
//       }
//     })
//   })

function Router (routes) {
  this.routes = routes

  window.addEventListener('popstate', function (event) {
    console.log(event)
    this.route()
  }.bind(this))

  document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      if (event.target.href.startsWith(window.location.origin)) {
        event.preventDefault()
        console.log(event)
        history.pushState(null, '', event.target.attributes.href.value)
        this.route()
      }
    }
  }.bind(this))

  this.route()
}

Router.prototype.route = function () {
  Array.from(document.querySelectorAll('section'))
    .forEach(function (section) {
      section.style.display = 'none'
    })

  Object.keys(this.routes).forEach(function (key) {
    // console.log(this.routes[key])
    if (key === window.location.pathname) {
      var handler = this.routes[key]
      document.title = handler.title
      document.querySelector(handler.element)
        .style.display = 'block'
    }
  })

  // switch (window.location.pathname) {
  //   case '/about':
  //     document.title = 'About Us'
  //     document.querySelector('#about')
  //       .style.display = 'block'
  //     break
  //   case '/shop':
  //     document.title = 'SG50 Shop'
  //     document.querySelector('#products')
  //       .style.display = 'block'
  //     break
  //   case '/':
  //     document.title = 'Homepage'
  //     document.querySelector('#landing')
  //       .style.display = 'block'
  //     break
  //   default:
  //     document.querySelector('#error404').style.display = 'block'
  // }
}

// class Router {
//   constructor (routes) {
//     this.mySecretRoutes = routes
//
//     window.addEventListener('popstate', event => {
//       console.log(event)
//       this.route()
//     })
//
//     document.addEventListener('click', event => {
//       if (event.target.tagName === 'A') {
//         if (event.target.href.startsWith(window.location.origin)) {
//           event.preventDefault()
//           console.log(event)
//           history.pushState(null, '', event.target.attributes.href.value)
//           this.route()
//         }
//       }
//     })
//   }
//
//   route () {
//     Array.from(document.querySelectorAll('section'))
//       .forEach(function (section) {
//         section.style.display = 'none'
//       })
//
//     switch (window.location.pathname) {
//       case '/about':
//         document.title = 'About Us'
//         document.querySelector('#about')
//           .style.display = 'block'
//         break
//       case '/shop':
//         document.title = 'SG50 Shop'
//         document.querySelector('#products')
//           .style.display = 'block'
//         break
//       case '/':
//         document.title = 'Homepage'
//         document.querySelector('#landing')
//           .style.display = 'block'
//         break
//       default:
//         document.querySelector('#error404').style.display = 'block'
//     }
//   }
// }

module.exports = Router
