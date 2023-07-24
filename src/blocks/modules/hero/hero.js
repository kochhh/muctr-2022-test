/* eslint-disable no-undef */
import { isMobile } from '../../../js/utils/utils'

const Hero = {
  init() {
    const specialitiesContainer = document.querySelector('.hero-spec-container')
    const specialities = document.querySelector('.hero-spec')
    const about = document.querySelector('.hero-about-slider')
    const title = document.querySelector('.hero-about__title')
    let specialitiesSlider, aboutSlider = null
    let timer

    if (!specialities || !about) return

    document.fonts.ready.then(function() {
      document.documentElement.classList.add('fonts-loaded')
      slidersInit()
      // setTimeout(() => {
      //   slidersInit()
      // }, 250)
    })

    window.addEventListener('resize', function() {
      if (isMobile()) return

      slidersDestroy()

      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        slidersInit()
      }, 250)
    }, true)

    function slidersInit() {
      title.classList.add('is-loaded')

      if (!specialitiesSlider) {
        specialitiesSlider = new Swiper(specialities, {
          direction: 'vertical',
          freeMode: {
            enabled: true,
            sticky: true,
          },
          slidesPerView: 'auto',
          centeredSlides: true,
          slideToClickedSlide: true,
          loop: true,
          mousewheel: true,
          initialSlide: 2,
          speed: 500,
          navigation: {
            prevEl: specialitiesContainer.querySelector('.swiper-button-prev'),
            nextEl: specialitiesContainer.querySelector('.swiper-button-next'),
          },
          breakpoints: {
            0: {
              spaceBetween: 28,
            },
            768: {
              spaceBetween: 30,
            },
            1440: {
              spaceBetween: 60,
            },
            1900: {
              spaceBetween: 64,
            },
          },
          // autoplay: {
          //   delay: 3000,
          // },
        })
      }

      if (!aboutSlider) {
        aboutSlider = new Swiper(about, {
          loop: true,
          allowTouchMove: false,
          cssMode: true,
          initialSlide: 4,
          loopedSlides: 10,
        })
      }

      if (specialitiesSlider.controller) {
        specialitiesSlider.controller.control = aboutSlider
      }

      if (isMobile()) {
        specialitiesSlider.autoplay.stop()
      } else {
        specialitiesSlider.autoplay.start()
      }
    }

    function slidersDestroy() {
      if (specialitiesSlider) {
        specialitiesSlider.destroy()
        specialitiesSlider = null
      }

      if (aboutSlider) {
        aboutSlider.destroy()
        aboutSlider = null
      }
    }
  }
}

export default Hero
