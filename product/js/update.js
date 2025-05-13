import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const form = document.getElementById("create-product-form");
  fillForm(productId);
  form.addEventListener("submit", handleFormSubmit);
});

async function handleFormSubmit(event) {
  event.preventDefault();
  const id = document.getElementById("product-id").value;
  const nome = document.getElementById("product-name").value;
  const medidas = document.getElementById("product-dimensions").value;
  const unidade = document.getElementById("product-unit").value;
  const pecasPorUnidade = document.getElementById(
    "product-piecesPerUnit"
  ).value;
  await api.updateProduct({ id, nome, medidas, unidade, pecasPorUnidade });
}

async function fillForm(productId) {
  const product = await api.getProductById(productId);
  document.getElementById("product-id").value = product.id;
  document.getElementById("product-name").value = product.nome;
  document.getElementById("product-dimensions").value = product.medidas;
  document.getElementById("product-unit").value = product.unidade;
  document.getElementById("product-piecesPerUnit").value =
    product.pecasPorUnidade;
}
