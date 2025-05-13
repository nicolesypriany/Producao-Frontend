import api from "./api.js";
import { showAlertError } from "../../alert.js";
import { showAlertSuccess } from "../../alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("register-user-form");
  form.addEventListener("submit", handleFormSubmit);
});

async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const nome = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("password").value;
    var response = await api.register({ nome, email, password });
    if (response.StatusCode) {
      showAlertError("Erro: " + response.Message);
    } else {
      showAlertSuccess("Usuário cadastrado com sucesso!");
      window.location.href = "../login/login.html";
    }
  } catch (error) {
    showAlertError(error);
  }
}
