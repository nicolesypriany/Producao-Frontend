import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("create-product-form");
  form.addEventListener("submit", handleFormSubmit);
});

async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const nome = document.getElementById("product-name").value;
    const medidas = document.getElementById("product-dimensions").value;
    const unidade = document.getElementById("product-unit").value;
    const pecasPorUnidade = document.getElementById("product-piecesPerUnit").value;
    await api.createProduct({ nome, medidas, unidade, pecasPorUnidade });
  } catch (error) {
    alert(error);
  }
}
