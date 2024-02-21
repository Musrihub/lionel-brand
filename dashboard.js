const basePath = window.location.href.split("/").slice(0, -1).join("/") + "/";
const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
const logout = document.querySelector(".logout");

if (!isLoggedIn) {
  window.location.href = basePath + "login.html";
  console.log(isLoggedIn);
}

logout.addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", false);
  window.location.href = basePath + "login.html";
});
