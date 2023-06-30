///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();

const links = document.querySelectorAll(`a[href*='#']`);
console.log(links);
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: document.querySelector(`${link.attributes?.href?.value}`).offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  });
});

const header = document.querySelector('.header');
const btnNav = document.querySelector('.btn-mobile-nav');
btnNav.addEventListener('click', () => {
  header.classList.toggle('nav-open');
});
