const form = document.querySelector("#create-account-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
let users = JSON.parse(localStorage.getItem("users")) || [];
const basePath = window.location.href.split("/").slice(0, -1).join("/") + "/";
const message = document.querySelector(".error-message");
const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

if (!isLoggedIn) {
  const userLoggedIn = false;
  localStorage.setItem("isLoggedIn", userLoggedIn);
}

form.addEventListener("submit", (event) => {
  validateForm();
  if (isFormValid() == true) {
    form.submit();
  } else {
    event.preventDefault();
  }
});

function isFormValid() {
  const inputContainers = form.querySelectorAll(".input-group");
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains("error")) {
      result = false;
    }
  });
  return result;
}

function validateForm() {
  if (emailInput.value.trim() == "") {
    setError(emailInput, "email can not be empty");
  } else if (isEmailValid(emailInput.value)) {
    setSuccess(emailInput);
  } else {
    setError(emailInput, "email can not be empty ");
  }

  if (passwordInput.value.trim() == "") {
    setError(passwordInput, "Password can not be empty");
  } else if (passwordInput.value.trim().length < 8) {
    setError(passwordInput, "Password must be  atleast  8 charecters");
  } else {
    setSuccess(passwordInput);
  }
}

function setError(element, errorMessage) {
  const parent = element.parentElement;
  if (parent.classList.contains("success")) {
    parent.classList.remove("success");
  }
  parent.classList.add("error");
  const paragraph = parent.querySelector("p");
  paragraph.textContent = errorMessage;
}

function setSuccess(element) {
  const parent = element.parentElement;
  if (parent.classList.contains("error")) {
    parent.classList.remove("error");
  }
  parent.classList.add("success");
}

function isEmailValid(email) {
  const reg =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return reg.test(email);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userName = emailInput.value;
  const password = passwordInput.value;
  const user = users.find((user) => user.email === userName);

  if (user.email === userName && user.password === password) {
    localStorage.setItem("isLoggedIn", true);
    window.location.href = basePath + "dashboard.html";
  } else {
    message.innerHTML = "Incorrect Email or Password";
  }
});
