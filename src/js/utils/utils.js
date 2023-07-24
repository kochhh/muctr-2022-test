export function debounce(callback, interval) {
  let debounceTimeoutId

  return function(...args) {
    clearTimeout(debounceTimeoutId)
    debounceTimeoutId = setTimeout(() => callback.apply(this, args), interval)
  }
}

export function throttle(callback, interval) {
  let enableCall = true

  return function(...args) {
    if (!enableCall) return

    enableCall = false
    callback.apply(this, args)
    setTimeout(() => enableCall = true, interval)
  }
}

export function isSafari() {
  return (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') <= -1)
}

export function isMobile() {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth < 768)
}
