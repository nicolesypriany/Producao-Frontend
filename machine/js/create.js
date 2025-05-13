import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("create-machine-form");
  form.addEventListener("submit", handleFormSubmit);
});

async function handleFormSubmit(event) {
  event.preventDefault();
  const nome = document.getElementById("machine-name").value;
  const marca = document.getElementById("machine-brand").value;
  await api.createMachine({ nome, marca });
}
