const GetActualVh = {
  init() {
    setVh(window.innerHeight * .01)

    window.addEventListener('resize', function() {
      setVh(window.innerHeight * .01)
    })

    function setVh(value) {
      document.documentElement.style.setProperty('--vh', value.toFixed(2) + 'px')
    }
  }
}

export default GetActualVh
