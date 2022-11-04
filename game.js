var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var level = 0;
var started  = false; 
$(document).keypress(function(){ 
    
    if (!started) {
        //$("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = (Math.random())*4;
    randomNumber = Math.floor(randomNumber);
    randomColorChosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);
    $("#"+randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
    
}
$(".btn").click(function handler(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    var i = 0;
    while(i<=userClickedPattern.length-1){
        if (userClickedPattern[i]==userChosenColor) {
            break;
        }
        i++;
    }
    ckeckAnswer(i);
   });
function playSound(name){
    var soundTrack = "sounds/" + name + ".mp3";
    var audio = new Audio(soundTrack);
    audio.play();
}
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    }, 100);
}
function ckeckAnswer(currentLevel){
    if (userClickedPattern[currentLevel]==gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout( function() { nextSequence(); }, 1000);
        }
      
    }
    else{
       console.log("Wrong");
       var soundTrack = "sounds/wrong.mp3";
        var audio = new Audio(soundTrack);
        audio.play();
       $("body").addClass("game-over");
       setTimeout(function(){
        $("body").removeClass("game-over");
       },200);
       $("#level-title").text ("Game over. Press any key to restart.") ;
       startover();
    }
}
function startover(){
    level = 0;
    started = false;
    gamePattern = [];
}
