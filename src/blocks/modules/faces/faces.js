/* eslint-disable no-undef */
const Faces = {
  init() {
    const faces = document.querySelector('.faces-slider')
    const facesContainer = document.querySelector('.faces-slider-container')

    if (!faces) {
      return
    }

    new Swiper(faces, {
      speed: 400,
      slidesPerView: 'auto',
      navigation: {
        prevEl: facesContainer.querySelector('.swiper-button-prev'),
        nextEl: facesContainer.querySelector('.swiper-button-next'),
      },
      breakpoints: {
        0: {
          spaceBetween: 20,
        },
        1020: {
          spaceBetween: 30,
        },
        1440: {
          spaceBetween: 60,
        },
        1900: {
          spaceBetween: 80,
        },
      },
      a11y: {
        enabled: false,
      },
    })
  }
}

export default Faces
