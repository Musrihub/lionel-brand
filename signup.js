const form = document.querySelector("#create-account-form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const signUpError = document.querySelector(".signup-error");
let users = JSON.parse(localStorage.getItem("users")) || [];
const basePath = window.location.href.split("/").slice(0, -1).join("/") + "/";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm();
  if (isFormValid() == true) {
    const newUser = {
      id: generateId(),
      name: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    const userExist = users.find((user) => user.email === emailInput.value);
    if (!userExist) {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      window.location.href = basePath + "login.html";
    } else {
      signUpError.innerHTML = "User Already Exist";
    }
  } else {
    console.log("signup !!!!!!!!!!!!!!! failed");
  }
});
function generateId() {
  const timeStamp = new Date().getTime();
  const randomNum = Math.random().toString(36).substr(2, 9);
  return `${timeStamp} + ${randomNum}`;
}

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
  if (usernameInput.value.trim() == "") {
    setError(usernameInput, "Name can not be empty");
  } else if (usernameInput.value.trim().length < 4) {
    setError(usernameInput, "Name must be atleast 4 charecters");
  } else {
    setSuccess(usernameInput);
  }

  if (emailInput.value.trim() == "") {
    setError(emailInput, "email can not be empty");
  } else if (isEmailValid(emailInput.value)) {
    setSuccess(emailInput);
  } else {
    setError(emailInput, "email can not be empty ");
  }

  if (passwordInput.value.trim() == "") {
    setError(passwordInput, "Password can not be empty");
  } else if (
    passwordInput.value.trim().length < 8 ||
    passwordInput.value.trim().length > 20
  ) {
    setError(passwordInput, "Password must be atleast 8 charecters");
  } else {
    setSuccess(passwordInput);
  }

  if (confirmPasswordInput.value.trim() == "") {
    setError(confirmPasswordInput, "Password can not be empty");
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    setError(confirmPasswordInput, "Password does not match");
  } else {
    setSuccess(confirmPasswordInput);
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
