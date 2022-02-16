var buttonColors = ["green","red","blue","yellow"]; // define all variables needed global to easy use them in all functions
var gamePattern = [];
var level = 0;
var started = false;
var index = 0;

GamePlay();

function GamePlay(){
    // started = false;     //uncomment this if we need to disable the response of buttons untill the keyboard is pressed.
    // if (started){
    //     for (var i=0 ; i<4 ; i++){
    //         document.querySelectorAll(".btn")[i].removeEventListener("click",checkAnswer)
    //     }
    // }
    $(document).keydown(function startOver(){ // document.addEventListener("keydown",function startOver()
        $(document).off(); //document.removeEventListener("keydown",startOver);
        level=0;
        gamePattern = [];
        nextSequence();
    })   
}

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level); //document.querySelector("#level-title").textContent = "level "+level;
    var randomChoosenColor = randomChoice();
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(200).fadeIn(200); //animatePress(randomChoosenColor);
    playSound(randomChoosenColor);
    index = 0;
    if (!started){
        started = true;
        $(".btn").click(checkAnswer);
        // for (var i=0 ; i<4 ; i++){
        //     document.querySelectorAll(".btn")[i].addEventListener("click",checkAnswer);
        // }          
    }
}


function checkAnswer(){
    var userChoosenColor = this.id;
    if(userChoosenColor==gamePattern[index]){
        playSound(userChoosenColor);
        animatePress(userChoosenColor);
        index++;
        if (index==gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        animateWrong();
        $("#level-title").text("Game Over,Press any key to Restart"); //document.querySelector("#level-title").textContent = "Game Over,Press any key to Restart";
        GamePlay();
    }
}


function randomChoice (){
    var r = Math.floor(Math.random()*4);
    return buttonColors[r];
}

function animatePress(button){
    
    $("#"+button).addClass("pressed"); //document.querySelector("#"+button).classList.add("pressed");
    setTimeout(() =>{
        $("#"+button).removeClass("pressed"); //document.querySelector("#"+button).classList.remove("pressed");
    }, 100);
}

function animateWrong(){
    $("body").addClass("game-over"); //document.querySelector("body").classList.add("game-over");
    setTimeout(() =>{
        $("body").removeClass("game-over"); //document.querySelector("body").classList.remove("game-over");
    }, 200);
}

function playSound(name){
    var buttonSound = new Audio("sounds/"+name+".mp3");
    buttonSound.play();
}