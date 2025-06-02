// Select elements based on your HTML
const navMenu = document.querySelector('.navHeader');
const logo = document.getElementById('logo');
const headerElem = document.querySelector('.header_section');
const btnBar = document.getElementById('barBtn');
const nav = document.querySelector('nav');
const barLine = document.querySelectorAll('.barline');



window.addEventListener('scroll', () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  if (scrollTop > 0) {
    logo.style.color = '#333'
    navMenu.style.background = '#fff';
    navMenu.style.padding = '1rem 0';
    barBtn.style.backgroundColor = '#333';
    barLine.forEach(line => line.style.backgroundColor = '#fff');
     nav.classList.add('scrolled');

  } else {
    logo.style.color = '#fff'
    navMenu.style.background = 'transparent';
    navMenu.style.padding = '1.5rem 0';
    barBtn.style.backgroundColor = '#fff';
    barLine.forEach(line => line.style.backgroundColor = '#333');
      nav.classList.remove('scrolled');
  }

  if (scrollTop >= 200) {
    navMenu.style.padding = '0.9rem';
    navMenu.style.boxShadow = '0 -4px 10px 1px #999'
  } else {
    navMenu.style.padding = '1rem 0';
    navMenu.style.boxShadow = 'none';
  }
})

btnBar.addEventListener('click', (e) => {
  e.stopPropagation();
  nav.classList.add('open');
  if (!nav.querySelector('#closeBtn')) {
    nav.insertAdjacentHTML('afterbegin', '<div id="closeBtn" class="fa-solid fa-xmark"></div>');
    nav.querySelector('#closeBtn').addEventListener('click', () => {
      nav.classList.remove('open');
      nav.querySelector('#closeBtn').remove();
    });
  }
});

// Close nav when clicking outside nav or btnBar
document.addEventListener('click', (e) => {
  // If nav is not open, do nothing
  if (!nav.classList.contains('open')) return;

  // If click is inside nav or btnBar, do nothing
  if (
    e.target.closest('#btnBar') ||
    e.target.closest('#nav-menu')
  ) {
    return;
  }

  // Otherwise, close nav and remove closeBtn if it exists
  nav.classList.remove('open');
  const closeBtn = nav.querySelector('#closeBtn');
  if (closeBtn) closeBtn.remove();
});



document.addEventListener('DOMContentLoaded', () => {

  const sliderBox = document.getElementById('properties-slider');
  const viewport = sliderBox.parentElement;
  const nextBtns = document.querySelectorAll('.slider-next');
  const prevBtns = document.querySelectorAll('.slider-prev');


  let slidesToShow;
  let singlesSliders;
  let slideWidth;
  let currentIndex;
  let isTransitioning = false;



  function getSlidesToShow() {
    const width = window.innerWidth;
    if (width <= 556) return 1;
    if (width <= 767) return 2;
    if (width <= 991) return 3;
    return 4; 
  }

  function setSlideWidths() {
    slidesToShow = getSlidesToShow();
    const gap = 12; // px, must match $slider-gap in SCSS
    const viewportWidth = viewport.offsetWidth;
    const totalGap = gap * (slidesToShow - 1);
    slideWidth = (viewportWidth - totalGap) / slidesToShow;
    singlesSliders.forEach(slide => {
      slide.style.width = slideWidth + 'px';
      slide.style.minWidth = slideWidth + 'px';
      slide.style.maxWidth = slideWidth + 'px';
      slide.style.flex = `0 0 ${slideWidth}px`;
    });
  }




  function rebuildClones() {
    Array.from(sliderBox.querySelectorAll('.single-slider.clone')).forEach(clone => clone.remove());
    slidesToShow = getSlidesToShow();
    let orginals = Array.from(sliderBox.querySelectorAll('.single-slider:not(.clone)'));

    for (let i = 0; i < slidesToShow; i++) {
      const clone = orginals[i].cloneNode(true);
      sliderBox.appendChild(clone);
    }
    for (let i = 0; i < slidesToShow; i++) {
      const clone = orginals[orginals.length - 1 - i].cloneNode(true);
      clone.classList.add('clone');
      sliderBox.insertBefore(clone, sliderBox.firstChild);

    }
    singlesSliders = Array.from(sliderBox.querySelectorAll('.single-slider'));
    setSlideWidths();
    currentIndex = slidesToShow;
    goToSlide(currentIndex, false);
  }

  function setTransition(enable) {
   
    sliderBox.style.transition = enable ? 'transform 0.4s ease-in-out' : 'none';
  }

  function goToSlide(index, animate = true) {
    setTransition(animate);
    const gap = 12;
    sliderBox.style.transform = `translateX(-${index * (slideWidth + gap)}px)`;
  

  }
  function handleNext() {
  
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
  
    goToSlide(currentIndex, true);
     console.log(currentIndex)
    console.log(singlesSliders.length);
    console.log(slidesToShow)
    if (currentIndex === singlesSliders.length - slidesToShow) {
      setTimeout(() => {
         setTransition(false);
        currentIndex = slidesToShow;
        goToSlide(currentIndex, false);
        isTransitioning = false;
      }, 400)
    } else {
      setTimeout(() => { isTransitioning = false }, 400)
    }
  }
  function handlePrev() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    goToSlide(currentIndex, true);
    if (currentIndex === 0) {
      setTimeout(() => {
        setTransition(false);
        currentIndex = singlesSliders.length - slidesToShow * 2;
        goToSlide(currentIndex, false);
        isTransitioning = false;
      }, 400);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 400)
    }
  }

   nextBtns.forEach(btn => btn.addEventListener('click', handleNext));
  prevBtns.forEach(btn => btn.addEventListener('click', handlePrev));
  window.addEventListener('resize', rebuildClones);

  singlesSliders = Array.from(sliderBox.querySelectorAll('.single-slider'));
  rebuildClones();
})
  var swiper = new Swiper(".mySwiper", {
      loop:true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });