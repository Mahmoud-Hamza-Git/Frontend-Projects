let numberOfButtons = document.querySelectorAll('.drum').length;
let tom1 = new Audio('sounds/tom-1.mp3');
let tom2 = new Audio('sounds/tom-2.mp3');
let tom3 = new Audio('sounds/tom-3.mp3');
let snare = new Audio('sounds/snare.mp3');
let crash = new Audio('sounds/crash.mp3');
let kick = new Audio('sounds/kick-bass.mp3');

for (let i = 0; i < numberOfButtons; i++) {
  document.querySelectorAll('.drum')[i].addEventListener('click', handleClick);
} //notice that this selector selects the firs button only

document.addEventListener('keydown', playSound);

function handleClick() {
  this.classList.toggle('black');
  let buttonPressed = this.innerHTML;
  switch (buttonPressed) {
    case 'w':
      tom1 = new Audio('sounds/tom-1.mp3');
      tom1.play();
      break;
    case 'a':
      tom2 = new Audio('sounds/tom-2.mp3');
      tom2.play();
      break;
    case 's':
      tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
      break;
    case 'd':
      tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
      break;
    case 'j':
      snare = new Audio('sounds/snare.mp3');
      snare.play();
      break;
    case 'k':
      crash = new Audio('sounds/crash.mp3');
      crash.play();
      break;
    case 'l':
      kick = new Audio('sounds/kick-bass.mp3');
      kick.play();
      break;
    default:
      console.log(buttonPressed);
  }
}

function playSound(Event) {
  switch (Event.key) {
    case 'w':
      document.querySelector('.w').classList.toggle('black');
      tom1 = new Audio('sounds/tom-1.mp3');
      tom1.play();
      break;
    case 'a':
      document.querySelector('.a').classList.toggle('black');
      tom2 = new Audio('sounds/tom-2.mp3');
      tom2.play();
      break;
    case 's':
      document.querySelector('.s').classList.toggle('black');
      tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
      break;
    case 'd':
      document.querySelector('.d').classList.toggle('black');
      tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
      break;
    case 'j':
      document.querySelector('.j').classList.toggle('black');
      snare = new Audio('sounds/snare.mp3');
      snare.play();
      break;
    case 'k':
      document.querySelector('.k').classList.toggle('black');
      crash = new Audio('sounds/crash.mp3');
      crash.play();
      break;
    case 'l':
      document.querySelector('.l').classList.toggle('black');
      kick = new Audio('sounds/kick-bass.mp3');
      kick.play();
      break;
    default:
      console.log(Event.key);
  }
}
