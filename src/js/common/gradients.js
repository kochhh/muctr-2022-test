import { throttle } from '../utils/utils'

const Gradients = {
  init() {
    let backgroundsCoordsArray = []

    lazyImages()

    document.addEventListener('mousemove', throttle(getHoveredBackground, 300))

    // window.addEventListener('resize', function() {
    // }, true)

    function lazyImages() {
      const lazyImages = [].slice.call(document.querySelectorAll('.section-background img'))

      lazyImages.forEach(function(img) {
        img.addEventListener('lazyloaded', function(event) {
          event.target.closest('.section-background').classList.add('images-loaded')

          backgroundsCoordsArray.push(getBackgroundCoords(img))

          console.log(backgroundsCoordsArray)
        })
      })
    }

    function getBackgroundCoords(el) {
      const rect = el.getBoundingClientRect()
      const l = rect.left
      const t = rect.top + document.documentElement.scrollTop
      const r = l + el.offsetWidth
      const b = t + el.offsetHeight

      return { l, t, r, b }
    }

    function getHoveredBackground(e) {
      if (
        e.pageX > backgroundsCoordsArray[0].l && e.pageX < backgroundsCoordsArray[0].r &&
        e.pageY > backgroundsCoordsArray[0].t && e.pageY < backgroundsCoordsArray[0].b
      ) {
        console.log('Hovered background: 0')
      }
    }
  }
}

export default Gradients
