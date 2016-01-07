/* global sinon beforeEach afterEach describe it expect */

import Router from '..'

describe('Router navigation', () => {
  beforeEach(function () {
    this.oldState = window.location.pathname
    const nav = document.createElement('a')
    nav.href = 'foo'
    document.body.appendChild(nav)
  })

  afterEach(function () {
    const nav = document.querySelector('a')
    document.body.removeChild(nav)
    window.history.pushState(null, '', this.oldState)
    this.router.stop()
  })

  it('should navigate when clicking a link', function () {
    const callback = sinon.stub()
    this.router = new Router([
      {
        route: /^\/foo$/,
        view: callback
      }
    ])
    this.router.start()
    const nav = document.querySelector('a')
    nav.click()
    expect(callback).to.have.been.calledOnce
  })

  it('should navigate when popstate fires', function () {
  })
})
