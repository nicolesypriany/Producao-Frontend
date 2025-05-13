import api from "./api.js";
import productsApi from "../../product/js/api.js";
import { showAlertError } from "../../alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("create-mold-form");
  const products = await productsApi.getProducts();
  await renderProducts(products);
  form.addEventListener("submit", handleFormSubmit);
});

async function renderProducts(products) {
  const select = document.getElementById("mold-product");
  Array.from(products).forEach((product) => {
    select.innerHTML += `   
			<option value="${product.id}">${product.nome}</option>
		`;
  });
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const nome = document.getElementById("mold-name").value;
  const produtoId = document.getElementById("mold-product").value;
  if (produtoId == "") showAlertError("Selecione um produto!");
  const pecasPorCiclo = document.getElementById("mold-pieces-per-cicle").value;
  const maquinas = [];
  await api.createMold({ nome, produtoId, pecasPorCiclo, maquinas });
}
