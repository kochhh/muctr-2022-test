/* eslint-disable no-undef */
const Animations = {
  init() {
    // On-scroll animations
    if (typeof gsap === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    gsap.utils.toArray('[data-animation="fade-in-right"]').forEach(function(item) {
      const delay = +item.getAttribute('data-animation-delay')
      ScrollTrigger.create({
        trigger: item,
        animation: gsap.fromTo(item, { autoAlpha: 0, x: -50 }, { duration: .85, autoAlpha: 1, x: 0, delay: delay }),
        once: true,
      })
    })

    gsap.utils.toArray('[data-animation="fade-in-left"]').forEach(function(item) {
      const delay = +item.getAttribute('data-animation-delay')
      ScrollTrigger.create({
        trigger: item,
        animation: gsap.fromTo(item, { autoAlpha: 0, x: 50 }, { duration: .85, autoAlpha: 1, x: 0, delay: delay }),
        once: true,
      })
    })

    gsap.utils.toArray('[data-animation="fade-in-top"]').forEach(function(item) {
      const delay = +item.getAttribute('data-animation-delay')
      ScrollTrigger.create({
        trigger: item,
        animation: gsap.fromTo(item, { autoAlpha: 0, y: 50 }, { duration: .85, autoAlpha: 1, y: 0, delay: delay }),
        once: true,
      })
    })

    adjustStatsWidths()

    gsap.utils.toArray('.facts-stats-item__value-real').forEach(function(item) {
      ScrollTrigger.create({
        trigger: item,
        animation: gsap.from(item, {
          textContent: 0,
          duration: 2.5,
          ease: 'power1.out',
          snap: { textContent: 1 },
        }),
        once: true,
      })
    })

    let statTimer

    window.addEventListener('resize', function() {
      clearTimeout(statTimer)
      statTimer = setTimeout(() => {
        adjustStatsWidths()
      }, 0)
    })

    function adjustStatsWidths() {
      document.fonts.ready.then(function() {
        if (document.fonts.check('16px/700 Akzidenz-Grotesk Pro Extended')) {
          const helpers = gsap.utils.toArray('.facts-stats-item__value-helper')
          helpers.forEach(function(item) {
            item.closest('.facts-stats-item__value').style.width = item.offsetWidth + 'px'
          })
        }
      })
    }
  }
}

export default Animations
