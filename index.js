var numberOfButtons = document.querySelectorAll(".drum").length;

for (var i=0 ; i<numberOfButtons ; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",handleClick ); 
} //notice that this selector selects the firs button only

document.addEventListener("keydown",playSound);

function handleClick(){
    this.classList.toggle("black");
    var buttonPressed = this.innerHTML;
    switch (buttonPressed){
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
        break;
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
        break;
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
        break;
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
        break;
        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
        break;
        case "k":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
        break;
        case "l":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
        break;
        default: console.log(buttonPressed);
    }
}

function playSound(Event){
    switch (Event.key){
        case "w":
            document.querySelector(".w").classList.toggle("black");
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
        break;
        case "a":
            document.querySelector(".a").classList.toggle("black");
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
        break;
        case "s":
            document.querySelector(".s").classList.toggle("black");
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
        break;
        case "d":
            document.querySelector(".d").classList.toggle("black");
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
        break;
        case "j":
            document.querySelector(".j").classList.toggle("black");
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
        break;
        case "k":
            document.querySelector(".k").classList.toggle("black");
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
        break;
        case "l":
            document.querySelector(".l").classList.toggle("black");
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
        break;
        default: console.log(Event.key);
    }
}