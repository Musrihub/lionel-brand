const navigation = document.querySelector(".mobile-nav");

document.querySelector(".humbergerBtn").addEventListener("click", function () {
  if (navigation.style.display === "block") {
    navigation.style.display = "none";
  } else {
    navigation.style.display = "block";
  }
});

const likebtn = document.querySelector("#heart");
const likesSpan = document.querySelector(".likes");
let likesCount = 0;
let isLiked = true;

likebtn.addEventListener("click", function () {
  if (isLiked) {
    likesCount++;
    likesSpan.innerHTML = likesCount;
  }
});

//contact form validation

const form = document.querySelector(".contact-page");
const nameInput = document.querySelector(".input-name");
const emailInput = document.querySelector(".input-email");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");

form.addEventListener("submit", function (event) {
  let isValid = true;
  if (nameInput.ariaValueMax.trim() === "") {
    nameError.textContent = "Name is required";
    isValid = false;
  } else {
  }
  if (!isValid) {
    event.preventDefault();
  }
});
