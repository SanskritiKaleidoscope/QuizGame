let highscore = 0;
let score = 150;

let questions = [
  {
    prompt: `1. Which of the following is NOT a type of Virus?`,
    options: [
      "Tunelling",
      "Boot sector",
      "Macro",
      "Wrapper",
    ],
    answer: "Wrapper",
  },

  {
    prompt: `2. What requires a carrier file to self replicate ?`,
    options: [
      "Trojan Horse",
      "Virus",
      "Worms",
      "Spam",
    ],
    answer: "Virus",
  },

  {
    prompt: `3. What describe unauthorized spying software?`,
    options: [
      "Malware",
      "Adware",
      "Spyware",
      "Ransomware",
    ],
    answer: "Spyware",
  },

  {
    prompt: `4. ____ steals sensitive login information.`,
    options: [
      "Phishing",
      "Decrytion",
      "Cryptolocker",
      "Sprucing"],
    answer: "Phishing",
  },

  {
    prompt: `5. What does DSL stands for ?`,
    options: [
      "Disc Security Line",
      "Direct Server Line",
      "Digital Subscriber Line",
      "None of the above",
    ],
    answer: "Digital Subscriber Line",
  },
  {
    prompt: `6.What's the term to cause panic by creating chaos via computer?`,
    options: [
      "Denial of service",
      "Social Engineering",
      "Cyber terrorism",
      "Cyber Grooming",
    ],
    answer: "Cyber terrorism",
  },
  {
    prompt: `7. When was the Indian IT Act amended in which year?`,
    options: [
      "2000",
      "2005",
      "2008",
      "2010",
    ],
    answer: "2008",

  },
  {
    prompt: `8. Which of the following is a protocol used on the internet?`,
    options: [
      "IEEE",
      "TCP",
      "DNS",
      "VMS",
    ],
    answer: "TCP",

  },

  {
    prompt: `9. What was the name of the first computer virus ?`,
    options: [
      "Creeper Virus",
      "Sobig",
      "Mydoom",
      "Zeus",
    ],
    answer: "Creeper Virus",

  },
  {
    prompt: `10. Where did the term "Hacker" Originate ?`,
    options: [
      "MIT",
      "New York University",
      "Harvard University",
      "Bell's Lab",
    ],
    answer: "MIT",

  },
  {
    prompt: `11. What is the fullform of VIRUS ?`,
    options: [
      "Vital Indian Resources Under SaaS",
      "Vapor Information Resources Under Sources",
      "Vital Information Resources Under Seige",
      "None of these",
    ],
    answer: "Vital Information Resources Under Seige",

  },
  {
    prompt: `12. Cyber Security provide security against what ?`,
    options: [
      "Against Malware",
      "Against Cyber-Terrorists",
      "Defends device from threat",
      "All of these",
    ],
    answer: "All of these",

  },
  {
    prompt: `13. Who is popularly known as the father of cyber security ?`,
    options: [
      "Robert Escobar",
      "August Kerckhoffs",
      "Bob Thomas",
      "Charles Babbage",
    ],
    answer: "Bob Thomas",

  },
  {
    prompt: `14. Which of the below is a kind of cyber security ?`,
    options: [
      "Cloud Security",
      "Application Security",
      "Firewall",
      "All of these",
    ],
    answer: "All of these",

  },
  {
    prompt: `15. What is a common target of cyber attackers attempting to get the IP address of the victim?`,
    options: [
      "Emails",
      "Websites",
      "IP Tracer",
      "Web Pages",
    ],
    answer: "Websites",

  },


];

// Get Dom Elements 

let questionsEl =
  document.querySelector(
    "#questions"
  );
let timerEl =
  document.querySelector("#timer");
let choicesEl =
  document.querySelector("#options");
let submitBtn = document.querySelector(
  "#submit-score"
);
let startBtn =
  document.querySelector("#start");
let nameEl =
  document.querySelector("#name");
let feedbackEl = document.querySelector(
  "#feedback"
);
let reStartBtn =
  document.querySelector("#restart");

// Quiz's initial state 
let currentQuestionIndex = 0;
let time = 0; /*<----- Can set Time Manually Here.*/
let timerId;

// Start quiz and hide frontpage 

function quizStart() {
  timerId = setInterval(
    clockTick,
    1000
  );
  timerEl.textContent = time;
  let landingScreenEl =
    document.getElementById(
      "start-screen"
    );
  landingScreenEl.setAttribute(
    "class",
    "hide"
  );
  questionsEl.removeAttribute(
    "class"
  );
  getQuestion();
}

// Loop through array of questions and 
// Answers and create list with buttons 
function getQuestion() {
  let currentQuestion =
    questions[currentQuestionIndex];
  let promptEl =
    document.getElementById(
      "question-words"
    );
  promptEl.textContent =
    currentQuestion.prompt;
  choicesEl.innerHTML = "";
  currentQuestion.options.forEach(
    function(choice, i) {
      let choiceBtn =
        document.createElement(
          "button"
        );
      choiceBtn.setAttribute(
        "value",
        choice
      );
      choiceBtn.textContent =
        i + 1 + ". " + choice;
      choiceBtn.onclick =
        questionClick;
      choicesEl.appendChild(
        choiceBtn
      );
    }
  );
}

// Check for right answers and deduct 
// Time for wrong answer, go to next question 

function questionClick() {
  if (
    this.value !==
    questions[currentQuestionIndex]
      .answer
  ) {

    score -= 5;
    if (time > 100000000) {
      time = 100000000;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = `Wrong! The correct answer was 
    ${questions[currentQuestionIndex].answer}.`;
    feedbackEl.style.color = "red";
  } else {
    feedbackEl.textContent =
      "Correct!";
    feedbackEl.style.color =
      "green";
  }
  feedbackEl.setAttribute(
    "class",
    "feedback"
  );
  setTimeout(function() {
    feedbackEl.setAttribute(
      "class",
      "feedback hide"
    );
  }, 2000);
  currentQuestionIndex++;
  if (
    currentQuestionIndex ===
    questions.length
  ) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// End quiz by hiding questions, 
// Stop timer and show final score 

function quizEnd() {
  clearInterval(timerId);
  let endScreenEl =
    document.getElementById(
      "quiz-end"
    );
  endScreenEl.removeAttribute(
    "class"
  );
  if (score >= 140) {
    document.getElementById("congrats").innerHTML = "Congratulations!";
  }
  let finalScoreEl =
    document.getElementById(
      "score-final"
    );
  finalScoreEl.textContent = score + "/150";
  questionsEl.setAttribute(
    "class",
    "hide"
  );
}

// End quiz if timer reaches 0 

function clockTick() {
  time++;
  timerEl.textContent = time;
  if (time >= 1000000000) {
    quizEnd();
  }
}

// Save score in local storage 
// Along with users' name 

function saveHighscore() {
  let name = nameEl.value.trim();

  if (name !== "") {
    let highscores =
      JSON.parse(
        window.localStorage.getItem(
          "highscores"
        )
      ) || [];
    let newScore = {
      score: score,
      name: name,
      time: time,
    };
    highscores.push(newScore);
    window.localStorage.setItem(
      "highscores",
      JSON.stringify(highscores)
    );
    alert(
      "Your Score has been Submitted"
    );
    console.log(newScore);
    score = newScore;
    if (score >= highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
    }
  }
}

// Save users' score after pressing enter 
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
    alert(
      "Your Score has been Submitted"
    );
    console.log(newScore);
  }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit 

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz 

startBtn.onclick = quizStart;
