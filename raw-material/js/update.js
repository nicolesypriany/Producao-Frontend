import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const rawMaterialId = params.get("id");
  const form = document.getElementById("create-raw-material-form");
  fillForm(rawMaterialId);
  form.addEventListener("submit", handleFormSubmit);
});

async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const id = document.getElementById("raw-material-id").value;
    const nome = document.getElementById("raw-material-name").value;
    const fornecedor = document.getElementById("raw-material-supplier").value;
    const unidade = document.getElementById("raw-material-unit").value;
    const preco = document.getElementById("raw-material-price").value;
    await api.updateRawMaterial({ id, nome, fornecedor, unidade, preco });
    alert("Matéria-prima atualizada com sucesso!");
    window.location.replace("index.html");
  } catch (error) {
    alert(error);
  }
}

async function fillForm(rawMaterialId) {
  try {
    const rawMaterial = await api.getRawMaterialById(rawMaterialId);
    document.getElementById("raw-material-id").value = rawMaterial.id;
    document.getElementById("raw-material-name").value = rawMaterial.nome;
    document.getElementById("raw-material-supplier").value = rawMaterial.fornecedor;
    document.getElementById("raw-material-unit").value = rawMaterial.unidade;
    document.getElementById("raw-material-price").value = rawMaterial.preco;
  } catch {
    alert("ocorreu um erro");
  }
}