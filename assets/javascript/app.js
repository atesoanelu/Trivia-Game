var startScreen;
var gameHTML;
var counter = 20;
var questionArray = ["What Golden State Warrior entered a hospital in December 1987 for treatment for an alcohol problem?", "What Golden State Warrior was named MVP of the 1975 NBA Finals?", "Which 1970's Golden State Warriors player was known for his old-fashioned underhand free throws?"];
var answerArray = [
    ["Chris Washburn", "Phil Ford", "Chris Mullin",  "Winston Garland"],
    [" Clifford Ray",  "Nate Thurmond",  "Keith Wilkes", "Rick Barry"],
    [" Nate Thurmond",  "Keith Wilkes", "Rick Barry",  "Jeff Mullins"]
];
var imageArray = ["<img class='center-block img-right' src='assets/images/mullin.jpg'>", "<img class='center-block img-right' src='assets/images/Ricky.png'>", "<img class='center-block img-right' src='assets/images/Ricky.png'>"];
var correctAnswers = ["C. Chris Mullin", "D. Rick Barry", "C. Rick Barry"];
var questionCounter = 0;
var selectedAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sounds/button-15.mp3");
var loseSound = new Audio("assets/sounds/Basketball Buzzer-SoundBible.com-1863250611.mp3")
var winSound = new Audio("assets/sounds/Ta Da-SoundBible.com-1884170640.mp3")


$(document).ready(function() {
    // Create a function that creates the start button and initial screen

    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start</a></p>";
        $(".mainArea").html(startScreen);
    }

    initialScreen();

    //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

    $("body").on("click", ".start-button", function(event) {
        event.preventDefault(); // added line to test issue on GitHub Viewer
        clickSound.play();
        generateHTML();

        timerWrapper();

    }); // Closes start-button click

    $("body").on("click", ".answer", function(event) {
        //answeredQuestion = true;
        clickSound.play();
        selectedAnswer = $(this).text();
        for( var i = 0; i < questionArray.length; i++) {
        	
        }
        
        if (selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
            winSound.play();
            clearInterval(theClock);
            generateWin();
        } else {
            //alert("wrong answer!");
            loseSound.play();
            clearInterval(theClock);
            generateLoss();
        }
    
    }); // Close .answer click

    $("body").on("click", ".reset-button", function(event) {
        clickSound.play();
        resetGame();
    }); // Closes reset-button click

}); //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainArea").html(gameHTML);
}

function wait() {
    if (questionCounter < 2) { 
        questionCounter++;
        generateHTML();
        counter = 20;
        timerWrapper();
    } else {
        finalScreen();
    }
}

function timerWrapper() {
    theClock = setInterval(twentySeconds, 1000);

    function twentySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Start Over?</a></p>";
    $(".mainArea").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 20;
    generateHTML();
    timerWrapper();
}