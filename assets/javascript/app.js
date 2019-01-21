var correct = 0;
var incorrect = 0;
var $app = $("#app");
var $timer = $("#timerBox");
var questionIndex = 0;
var timer;
var isRunning = false;
var intervalId;


// Question object array
var questions = [
    {
        q: 'What is the first organism to grow back after a fire? ',
        choices: ['Moss', 'Trees ', 'Grass', 'Posion Oak'],
        answer: 'Moss',
        url: '../TriviaGame/assets/images/moss.jpg',
    },
    {
        q: 'What was the first planet to be discovered with the telescope? ',
        choices: ['Mars', 'Jupiter', 'Earth', 'Uranus'],
        answer: 'Uranus',
        url: '../TriviaGame/assets/images/uranus.jpg',
    },
    {
        q: 'How many colors are there in a rainbow? ',
        choices: ['4', '8', '6', '7'],
        answer: '7',
        url: '../TriviaGame/assets/images/rainbow.jpg',
    },
    {
        q: 'An animal that lives part of its life in water and part on land is known as what? ',
        choices: ['Terrestrial', 'Amphibian', 'Nocturnal', 'Diurnal'],
        answer: 'Amphibian',
        url: '../TriviaGame/assets/images/amphibians.jpg',
    },
    {
        q: 'Diamonds are made up almost entirely of what element? ',
        choices: ['Carbon', 'Nitrogen', 'Graphite', 'Amorphous'],
        answer: 'Carbon',
        url: '../TriviaGame/assets/images/diamond.jpg',
    },
    {
        q: 'Who wrote the theory of relativity? ',
        choices: ['Newton', 'Darwin', 'Michelangelo', 'Einstein'],
        answer: 'Einstein',
        url: '../TriviaGame/assets/images/einstein.jpg',
    }
]

// Start function
function init() {
    var $start = $("<button class='btn bg-transparent text-white'>Start</button>");
    $app.empty();
    $start.on("click", showQuestion)
    $app.append($start);
    questionIndex = 0;
    correct = 0;
    incorrect = 0;
    // runTimer();

}
init();

// Show question when button is pressed
function showQuestion() {
    $app.empty();
    runTimer();
    var question = questions[questionIndex];
    var $question = $("<div>");
    var $q = $("<h2>" + question.q + "</h2>");
    var $button;

    for (var i = 0; i < question.choices.length; i++) {
        $button = $("<button>" + question.choices[i] + "</button>")
        $button.on("click", handleAnswerButton)
        $question.append($button);
    }
    $question.prepend($q);
    $app.append($question);
}

// Answer button handler
function handleAnswerButton() {
    var value = $(this).text();
    displayAnswer(value);
}
// Function for displaying answer
function displayAnswer(userInput) {
    $app.empty();
    var question = questions[questionIndex];
    // $app.append("<h2>Answer</h2>");
    $app.append("<h3>Correct answer is: " + question.answer + "</h3>");
    $app.append("<h3>You selected: " + userInput + "</h3>");
    $app.prepend("<img src='"+question.url+"' style='width: 200px;'></img>");

    if (userInput === undefined) {
        $app.prepend("<h3>You ran out of time!</h3>");
        incorrect++;
        stopTimer();
    } else if (userInput === question.answer) {
        $app.prepend("<h3>Correct!</h3>");
        correct++;
        stopTimer();
    } else {
        $app.prepend("<h3>Wrong!</h3>");
        incorrect++;
        stopTimer();
    }


    questionIndex++;
    if (questionIndex < questions.length) {
        setTimeout(showQuestion, 5000);
    } else {
        setTimeout(endGame, 5000);
    }
}

// Timer functions
function stopTimer() {
    isRunning = false;
    clearInterval(intervalId);
    $timer.empty();
};
function runTimer() {
    if (!isRunning) {
        intervalId = setInterval(decrement, 1000);
        isRunning = true;
        timer = 10;
    }
};
function decrement() {
    var $clock = $("<div>Time Remaining: <span id='clock'>" + timer + "</span></div>");
    timer--;
    $timer.html($clock);
    if (timer === 0) {
        stopTimer();
        displayAnswer();
    }
}

function endGame() {
    $app.empty();
    $app.append("<h2>Your correct answer total is: " + correct + "</h2>");
    $app.append("<h2>Your incorrect answer total is: " + incorrect + "</h2>");
    var $restart = $("<button class='btn-secondary'>Play again?</button>");
    $restart.on("click", init);
    $app.append($restart);
}