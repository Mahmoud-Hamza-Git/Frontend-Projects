let secretNumber = Math.trunc(Math.random()*20)+1;
const message = document.querySelector(".message");
const resetButton = document.querySelector('.reset-btn');
const checkButton = document.querySelector('.check-btn');
const number = document.querySelector('.random-number');
const inputNumber = document.querySelector('.player-number');
const scoreText = document.querySelector('.score');
const highscoreText = document.querySelector('.highscore');


let score = 20;
let highscore = 0;

checkButton.addEventListener('click',function(){
  const guessNumber = Number(inputNumber.value);
  const diff = Math.abs(secretNumber - guessNumber);
  if(guessNumber > secretNumber && diff > 5){
    editResult("Too High");
  }else if(guessNumber > secretNumber &&  diff<=5  &&  diff>2){
    editResult("High");
  }else if(guessNumber > secretNumber &&  diff<=2 ){
    editResult("A little bit high");
  }else if(guessNumber < secretNumber && diff > 5){
    editResult("Too Low");
  }else if(guessNumber < secretNumber && diff<=5  &&  diff>2){
    editResult("Low");
  }else if(guessNumber < secretNumber && diff<=2){
    editResult("A little bit low");
  }else if(guessNumber == secretNumber){
    message.innerHTML = `🎉 Correct<br />&nbsp;&nbsp; number!`;
    number.textContent = secretNumber;
    document.body.style.backgroundColor = 'green';
    if(score > highscore){
      highscore = score;
      highscoreText.textContent = score;
    }
  }else{
    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
      alert('something went wrong')
    }, 100);
  }
})

resetButton.addEventListener('click',function(){
  secretNumber = Math.trunc(Math.random()*20)+1;
  message.textContent = 'Start guessing...'
  document.body.style.backgroundColor = '#222';
  number.textContent = '?';
  score = 20;
  scoreText.textContent = '20';
})

const editResult = (msg) => {
  message.textContent = msg;
  score--;
  scoreText.textContent = score;
}