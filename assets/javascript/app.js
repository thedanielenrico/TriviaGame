var correct = 0;
var incorrect = 0;
var $app = $("#app");
var questionIndex = 0;
var timer = 15;
var remainingTime;
var isRunning = false;

var questions = [
    {
        q: 'What color is the sky? ',
        choices: ['Blue', 'Red ', 'Orange', 'Green'],
        answer: 'Blue',
    },
    {
        q: 'What color is George Washingtons white horse? ',
        choices: ['White', 'Red', 'Orange', 'Green'],
        answer: 'White',
    }
]

function init() {
    var $start = $("<button class='btn btn-secondary'>Start</button>");
    $app.empty();
    $start.on("click", showQuestion)
    $app.append($start);
    questionIndex = 0;
    correct = 0;
    incorrect = 0;
}
init();


function showQuestion() {
    $app.empty();
    remainingTime = 15;
    var question = questions[questionIndex];
    var $question = $("<div>");
    // var $clock = $("<div>Time Remaining: <span id='clock'>" + remainingTime + "</span></div>")
    var $q = $("<h2>" + question.q + "</h2>");
    var $button;
    // timer = setInterval(decrement, 1000);
    // isRunning = true;
    // $question.append($clock);
    $question.append($q);
    for (var i = 0; i < question.choices.length; i++) {
        $button = $("<button>" + question.choices[i] + "</button>")
        $button.on("click", handleAnswerButton)
        $question.append($button);
    }
    $question.append($q);
    $app.append($question);
    runTimer();
}
function handleAnswerButton() {
    var value = $(this).text()
    var answer = questions[0].value;
    if (value === answer) {
        console.log("You win")
        correct++;
    } else {
        console.log("nah")
        incorrect++;
    }
    questionIndex++;
    showQuestion();
}
function stopTimer() {
    isRunning = false;
    clearInterval(timer);
};
function runTimer() {
    if (!isRunning) {
        timer = setInterval(decrement, 1000);
        isRunning = true;
    }
};
function decrement() {
    var $clock = $("<div>Time Remaining: <span id='clock'>" + timer + "</span></div>");
    $app.html($clock);
    timer--;
    if (timer === 0) {
        stopTimer();
    }
}







// var correctAnswers = 0;
// var wrongAnswers = 0;
// var timedOutAnswers = 0;
// var timer = 15;
// var qIndex;
// var questionsCount = questions.length;
// var isRunning = false;
// var intervalId;


// $("#buttonRestart").hide();
// $("#buttonStart").on("click", function () {
//     $("#trivia").hide();
//     $("#buttonStart").hide();
//     runTimer();

// });
// function runTimer() {
//     if (!isRunning) {
//         intervalId = setInterval(decrement, 1000);
//         isRunning = true;
//     }
// };
// function decrement() {
//     $("#timerBox").html("<h4> Time Remaining: " + timer + "</h4>");
//     timer--;
//     if (timer === 0) {
//         stopTimer();
//     }
// }
// function stopTimer() {
//     isRunning = false;
//     clearInterval(intervalId);
// }