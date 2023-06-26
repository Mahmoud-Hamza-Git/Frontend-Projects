// GLOBALS
const burger = document.querySelector('.burger');
const closeNav = document.querySelector('.nav_close');
const nav = document.querySelector('.nav');
const rightArrow = document.querySelector('.right_arrow');
const leftArrow = document.querySelector('.left_arrow');
let slideIndex = 0;
const slidesNum = 6;
let maxSlides = slidesNum - 4;

// Canging maxSlides when resizing
window.addEventListener('resize', () => {
  if (window.innerWidth > 870) {
    maxSlides = slidesNum - 4;
  } else if (window.innerWidth <= 1000 && window.innerWidth > 550) {
    maxSlides = slidesNum - 2;
  } else if (window.innerWidth <= 550) {
    maxSlides = slidesNum - 1;
  }
});

// NavBar
burger.addEventListener('click', (e) => {
  nav.classList.toggle('active');
});

closeNav.addEventListener('click', (e) => {
  nav.classList.remove('active');
});

// Tints
VanillaTilt.init([document.querySelector('.personal_img'), ...document.querySelectorAll('.project')], {
  max: 25,
  speed: 400,
});

// Typed
var typed = new Typed('.typing', {
  strings: ['Senior Computer Science Student', 'frontend developer', 'backend developer'],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 800,
});

//Scroll Reveal
/* ===== SCROLL REVEAL ANIMATION ===== */
const leftScroll = ScrollReveal({ origin: 'left', distance: '30rem', duration: 2000, reset: true }).reveal(
  '.main_img, .main_content, .writings',
  { delay: 100 }
);
const rightScroll = ScrollReveal({ origin: 'right', distance: '30rem', duration: 2000, reset: true }).reveal(
  '.edu_card',
  { delay: 100 }
);
const bottomScroll = ScrollReveal({
  origin: 'bottom',
  distance: '30rem',
  duration: 2000,
  reset: true,
}).reveal('.skills_sec, .social_btn, .projects_sec', { delay: 100 });

// SLIDING
// 0 1 2 (zero and 2 steps) --> all steps is moving in the negative direction
rightArrow.addEventListener('click', () => {
  slideIndex++;
  if (slideIndex <= maxSlides) {
    // move
    pagesElements.forEach((page) => {
      page.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
    // enable the other button & disable this button if reaches the end
    if (slideIndex == 1) leftArrow.classList.remove('disabled');
    if (slideIndex == maxSlides) rightArrow.classList.add('disabled');
  } else {
    // keep the index not change on the maxslide
    slideIndex--;
    // disable the button
    rightArrow.classList.add('disabled');
  }
});

leftArrow.addEventListener('click', () => {
  slideIndex--;
  if (slideIndex >= 0) {
    // move
    pagesElements.forEach((page) => {
      page.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
    // enable the other button & disable my this button if reaches the end
    rightArrow.classList.remove('disabled');
    if (slideIndex == 0) leftArrow.classList.add('disabled');
  } else {
    // keep the index not change on the starting slide
    slideIndex++;
    // disable the button
    leftArrow.classList.add('disabled');
  }
});

// ADDING PAGES
const pagesWrapper = document.querySelector('.pages_wrapper');
let pagesHTML = ``;
for (let i = 0; i < slidesNum; i++) {
  pagesHTML += `
    <li class="page">
      <a target="_blank" href="#">
        <i class="fa-solid fa-book-open-reader"></i>
        <p>Design Patterns</p>
      </a>
    </li>
  `;
}
pagesWrapper.innerHTML = pagesHTML;
const pagesElements = document.querySelectorAll('.page');

// Adding Skills
const skillsWrapper = document.querySelector('.skills_sec');
let skillsHTML = ``;
for (let i = 0; i < 15; i++) {
  skillsHTML += `
    <div class="skill">
      <div class="skill_content">
        <img class="skill_img" src="./assets/images/reactQuery.svg" alt="" />
        <p class="skill_name">React Query</p>
      </div>
    </div>
  `;
}
skillsWrapper.innerHTML = skillsHTML;
