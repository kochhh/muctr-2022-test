/* eslint-disable no-undef */
import { isMobile, isSafari } from '../utils/utils'

const Common = {
  init() {
    (function() {
      const doc = document.documentElement

      if (isSafari()) {
        doc.classList.add('safari')
      }

      if (isMobile()) {
        doc.classList.add('mobile')
      }
    })();

    (function() {
      const easeOutCubic = t => --t * t * t + 1
      const scrollTo = (yPos, duration = 600) => {
        const startY = window.scrollY
        const difference = yPos - startY
        const startTime = performance.now()

        const step = () => {
          const progress = (performance.now() - startTime) / duration
          const amount = easeOutCubic(progress)

          window.scrollTo({ top: startY + amount * difference })

          if (progress < .999) {
            window.requestAnimationFrame(step)
          }
        }

        step()
      }

      const navLinks = [].slice.call(document.querySelectorAll('[data-scroll]'))

      navLinks.forEach(link => {
        link.addEventListener('click', evt => {
          const hash = evt.target.closest('a').getAttribute('href').split('#')[1]
          const scrollTargetPosition = document.getElementById(hash).getBoundingClientRect().top + window.scrollY

          scrollTo(scrollTargetPosition)
        })
      })
    })();

    (function() {
      if (typeof GLightbox === 'undefined') return
      GLightbox()
    })();

    (function() {
      const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))

      popoverTriggerList.map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    })();

    (function() {
      const lazyImages = [].slice.call(document.querySelectorAll('.section-background img'))

      lazyImages.forEach(function(img) {
        img.addEventListener('lazyloaded', function(event) {
          setTimeout(() => {
            event.target.closest('.section-background').classList.add('images-loaded')
          }, 250)
        })
      })
    })();

    (function() {
      const lazyImages = [].slice.call(document.querySelectorAll('.lazybg'))
      const backgroundOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px',
      }

      const imageObserver = new IntersectionObserver(function(entries, imageObserver) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('lazybg')
            imageObserver.unobserve(entry.target)
          }
        })
      }, backgroundOptions)

      lazyImages.forEach(function(image) {
        imageObserver.observe(image)
      })
    })();
  }
}

export default Common
