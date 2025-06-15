// script.js

// Login Page Logic
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("loginMessage");

    if (username === "admin" && password === "1234") {
      message.textContent = "Login successful!";
      setTimeout(() => {
        window.location.href = "quiz.html";
      }, 1000);
    } else {
      message.textContent = "Invalid credentials. Try again!";
      message.style.color = "red";
    }
  });
}

// Quiz Page Logic
if (document.getElementById("quizForm")) {
  const form = document.getElementById("quizForm");
  const submitBtn = document.getElementById("submitBtn");
  const result = document.getElementById("result");

  // Render questions
  quizData.forEach((q, index) => {
    const questionBlock = document.createElement("div");
    questionBlock.innerHTML = `
      <p><strong>${index + 1}. ${q.question}</strong></p>
      ${q.options
        .map(
          (opt) =>
            `<label><input type="radio" name="q${index}" value="${opt}" required> ${opt}</label><br>`
        )
        .join("")}
      <br/>
    `;
    form.appendChild(questionBlock);
  });

  // Submit logic
  submitBtn.addEventListener("click", () => {
    let score = 0;
    quizData.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q.answer) {
        score++;
      }
    });
    result.innerHTML = `You scored <strong>${score}</strong> out of ${quizData.length}.`;
  });
}
