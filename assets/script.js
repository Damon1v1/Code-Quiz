// set question
var currentQuestionIndex = 0;
// set amount of time for quiz
var time = questions.length * 15;
var timerId;

// assign variables to html elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  
  // un-hide questions section
  questionsEl.removeAttribute("class");
  
  // start timer
  timerId = setInterval(clockTick, 1000);
  
  // show starting time
  timerEl.textContent = time;
  
  // run getQuestions function
  getQuestion();
}
  
function getQuestion() {
  // get question from questions array
  var currentQuestion = questions[currentQuestionIndex];
  
  // change title to current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  
  // clear old question
  choicesEl.innerHTML = "";
  
  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
  
    choiceNode.textContent = i + 1 + ". " + choice;
  
    
    choiceNode.onclick = questionClick;
  
    // display on the page
    choicesEl.appendChild(choiceNode);
  });
}
  
function questionClick() {
  // check user guess
  if (this.value !== questions[currentQuestionIndex].answer) {
    // take time away
     time -= 15;
  
    if (time < 0) {
      time = 0;
     }
  
    // update new time
    timerEl.textContent = time;

    feedbackEl.textContent = "Wrong!";
  
  } else {
  
    feedbackEl.textContent = "Correct!";
  }
  
  // display right or wrong
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  
  // move to next question
  currentQuestionIndex++;
  
  // check if they're any questions left
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
  
function quizEnd() {
  // stop timer
  clearInterval(timerId);
  
  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  
  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  
  // hide questions 
  questionsEl.setAttribute("class", "hide");
}
  
function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;
  
  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}
  
function saveHighscore() {
  // assign user initials to object
  var initials = initialsEl.value.trim();
  
  // make sure input isn't empty
  if (initials !== "") {
    // get saved highscores, if there are none set an empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // new score object to store user data
    var newScore = {
      score: time,
      initials: initials
    };
  
    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
    // redirect to highscores page
    window.location.href = "highscores.html";
  }
}
  
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}
  
  // user clicks button to submit initials
submitBtn.onclick = saveHighscore;
  
  // user clicks button to start quiz
startBtn.onclick = startQuiz;
  // user presses enter key in intials 
initialsEl.onkeyup = checkForEnter;
  
