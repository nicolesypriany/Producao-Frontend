import api from "./api.js";
import productsApi from "../../product/js/api.js"

document.addEventListener("DOMContentLoaded", async () => {
  	const form = document.getElementById("create-mold-form");
	const products = await productsApi.getProducts();
	await renderProducts(products)
	form.addEventListener("submit", handleFormSubmit);
});

async function renderProducts(products) {
	const select = document.getElementById("mold-product");
	try {
		Array.from(products).forEach((product => {
			select.innerHTML += `   
			<option value="${product.id}">${product.nome}</option>
		`;
		}));
	}
	catch (error) {
		alert(error)
	}
}

async function handleFormSubmit(event) {
	event.preventDefault();
	try {
		const nome = document.getElementById("mold-name").value;
		const produtoId = document.getElementById("mold-product").value;
		const pecasPorCiclo = document.getElementById("mold-pieces-per-cicle").value;
		const maquinas = [];
		await api.createMold({ nome, produtoId, pecasPorCiclo, maquinas });
	} 
	catch (error) {
		alert(error);
	}
}
