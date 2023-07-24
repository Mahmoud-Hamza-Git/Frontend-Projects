const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceImage = document.querySelector('.dice');
const btnOpenDescription = document.querySelector('.open--description');
const btnCloseDescription = document.querySelector('.close--description');
const gameDescription = document.querySelector('.game--description');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1'); 
const currentScore0El =  document.querySelector('#current--0');
const currentScore1El =  document.querySelector('#current--1');


let currentScore0 , currentScore1 , activePlayer , scores , playing;

const start = function(){
  activePlayer = 0 , scores = [0,0];
  currentScore0 = 0 , currentScore1 = 0;
  playing = true;
  score0El.innerHTML = '0';
  score1El.innerHTML = '0';
  currentScore0El.innerHTML = '0';
  currentScore1El.innerHTML = '0';
  diceImage.classList.add('hidden');
  document.querySelector('.player--active').classList.remove('player--winner');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
}
 
const switchPlayer = ()=>{
  activePlayer = activePlayer ? 0 : 1;
  currentScore0El.innerHTML=`${currentScore0 = 0}`;
  currentScore1El.innerHTML=`${currentScore1 = 0}`;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}


start();
btnRoll.addEventListener('click',()=>{
  if(playing){
    // Generate random number
    const dice = Math.trunc(Math.random()*6)+1;
    
    // Display the dice
    diceImage.src=`dice-${dice}.png`;
    diceImage.classList.remove('hidden');
    
    // Check for rolled 1
    if(dice != 1){
      activePlayer ? (currentScore1 += dice) : (currentScore0 += dice);  // Change the current score of the active player
      currentScore0El.innerHTML=`${currentScore0}`;  // Display current scores
      currentScore1El.innerHTML=`${currentScore1}`;
    }else{
      switchPlayer();
    }
  }
})

// hold current score when click hold button
btnHold.addEventListener('click',()=>{
  if(playing){
    score0El.innerHTML = `${scores[0] += currentScore0}`;  // Save scores in total score and display it.
    score1El.innerHTML = `${scores[1] += currentScore1}`;
    if(scores[activePlayer] >= 50){
      document.querySelector('.player--active').classList.add('player--winner');  // Activate the winner player style
      diceImage.classList.add('hidden');  // Hide the dice
      playing = false;                    // Stop the game
      currentScore0El.innerHTML=`${currentScore0 = 0}`;   // Current scores return to 0
      currentScore1El.innerHTML=`${currentScore1 = 0}`;
    }else{
      switchPlayer();
    }
  }
})

// start new game
btnNew.addEventListener('click',()=>{
  start();
})

// Open and Close description tab
btnOpenDescription.addEventListener('click',()=>{
  gameDescription.classList.remove('hidden');
})
btnCloseDescription.addEventListener('click',()=>{
  gameDescription.classList.add('hidden');
})