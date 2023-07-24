(function() {
    'use strict';

    const AvifSupport = {
        init() {
            const image = new Image();
            image.onload = image.onerror = function() {
                setClass(image.height, 'avif');
            };
            image.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A';

            function setClass(height, className) {
                document.documentElement.classList.add((height === 2 ? '' : 'no-') + className);
            }
        }
    };

    /* eslint-disable no-undef */
    const Animations = {
        init() {
            // On-scroll animations
            if (typeof gsap == 'undefined') return;
            gsap.registerPlugin(ScrollTrigger);
            gsap.utils.toArray('[data-animation="fade-in-right"]').forEach(function(item) {
                const delay = +item.getAttribute('data-animation-delay');
                ScrollTrigger.create({
                    trigger: item,
                    animation: gsap.fromTo(item, {
                        autoAlpha: 0,
                        x: -50
                    }, {
                        duration: .85,
                        autoAlpha: 1,
                        x: 0,
                        delay: delay
                    }),
                    once: true
                });
            });
            gsap.utils.toArray('[data-animation="fade-in-left"]').forEach(function(item) {
                const delay = +item.getAttribute('data-animation-delay');
                ScrollTrigger.create({
                    trigger: item,
                    animation: gsap.fromTo(item, {
                        autoAlpha: 0,
                        x: 50
                    }, {
                        duration: .85,
                        autoAlpha: 1,
                        x: 0,
                        delay: delay
                    }),
                    once: true
                });
            });
            gsap.utils.toArray('[data-animation="fade-in-top"]').forEach(function(item) {
                const delay = +item.getAttribute('data-animation-delay');
                ScrollTrigger.create({
                    trigger: item,
                    animation: gsap.fromTo(item, {
                        autoAlpha: 0,
                        y: 50
                    }, {
                        duration: .85,
                        autoAlpha: 1,
                        y: 0,
                        delay: delay
                    }),
                    once: true
                });
            });
            adjustStatsWidths();
            gsap.utils.toArray('.facts-stats-item__value-real').forEach(function(item) {
                ScrollTrigger.create({
                    trigger: item,
                    animation: gsap.from(item, {
                        textContent: 0,
                        duration: 2.5,
                        ease: 'power1.out',
                        snap: {
                            textContent: 1
                        }
                    }),
                    once: true
                });
            });
            let statTimer;
            window.addEventListener('resize', function() {
                clearTimeout(statTimer);
                statTimer = setTimeout(() => {
                    adjustStatsWidths();
                }, 0);
            });

            function adjustStatsWidths() {
                document.fonts.ready.then(function() {
                    if (document.fonts.check('16px/700 Akzidenz-Grotesk Pro Extended')) {
                        const helpers = gsap.utils.toArray('.facts-stats-item__value-helper');
                        helpers.forEach(function(item) {
                            item.closest('.facts-stats-item__value').style.width = item.offsetWidth + 'px';
                        });
                    }
                });
            }
        }
    };

    function isSafari() {
        return navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') <= -1;
    }

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth < 768;
    }

    /* eslint-disable no-undef */
    const Common = {
        init() {
            (function() {
                const doc = document.documentElement;
                if (isSafari()) {
                    doc.classList.add('safari');
                }
                if (isMobile()) {
                    doc.classList.add('mobile');
                }
            })();
            (function() {
                const easeOutCubic = t => --t * t * t + 1;
                const scrollTo = function(yPos) {
                    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 600;
                    const startY = window.scrollY;
                    const difference = yPos - startY;
                    const startTime = performance.now();
                    const step = () => {
                        const progress = (performance.now() - startTime) / duration;
                        const amount = easeOutCubic(progress);
                        window.scrollTo({
                            top: startY + amount * difference
                        });
                        if (progress < .999) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    step();
                };
                const navLinks = [].slice.call(document.querySelectorAll('[data-scroll]'));
                navLinks.forEach(link => {
                    link.addEventListener('click', evt => {
                        const hash = evt.target.closest('a').getAttribute('href').split('#')[1];
                        const scrollTargetPosition = document.getElementById(hash).getBoundingClientRect().top + window.scrollY;
                        scrollTo(scrollTargetPosition);
                    });
                });
            })();
            (function() {
                if (typeof GLightbox === 'undefined') return;
                GLightbox();
            })();
            (function() {
                const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
                popoverTriggerList.map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
            })();
            (function() {
                const lazyImages = [].slice.call(document.querySelectorAll('.section-background img'));
                lazyImages.forEach(function(img) {
                    img.addEventListener('lazyloaded', function(event) {
                        setTimeout(() => {
                            event.target.closest('.section-background').classList.add('images-loaded');
                        }, 250);
                    });
                });
            })();
            (function() {
                const lazyImages = [].slice.call(document.querySelectorAll('.lazybg'));
                const backgroundOptions = {
                    threshold: 0,
                    rootMargin: '0px 0px 50px 0px'
                };
                const imageObserver = new IntersectionObserver(function(entries, imageObserver) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.remove('lazybg');
                            imageObserver.unobserve(entry.target);
                        }
                    });
                }, backgroundOptions);
                lazyImages.forEach(function(image) {
                    imageObserver.observe(image);
                });
            })();
        }
    };

    /* eslint-disable no-undef */
    const Header = {
        init() {
            const body = document.body;
            const nav = document.querySelector('#navigation');
            const navLinks = document.querySelectorAll('#navigation .nav-link');
            const mql = window.matchMedia('(min-width: 1440px)');
            const openClass = 'menu-open';
            const scrolledClass = 'is-scrolled';
            const mobileClickHandler = () => {
                new bootstrap.Collapse(nav, {
                    hide: true
                });
            };
            const backdropShow = () => {
                const backdrop = document.createElement('div');
                backdrop.className = 'navbar-backdrop';
                navbar.appendChild(backdrop);
                setTimeout(() => {
                    backdrop.classList.add('show');
                }, 0);
            };
            const backdropHide = () => {
                const backdrop = navbar.querySelector('.navbar-backdrop');
                if (!backdrop) return;
                backdrop.classList.remove('show');
                setTimeout(() => {
                    backdrop.remove();
                }, 250);
            };
            if (!mql.matches) {
                [].slice.call(navLinks).forEach(item => {
                    item.addEventListener('click', mobileClickHandler);
                });
            }
            mql.addEventListener('change', evt => {
                if (evt.matches) {
                    [].slice.call(navLinks).forEach(item => {
                        item.removeEventListener('click', mobileClickHandler);
                    });
                } else {
                    [].slice.call(navLinks).forEach(item => {
                        item.addEventListener('click', mobileClickHandler);
                    });
                }
            });
            nav.addEventListener('show.bs.collapse', () => {
                backdropShow();
                nav.classList.add('show');
                setTimeout(() => {
                    body.classList.add(openClass);
                }, 150);
            });
            nav.addEventListener('hide.bs.collapse', () => {
                backdropHide();
                body.classList.remove(openClass);
            });
            window.addEventListener('scroll', () => {
                const scrollTop = window.scrollY;
                body.classList.toggle(scrolledClass, scrollTop > 0);
            });
        }
    };

    /* eslint-disable no-undef */
    const Hero = {
        init() {
            const specialitiesContainer = document.querySelector('.hero-spec-container');
            const specialities = document.querySelector('.hero-spec');
            const about = document.querySelector('.hero-about-slider');
            const title = document.querySelector('.hero-about__title');
            let specialitiesSlider,
                aboutSlider = null;
            let timer;
            if (!specialities || !about) return;
            document.fonts.ready.then(function() {
                document.documentElement.classList.add('fonts-loaded');
                slidersInit();
                // setTimeout(() => {
                //   slidersInit()
                // }, 250)
            });

            window.addEventListener('resize', function() {
                if (isMobile()) return;
                slidersDestroy();
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    slidersInit();
                }, 250);
            }, true);

            function slidersInit() {
                title.classList.add('is-loaded');
                if (!specialitiesSlider) {
                    specialitiesSlider = new Swiper(specialities, {
                        direction: 'vertical',
                        freeMode: {
                            enabled: true,
                            sticky: true
                        },
                        slidesPerView: 'auto',
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        loop: true,
                        mousewheel: true,
                        initialSlide: 4,
                        loopedSlides: 10,
                        speed: 500,
                        navigation: {
                            prevEl: specialitiesContainer.querySelector('.swiper-button-prev'),
                            nextEl: specialitiesContainer.querySelector('.swiper-button-next')
                        },
                        breakpoints: {
                            0: {
                                spaceBetween: 28
                            },
                            768: {
                                spaceBetween: 30
                            },
                            1440: {
                                spaceBetween: 60
                            },
                            1900: {
                                spaceBetween: 64
                            }
                        },
                        autoplay: {
                            delay: 3000
                        }
                    });
                }
                if (!aboutSlider) {
                    aboutSlider = new Swiper(about, {
                        loop: true,
                        allowTouchMove: false,
                        cssMode: true,
                        initialSlide: 4,
                        loopedSlides: 10
                    });
                }
                if (specialitiesSlider.controller) {
                    specialitiesSlider.controller.control = aboutSlider;
                }
                if (isMobile()) {
                    specialitiesSlider.autoplay.stop();
                } else {
                    specialitiesSlider.autoplay.start();
                }
            }

            function slidersDestroy() {
                if (specialitiesSlider) {
                    specialitiesSlider.destroy();
                    specialitiesSlider = null;
                }
                if (aboutSlider) {
                    aboutSlider.destroy();
                    aboutSlider = null;
                }
            }
        }
    };

    /* eslint-disable no-undef */
    const Facts = {
        init() {
            const facts = document.querySelector('.facts-slider');
            const factsWrapper = document.querySelector('.facts-slider-wrapper');
            if (!facts) {
                return;
            }
            new Swiper(facts, {
                speed: 500,
                loop: true,
                effect: 'creative',
                creativeEffect: {
                    prev: {
                        shadow: false,
                        translate: ['-120%', 0, -400]
                    },
                    next: {
                        shadow: false,
                        translate: ['120%', 0, -400]
                    }
                },
                pagination: {
                    el: factsWrapper.querySelector('.swiper-pagination'),
                    type: 'fraction'
                },
                navigation: {
                    prevEl: factsWrapper.querySelector('.swiper-button-prev'),
                    nextEl: factsWrapper.querySelector('.swiper-button-next')
                },
                noSwipingClass: 'facts-slide__button'
            });
        }
    };

    /* eslint-disable no-undef */
    const Specialities = {
        init() {
            const specialities = document.querySelector('.specialities-slider');
            const filter = document.querySelector('.specialities-filter');
            if (!specialities) {
                return;
            }
            new Swiper(specialities, {
                loop: true,
                speed: 500,
                autoHeight: true,
                effect: 'creative',
                creativeEffect: {
                    prev: {
                        shadow: false,
                        translate: ['-120%', 0, -400]
                    },
                    next: {
                        shadow: false,
                        translate: ['120%', 0, -400]
                    }
                },
                navigation: {
                    prevEl: '[data-btn-prev]',
                    nextEl: '[data-btn-next]'
                }
            });
            [].slice.call(filter.querySelectorAll('.tabs-button__input')).forEach(function(checkbox) {
                checkbox.addEventListener('change', function(event) {
                    const thisInput = event.target;
                    const allInputs = [].slice.call(thisInput.closest('.specialities-filter').querySelectorAll('.tabs-button__input'));
                    if (thisInput.id === 'speciality-all-m' || thisInput.id === 'speciality-all-d') {
                        allInputs.filter(item => item.id !== 'speciality-all-m' && item.id !== 'speciality-all-d').forEach(item => item.checked = false);
                    } else {
                        allInputs.filter(item => item.id === 'speciality-all-m' || item.id === 'speciality-all-d').forEach(item => item.checked = false);
                    }
                });
            });
        }
    };

    /* eslint-disable no-undef */
    const Events = {
        init() {
            const events = document.querySelector('.events-slider');
            const eventsContainer = document.querySelector('.events-slider-container');
            if (!events) return;
            new Swiper(events, {
                speed: 400,
                slidesPerView: 'auto',
                setWrapperSize: true,
                navigation: {
                    prevEl: eventsContainer.querySelector('.swiper-button-prev'),
                    nextEl: eventsContainer.querySelector('.swiper-button-next')
                },
                breakpoints: {
                    0: {
                        spaceBetween: 36
                    },
                    1020: {
                        spaceBetween: 40
                    }
                },
                a11y: {
                    enabled: false
                }
            });
            const container = document.querySelector('.section--events');
            const items = [].slice.call(document.querySelectorAll('.events-decor'));
            const windowW = window.innerWidth;
            const windowH = window.innerHeight;
            container.addEventListener('mousemove', function(event) {
                if (isMobile()) return;
                const x = ((event.clientX / windowW * 100).toFixed(1) - 50) / 8;
                const y = ((event.clientY / windowH * 100).toFixed(1) - 50) / 8;
                items.forEach(item => item.style.transform = `translate3d(${x * item.dataset.x}px, ${y * item.dataset.y}px, 0)`);
            });
        }
    };

    /* eslint-disable no-undef */
    const Faces = {
        init() {
            const faces = document.querySelector('.faces-slider');
            const facesContainer = document.querySelector('.faces-slider-container');
            if (!faces) {
                return;
            }
            new Swiper(faces, {
                speed: 400,
                slidesPerView: 'auto',
                navigation: {
                    prevEl: facesContainer.querySelector('.swiper-button-prev'),
                    nextEl: facesContainer.querySelector('.swiper-button-next')
                },
                breakpoints: {
                    0: {
                        spaceBetween: 20
                    },
                    1020: {
                        spaceBetween: 30
                    },
                    1440: {
                        spaceBetween: 60
                    },
                    1900: {
                        spaceBetween: 80
                    }
                },
                a11y: {
                    enabled: false
                }
            });
        }
    };

    window.addEventListener('DOMContentLoaded', function() {
        AvifSupport.init();
        Animations.init();
        Common.init();
        // Gradients.init()
        Header.init();
        Hero.init();
        Facts.init();
        Specialities.init();
        Events.init();
        Faces.init();
    });

})();