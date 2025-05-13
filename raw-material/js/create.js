import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("create-raw-material-form");
  form.addEventListener("submit", handleFormSubmit);
});

async function handleFormSubmit(event) {
  event.preventDefault();
  const nome = document.getElementById("raw-material-name").value;
  const fornecedor = document.getElementById("raw-material-supplier").value;
  const unidade = document.getElementById("raw-material-unit").value;
  const preco = document.getElementById("raw-material-price").value;
  await api.createRawMaterial({ nome, fornecedor, unidade, preco });
}
