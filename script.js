'use strict';
const showModalBtns = document.querySelectorAll('.show-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const btnClose = document.querySelector('.close-modal');

const openModal = ()=>{
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
}
const closeModal = ()=>{
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
}

//-------------- The Event Listeners ------------------//
for(let i=0 ; i<showModalBtns.length  ;i++){
  showModalBtns[i].addEventListener('click',openModal)
}

//listen to the close btn to close the modal.
btnClose.addEventListener('click',closeModal)

// listen to click on the backgroud of the modal to close it.
overlay.addEventListener('click',closeModal)

// listen to Escape key to close the modal.
document.addEventListener('keydown',function(e){
  if( e.key === 'Escape'&& !modal.classList.contains('hidden') ){
    closeModal();
  }
})
