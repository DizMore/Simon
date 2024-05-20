var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];

var start = false;
var level = 0;

$(".btn").click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(){
    if (!start){
        $('#level-title').text('Level '+level);
        nextSequence();
        start= true;
    }
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $('#level-title').text('Level '+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("."+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    
    $("#"+currentColour).addClass('pressed');

    setTimeout(function(){
        $("#"+ currentColour).removeClass('pressed');
    },100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
        console.log('success');
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    }else{
        playSound("wrong");

        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },100);
        $("#level-title").text("Game Over, Press Any Key to Restart.");
        startOver();
    }
    
}

function startOver(){
    level = 0;
    start = false;
    gamePattern = [];
}