import api from "./api.js";
import { showAlertError } from "../../alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("form-login");
  form.addEventListener("submit", handleFormSubmit);
  await getToken();
});

async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const response = await api.login({ email, password });
    if (response.StatusCode) {
      showAlertError("Erro: " + response.Message);
    } else {
      localStorage.setItem("token", response.token);
      window.location.href = "../../production/html/index.html";
    }
  } catch (error) {
    alert(error);
  }
}

async function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erro ao decodificar token", error);
  }
}

async function getToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const userData = await parseJwt(token);
  }
}
