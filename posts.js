const blogForm = document.getElementById("blogForm");
const titleInput = document.getElementById("titleInput");
const textInput = document.getElementById("textInput");
const blogPostsContainer = document.getElementById("blogPosts");
const inputUpdate = document.querySelector(".titleInputUpdate");
const textInputUpdate = document.querySelector(".textInputUpdate");
const formUpdate = document.querySelector(".blogFormUpdate");
const blogPostUpdate = document.querySelector(".blogPostsUpdate");
const update = document.querySelector(".blogFormUpdate");

let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

function displayBlogPosts() {
  blogPostsContainer.innerHTML = "";
  blogPosts.forEach(function (post) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("blog-post");
    postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.text}</p>
            <button class="delete" onclick="deleteBlogPost('${post.id}')">Delete</button>
            <button class="edit" onclick="editBlogPost('${post.id}')">Edit</button>
        `;
    blogPostsContainer.appendChild(postDiv);
  });
}

displayBlogPosts();

function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function addBlogPost(title, text) {
  const newPost = {
    id: generateId(),
    title: title,
    text: text,
  };
  blogPosts.push(newPost);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  displayBlogPosts();
  blogForm.reset();
}

function deleteBlogPost(postId) {
  blogPosts = blogPosts.filter((post) => post.id !== postId);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  displayBlogPosts();
}
let updateId;
function editBlogPost(postId) {
  updateId = postId;
  const postToEdit = blogPosts.find((post) => post.id === postId);
  if (postToEdit) {
    console.log(postToEdit);
    inputUpdate.value = postToEdit.title;
    textInputUpdate.value = postToEdit.text;
    //deleteBlogPost(postId);

    document.querySelector(".create").style.display = "none";
    document.querySelector(".update").style.display = "block";
  }
}
function updateBlogPost(updateId) {
  const postToEdit = blogPosts.find((post) => post.id === updateId);

  if (postToEdit) {
    postToEdit.title = inputUpdate.value;
    postToEdit.text = inputUpdate.value;
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
    document.querySelector(".create").style.display = "block";
    document.querySelector(".update").style.display = "none";
  }
}

blogForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleInput.value.trim();
  const text = textInput.value.trim();
  if (title && text) {
    addBlogPost(title, text);
  } else {
    alert("Please fill in both title and text fields.");
  }
});
update.addEventListener("submit", (e) => {
  e.preventDefault();
  updateBlogPost();
  console.log("hellooooo!!!!!!!!!!!");
});
