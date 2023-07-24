import AvifSupport from './common/avif-support'
import Animations from './common/animations'
import Common from './common/common'
// import Gradients from './gradients/gradients'
import Header from '../blocks/modules/header/header'
import Hero from '../blocks/modules/hero/hero'
import Facts from '../blocks/modules/facts/facts'
import Specialities from '../blocks/modules/specialities/specialities'
import Events from '../blocks/modules/events/events'
import Faces from '../blocks/modules/faces/faces'

window.addEventListener('DOMContentLoaded', function() {
  AvifSupport.init()
  Animations.init()
  Common.init()
  // Gradients.init()
  Header.init()
  Hero.init()
  Facts.init()
  Specialities.init()
  Events.init()
  Faces.init()
})
