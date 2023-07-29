// GLOBALS
const burger = document.querySelector('.burger');
const closeNav = document.querySelector('.nav_close');
const nav = document.querySelector('.nav');
const rightArrow = document.querySelector('.right_arrow');
const leftArrow = document.querySelector('.left_arrow');
const pagesWrapper = document.querySelector('.pages_wrapper');
const skillsWrapper = document.querySelector('.skills_sec');
const projectsBox = document.querySelector('.p_box');
const dotsContainer = document.querySelector('.p_circles');
const pNavBtns = document.querySelectorAll('.p_nav_btn');
let pagesElements;
let slideIndex = 0;
let slidesNum;
let maxSlides;

// NavBar
burger.addEventListener('click', (e) => {
  nav.classList.toggle('active');
});

closeNav.addEventListener('click', (e) => {
  nav.classList.remove('active');
});

// Typed
var typed = new Typed('.typing', {
  strings: ['fresh graduate software engineer ', 'frontend developer', 'backend developer'],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 800,
});

// Smooth Scrolling (using event delegation)
// const navList = document.querySelector('.nav_list');
// navList.addEventListener('click', (e) => {
//   e.preventDefault();
//   window.scrollTo({
//     top: document.querySelector(`${e.target.attributes?.href.value}`).offsetTop - 79,
//     left: 100,
//     behavior: 'smooth',
//   });
// });

// Smooth Scrolling
const links = document.querySelectorAll('a[href*="#"]');
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); //don't forget it
    window.scrollTo({
      top: document.querySelector(`${link.attributes?.href?.value}`).offsetTop - 79,
      left: 10,
      behavior: 'smooth',
    });
  });
});

// Tints
VanillaTilt.init(document.querySelector('.personal_img'), {
  max: 25,
  speed: 400,
});

//////////////////////////////
// ADDING CONTENT TO THE PAGE
//////////////////////////////
async function main() {
  displayProjects();

  // Litening to update projects
  updateProjects();

  // Adding Skills
  addingSkills();

  // Adding Writing Pages
  await addingPages();

  // Listening to window resizing and initiate sliding variables
  resizingSlides();

  // Activate Sliding pages
  startSliding();

  /*  SCROLL REVEAL ANIMATION  */
  revealingScroll(); // put it at the end as it some bugs may happens if some elements delayed to render
}
main();

////////////////////
// FUNCTIONS
////////////////////

// Later Apply Open Close principle
async function displayProjects(type = 'frontend') {
  const data = await fetchData(type);
  const dotsNumber = Math.ceil(data.length / 3);
  createProjects(data, dotsNumber);

  VanillaTilt.init([...document.querySelectorAll('.project')], {
    max: 25,
    speed: 400,
  });

  // initialy add active class to the first circle
  document.querySelector('.p_circle').classList.add('active');
  document.querySelector('.p_circles').addEventListener('click', handleDotsClicks);
}

// handle circles clicks
function handleDotsClicks(e) {
  if (e.target.classList.value == 'p_circle') {
    // removes active class from all circles
    [...dotsContainer.children].forEach((circle) => {
      circle.classList.remove('active');
    });
    // only add active to clicked circle
    e.target.classList.add('active');

    const dotIndex = Array.prototype.indexOf.call(dotsContainer.children, e.target);

    const projectsSections = document.querySelectorAll('.projects_sec');

    projectsSections.forEach((sec) => {
      sec.style.transform = `translateX(-${dotIndex * 100}%)`;
    });
  }
}

// create projects HTML
function createProjects(data, dotsNumber) {
  let boxesHTML = ``;
  let dotsHTML = ``;
  for (let j = 0; j < dotsNumber; j++) {
    dotsHTML += `<div class="p_circle"></div>`;

    let projectsHTML = ``;

    for (let i = 0; i < 3; i++) {
      if (!data[i + j * 3]) {
        projectsHTML += `<div style="min-height:30rem"></div>`;
      } else {
        projectsHTML += `
          <div class="project" style="background-image: url('${data[i + j * 3].img}');">
            <div class="project_overlay">
              <h2 class="p_head">${data[i + j * 3].name}</h2>
              <div class="p_desc_wrapper">
                <p class="p_desc">${data[i + j * 3].desc}</p>
                <div class="p_btns">
                  <a href="${data[i + j * 3].repo_link}" target="_blank" class="p_btn">repo</a>
                  <a href="${data[i + j * 3].demo_link}" target="_blank" class="p_btn">demo</a>
                </div>
              </div>
            </div>
          </div>
          `;
      }
    }

    let containerHTML = `<div class="projects_sec">${projectsHTML}</div>`;
    boxesHTML += containerHTML;
  }

  projectsBox.innerHTML = boxesHTML;
  dotsContainer.innerHTML = dotsHTML;
}

// Update projects if btns clicked
function updateProjects() {
  pNavBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // DeActivate not targeted buttons
      pNavBtns.forEach((button) => {
        button.classList.remove('active');
        button.disabled = false;
      });

      // Activate Targeted button
      e.target.classList.add('active');
      e.target.disabled = true;

      // Update the Displayed content
      const type = e.target.textContent.trim().toLowerCase();
      displayProjects(type);
    });
  });
}

// ADDING PAGES
async function addingPages() {
  await fetchData('writings').then((data) => {
    slidesNum = data.length;
    maxSlides = slidesNum - 4;
    let pagesHTML = ``;
    for (let i = 0; i < data.length; i++) {
      pagesHTML += `
      <li class="page">
        <a target="_blank" href="${data[i].link}">
          <i class="fa-solid fa-book-open-reader"></i>
          <p>${data[i].name}</p>
        </a>
      </li>
    `;
    }
    pagesWrapper.innerHTML = pagesHTML;
    pagesElements = document.querySelectorAll('.page');
  });
}

// Changing maxSlides when resizing
function resizingSlides() {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 870) {
      maxSlides = slidesNum - 4;
    } else if (window.innerWidth <= 1000 && window.innerWidth > 550) {
      maxSlides = slidesNum - 2;
    } else if (window.innerWidth <= 550) {
      maxSlides = slidesNum - 1;
    }
  });
}

// 0 1 2 (zero and 2 steps) --> all steps is moving in the negative direction
function startSliding() {
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
}

// adding skills
function addingSkills() {
  fetchData('skills').then((data) => {
    let skillsHTML = ``;
    for (let i = 0; i < data.length; i++) {
      skillsHTML += `
        <div class="skill">
          <div class="skill_content">
            <img class="skill_img" src="${data[i].icon}" alt="" />
            <p class="skill_name">${data[i].name}</p>
          </div>
        </div>
      `;
    }
    skillsWrapper.innerHTML = skillsHTML;
  });
}

/* SCROLL REVEAL ANIMATION  */
function revealingScroll() {
  ScrollReveal({ origin: 'left', distance: '30rem', duration: 2000, reset: true }).reveal(
    '.main_img, .main_content, .writings',
    { delay: 100 }
  );
  ScrollReveal({ origin: 'right', distance: '30rem', duration: 2000, reset: true }).reveal('.edu_card', {
    delay: 100,
  });
  ScrollReveal({ origin: 'bottom', distance: '30rem', duration: 2000, reset: true }).reveal(
    '.skills_sec, .social_btn',
    { delay: 100 }
  );
}

async function fetchData(type) {
  const res = await fetch('./assets/data.json');
  const data = await res.json();
  return data[type];
}
