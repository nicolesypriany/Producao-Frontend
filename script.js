function showPassword() {
  var passwordField = document.getElementById("password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}


const deleteButton = document.getElementById("button-delete")
const modal = document.querySelector("dialog")
const closeButton = document.getElementById("cancel-delete")

deleteButton.addEventListener("click", () => {
	modal.showModal()
})

closeButton.addEventListener("click", () => {
	modal.close()
})