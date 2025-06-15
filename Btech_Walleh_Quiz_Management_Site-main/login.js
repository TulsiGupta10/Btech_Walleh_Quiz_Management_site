document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Password format validation using RegEx
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

  if (!passwordRegex.test(password)) {
    message.textContent =
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol.";
    message.style.color = "red";
    return;
  }

  // Only show success if password format is valid (skip account match)
  message.textContent = "Login successful! Redirecting...";
  message.style.color = "green";
  // window.location.href = "dashboard.html";
  const email = document.getElementById("email").value.trim();
const course = document.getElementById("course").value.trim();
setTimeout(() => {
    window.location.href = "quizes.html";
  }, 1000);
});
