/* eslint-disable no-undef */
const Facts = {
  init() {
    const facts = document.querySelector('.facts-slider')
    const factsWrapper = document.querySelector('.facts-slider-wrapper')

    if (!facts) {
      return
    }

    new Swiper(facts, {
      cpeed: 500,
      loop: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: false,
          translate: ['-120%', 0, -400],
        },
        next: {
          shadow: false,
          translate: ['120%', 0, -400],
        },
      },
      pagination: {
        el: factsWrapper.querySelector('.swiper-pagination'),
        type: 'fraction',
      },
      navigation: {
        prevEl: factsWrapper.querySelector('.swiper-button-prev'),
        nextEl: factsWrapper.querySelector('.swiper-button-next'),
      },
      noSwipingClass: 'facts-slide__button',
    })
  }
}

export default Facts
