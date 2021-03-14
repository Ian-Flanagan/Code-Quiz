//variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
// variable to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var endscreenEl = document.getElementById("end-screen") 
var score = 100;
var finalscoreEl = document.getElementById("final-score")

function startQuiz() {
  //hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  //reveal questions section
  questionsEl.removeAttribute("class");
  //start timer
  timerId = setInterval(clockTick, 1000);
  //show starting time
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestionIndex)
  console.log(currentQuestion)
 

  var titleEl = document.getElementById("question-title");
  
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach(function (choice ) {
    var choicebtn = document.createElement("button");
    choicebtn.setAttribute("class", "choice");
    choicebtn.setAttribute("value", choice)
    choicebtn.textContent = choice;
    choicesEl.appendChild(choicebtn);
    choicebtn.addEventListener("click", function (event) {
      
      analyzeAnswer(event.target)
      
      if (currentQuestionIndex === 5) {
        quizEnd();
      } else {
        getQuestion();
      }
    });
  });
}
function clockTick() {
  
  time--;
  timerEl.textContent = time;
  if (time === 0) {
    clearInterval(timerId);
    quizEnd();
  }
}

function analyzeAnswer(target){
  
  console.log(target)
  if(target.value === questions[currentQuestionIndex].answer){
    feedbackEl.textContent= "correct"
  }
  else{
    feedbackEl.textContent= "incorrect"
    time = time-10;
    score = score - 20;
  }
  currentQuestionIndex++;
  
  
  
}

function quizEnd() {
  endscreenEl.removeAttribute("class", "hide")
  questionsEl.setAttribute("class", "hide")
  finalscoreEl.textContent= score;

}


startBtn.addEventListener("click", startQuiz);

//make a separate html file for high scores or make another div that is "hidden" and remove the "hide" from whenever they click the submit
//button will have event listener that will show high score element and hide the endscreenEL.
//when the user enters initials and presses submit save there score to local storage
//when user goes to high score page, get the scores from local storage and display them
//all of this is tied into the submit button at the end of the highscore page
//timers, event listeners, local storage, dom manipulation.

//extra extra read all about it: make the timer stop when all questions have been asked
//see if you can get the correct and incorrect to hide after 5 seconds or so.
//restructure my functions.