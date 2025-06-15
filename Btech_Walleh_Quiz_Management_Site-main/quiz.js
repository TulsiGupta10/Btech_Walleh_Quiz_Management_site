// quiz.js
let currentQuestion = 0;
let score = 0;
let startTime;
let endTime;
let userAnswers = Array(quizData.length).fill(null);

const questionEl = document.getElementById("question");
const questionNumEl = document.getElementById("question-number");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result");
const attemptedCount = document.getElementById("attempted-count");
const correctCount = document.getElementById("correct-count");
const wrongCount = document.getElementById("wrong-count");
const timeTakenEl = document.getElementById("time-taken");
const detailedResults = document.getElementById("detailed-results");

let timerInterval;

function startTimer(duration) {
  let time = duration;
  startTime = new Date();
  timerInterval = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timeEl.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    time--;
    if (time < 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

function loadQuestion(index) {
  const q = quizData[index];
  questionNumEl.textContent = `Question ${index + 1} of ${quizData.length}`;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      userAnswers[index] = option;
      loadQuestion(index);
    };
    if (userAnswers[index] === option) {
      btn.style.backgroundColor = "#007bff";
      btn.style.color = "white";
    }
    optionsEl.appendChild(btn);
  });
}

function submitQuiz() {
  clearInterval(timerInterval);
  endTime = new Date();

  quizBox.style.display = "none";
  resultBox.style.display = "block";
  timeEl.style.display = "none";

  let correct = 0;
  let attempted = 0;

  detailedResults.innerHTML = "";

  quizData.forEach((q, i) => {
    const userAnswer = userAnswers[i];
    if (userAnswer !== null) attempted++;
    if (userAnswer === q.answer) correct++;

    const res = document.createElement("div");
    res.innerHTML = `
      <strong>Q${i + 1}:</strong> ${q.question}<br>
      Your Answer: ${userAnswer || "Not Attempted"} <br>
      Correct Answer: ${q.answer}<br>
      <hr>
    `;
    detailedResults.appendChild(res);
  });

  const timeTaken = Math.floor((endTime - startTime) / 1000);
  const mins = Math.floor(timeTaken / 60);
  const secs = timeTaken % 60;

  attemptedCount.textContent = attempted;
  correctCount.textContent = correct;
  wrongCount.textContent = attempted - correct;
  timeTakenEl.textContent = `${mins}m ${secs}s`;
  const marksObtainedEl = document.getElementById("marks-obtained");
marksObtainedEl.textContent = correct;
}

// Button event listeners

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const submitBtn = document.getElementById("submit-btn");

nextBtn.onclick = () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
};

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
};

submitBtn.onclick = submitQuiz;

// Initialize quiz
loadQuestion(currentQuestion);
startTimer(600); // 10-minute timer

