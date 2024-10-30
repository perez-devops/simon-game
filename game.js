var userClickedPattern = []
var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];

var level = 0;
var started = false;


$(document).keypress(function(){
      if(!started){
        newSequence()
        started = true;
      }


})
function newSequence(){
      userClickedPattern = []
      level += 1;
      $("h1").html("Level " + level);
      var randomNumber = Math.floor(Math.random() * 4);
      var randomChosenColor = buttonColors[randomNumber];
      gamePattern.push(randomChosenColor)
      
      $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
      playSound(randomChosenColor)
  
} 

$(".btn").click(function(event){

            var userChosenColor = event.target.id;
            playSound(userChosenColor);
            animatePress(userChosenColor)
            userClickedPattern.push(userChosenColor);
            checkAnswer(userClickedPattern.length-1)
      })

function checkAnswer(currentLevel){
      if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("success")

            if(gamePattern.length === userClickedPattern.length){
                  setTimeout(function(){
                        newSequence()
                  }, 1000)
            }
      }
      else{
            var wrongSound = new Audio("sounds/wrong.mp3")
            wrongSound.play();
            $("body").addClass("game-over")
            $("h1").text("Game Over, Press Any Key to Restart")

            setTimeout(function(){
                  $("body").removeClass("game-over");
            }, 200)

            resetGame()
      }
}

function resetGame(){
      level = 0;
      userClickedPattern = [];
      gamePattern = [];
      started = false;

}

function playSound(name){
      var sound = new Audio("sounds/" + name + ".mp3");
      sound.play();
}

function animatePress(currentColor){

      $("." + currentColor).addClass("pressed");

      setTimeout(function(){
            $("." + currentColor).removeClass("pressed")
      }, 100)

}



