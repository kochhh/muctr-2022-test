/* eslint-disable no-undef */
import { isMobile } from '../../../js/utils/utils'

const Events = {
  init() {
    const events = document.querySelector('.events-slider')
    const eventsContainer = document.querySelector('.events-slider-container')

    if (!events) return

    new Swiper(events, {
      speed: 400,
      slidesPerView: 'auto',
      setWrapperSize: true,
      navigation: {
        prevEl: eventsContainer.querySelector('.swiper-button-prev'),
        nextEl: eventsContainer.querySelector('.swiper-button-next'),
      },
      breakpoints: {
        0: {
          spaceBetween: 36,
        },
        1020: {
          spaceBetween: 40,
        },
      },
      a11y: {
        enabled: false,
      },
    })

    const container = document.querySelector('.section--events')
    const items = [].slice.call(document.querySelectorAll('.events-decor'))
    const windowW = window.innerWidth
    const windowH = window.innerHeight

    container.addEventListener('mousemove', function(event) {
      if (isMobile()) return

      const x = ((event.clientX / windowW * 100).toFixed(1) - 50) / 8
      const y = ((event.clientY / windowH * 100).toFixed(1) - 50) / 8
      items.forEach(item => item.style.transform = `translate3d(${x * item.dataset.x}px, ${y * item.dataset.y}px, 0)`)
    })
  }
}

export default Events
