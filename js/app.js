/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const secNumber = sections.length;
const ul = document.querySelector('ul');
/*
 * End Global Variables
 * Begin Main Functions
*/

// build the nav
function buildNavMenu(){
    const fragment = document.createDocumentFragment();
    for(let i=0 ; i<secNumber ; i++){
        const dataNav = sections[i].dataset.nav;
        const id = sections[i].id;
        const link = `<a href="#${id}" class="menu__link">${dataNav}</a>`;
        const listItem = document.createElement('li');
        listItem.insertAdjacentHTML('afterbegin',link);
        fragment.appendChild(listItem);
    }
    document.getElementById("navbar__list").appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function highLight(){
    // console.log(sections[1].getBoundingClientRect().top);
    for(let i=0 ; i<secNumber ; i++){
        if(sections[i].getBoundingClientRect().top >= 0 && sections[i].getBoundingClientRect().top <= 400){
            sections[i].classList.add('your-active-class');
            document.querySelector(`[href = "#${sections[i].id}"]`).classList.add('high_light');
        }else{
            sections[i].classList.remove('your-active-class');
            document.querySelector(`[href = "#${sections[i].id}"]`).classList.remove('high_light');
        }
    }
}


/*
 * End Main Functions
 * Begin Events
*/

// Build menu 
document.addEventListener("DOMContentLoaded",buildNavMenu)

// Scroll to anchor ID using scrollTO event
ul.addEventListener('click',function(event){ //Using event delegation
    event.preventDefault();
    const id = event.target.getAttribute('href').substr(1);
    document.querySelector(`#${id}`).scrollIntoView({behavior: "smooth" , block: "center"});
})

// Set sections as active
document.addEventListener('scroll',highLight)

// toggler
document.querySelector('.burger').addEventListener('click',function(){
    document.querySelector('.navbar__menu').classList.toggle('toggler');
})
