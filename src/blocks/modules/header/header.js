/* eslint-disable no-undef */
const Header = {
  init() {
    const body = document.body
    const nav = document.querySelector('#navigation')
    const navLinks = document.querySelectorAll('#navigation .nav-link')
    const mql = window.matchMedia('(min-width: 1440px)')
    const openClass = 'menu-open'
    const scrolledClass = 'is-scrolled'

    const mobileClickHandler = () => {
      new bootstrap.Collapse(nav, {
        hide: true
      })
    }

    const backdropShow = () => {
      const backdrop = document.createElement('div')

      backdrop.className = 'navbar-backdrop'
      navbar.appendChild(backdrop)
      setTimeout(() => {
        backdrop.classList.add('show')
      }, 0)
    }

    const backdropHide = () => {
      const backdrop = navbar.querySelector('.navbar-backdrop')

      if (!backdrop) return
      backdrop.classList.remove('show')
      setTimeout(() => {
        backdrop.remove()
      }, 250)
    }

    if (!mql.matches) {
      [].slice.call(navLinks).forEach(item => {
        item.addEventListener('click', mobileClickHandler)
      })
    }

    mql.addEventListener('change', evt => {
      if (evt.matches) {
        [].slice.call(navLinks).forEach(item => {
          item.removeEventListener('click', mobileClickHandler)
        })
      } else {
        [].slice.call(navLinks).forEach(item => {
          item.addEventListener('click', mobileClickHandler)
        })
      }
    })

    nav.addEventListener('show.bs.collapse', () => {
      backdropShow()
      nav.classList.add('show')
      setTimeout(() => {
        body.classList.add(openClass)
      }, 150)
    })

    nav.addEventListener('hide.bs.collapse', () => {
      backdropHide()
      body.classList.remove(openClass)
    })

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY
      body.classList.toggle(scrolledClass, scrollTop > 0)
    })
  }
}

export default Header
