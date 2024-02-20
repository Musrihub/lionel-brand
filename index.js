const navigation = document.querySelector(".mobile-nav");

document.querySelector(".humbergerBtn").addEventListener("click", function () {
  if (navigation.style.display === "block") {
    navigation.style.display = "none";
  } else {
    navigation.style.display = "block";
  }
});

const form = document.querySelector("#contact-form");
const sendMessage = document.querySelector(".contact-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let messageInput = document.getElementById("message");

  let name = nameInput.value;
  let email = emailInput.value;
  let message = messageInput.value;

  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("message", message);

  form.reset();

  alert("Message sent successfully!");
});
