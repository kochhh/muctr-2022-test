/* eslint-disable no-undef */
const Specialities = {
  init() {
    const specialities = document.querySelector('.specialities-slider')
    const filter = document.querySelector('.specialities-filter')

    if (!specialities) {
      return
    }

    new Swiper(specialities, {
      loop: true,
      speed: 500,
      autoHeight: true,
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
      navigation: {
        prevEl: '[data-btn-prev]',
        nextEl: '[data-btn-next]',
      },
    });

    [].slice.call(filter.querySelectorAll('.tabs-button__input')).forEach(function(checkbox) {
      checkbox.addEventListener('change', function(event) {
        const thisInput = event.target
        const allInputs = [].slice.call(thisInput.closest('.specialities-filter').querySelectorAll('.tabs-button__input'))

        if (thisInput.id === 'speciality-all-m' || thisInput.id === 'speciality-all-d') {
          allInputs
            .filter(item => item.id !== 'speciality-all-m' && item.id !== 'speciality-all-d')
            .forEach(item => item.checked = false)
        } else {
          allInputs
            .filter(item => item.id === 'speciality-all-m' || item.id === 'speciality-all-d')
            .forEach(item => item.checked = false)
        }
      })
    })
  }
}

export default Specialities
