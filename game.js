
// create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

// Create new array buttonColours
var buttonColours = ["red","blue","green","yellow"];
// Created emty array name gamePattern
var gamePattern = [];//  color randomly created for challange

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click( function (){
    // create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id"); // work
    // alert($(this).attr("id"));//demo work 
    // // Add the contents of the variable userChosenColour to array userClickedPattern
    userClickedPattern.push(userChosenColour);
  // when a user clicks on a button, the corresponding sound played
    playSound(userChosenColour);
    var indexOfLastAnswer = userClickedPattern.length ;
    console.log(indexOfLastAnswer);
    console.log("button# "+ indexOfLastAnswer + " clicked");
   
    checkAnswer(indexOfLastAnswer);

});

//Detect when a keyboard key has been pressed,do tasks
$(document).keypress(function(){ 
    if(start == 0) {
        
        $("#level-title").text("Level " + level);
        nextSequence(); 
         start ++;
          //if game aldreay start -> set TRUE ???
    };
      
});

 // function take a single input parameter called currentColour.
function animatePress (currentColour) {
    //// when button get clicked will add a box shadow &
    // changes the background colour to grey.
     $(".btn").click( function(){
         var thisButton = $(this); 
         // add class with changes the background colour to grey
         $(this).addClass("pressed"); 
         //to remove the pressed class after a 100 milliseconds.
         setTimeout(function(){
             thisButton.removeClass("pressed");
         }, 100);
       
     });
 
 };
 

function nextSequence() {
    
    userClickedPattern.length = 0;
    //// Function created random number from 1-3
    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];
    // adding  element to array
    gamePattern.push(randomChosenColour);
// --> passing varible in jQuery id selector by syntax ==>> $('#'+ varible) then
// add function animation
    $('#'+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour);
    level ++; // update new level
    $("h1").text("Level "+ level); // change new text
 
};


// Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
    
    var audio = new Audio("sounds/"+ name + ".mp3");//???
     
    audio.play();
  
};


 animatePress();

; 
var start = 0; // keep track of whether if the game has started or not
//if game has not start yet -> set to FALSE ??

var level = 0;// keep track of level




var currentLevel = 0;
//function checkAnswer() take one input with the name currentLevel
function checkAnswer(currentLevel) {
   // console.log(gamePattern.length);
    //console.log(userClickedPattern.length);
   
    if (currentLevel == gamePattern.length) {
        for( var i = 0; i< gamePattern.length;i++) {
            if( userClickedPattern[i] != gamePattern[i]) {
              
                // added sound & new class for wrong answer
                var wrongSound = new Audio("sounds/wrong.mp3");
                wrongSound.play();
                $("body").addClass("game-over");
                // remove class "game-over" after 200 milliseconds.
                setTimeout(function(){
                    $("body").removeClass("game-over")},200);
                //  change h1 title
                $("#level-title").text("Game Over, Press Any Key To Restart");
                startOver();
                
            }
        };
        setTimeout(nextSequence(),1000);
    };   
   };
 // call this when user gets the sequence wrong
   function startOver () { 
    level = 0;
    gamePattern.length = 0;
    start = 0;

   }


