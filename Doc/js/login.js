const signupBtn = document.getElementById("signupBtn");
const signinBtn = document.getElementById("signinBtn");
const authSection = document.getElementById("authSection");

signupBtn.addEventListener("click", () => {
  authSection.classList.add("right-panel-active");
});

signinBtn.addEventListener("click", () => {
  authSection.classList.remove("right-panel-active");
});
