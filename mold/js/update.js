import api from "./api.js";
import productsApi from "../../product/js/api.js"

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const moldId = params.get("id");
  const form = document.getElementById("create-mold-form");
  const products = await productsApi.getProducts();
  await renderProducts(products, moldId)
  await fillForm(moldId);
  form.addEventListener("submit", handleFormSubmit);
});

async function renderProducts(products, moldId) {
	const select = document.getElementById("mold-product");
    const mold = await api.getMoldById(moldId);
    const productSelected = mold.produto.id;
	try {
		Array.from(products).forEach((product => {
            if(product.id == productSelected) {
                select.innerHTML += `   
                <option value="${product.id}" selected>${product.nome}</option>
		        `;
            } else {
                select.innerHTML += `   
                <option value="${product.id}">${product.nome}</option>
		        `;
            }
		}));
	}
	catch (error) {
		alert(error)
	}
}

async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const id = document.getElementById("mold-id").value;
    const nome = document.getElementById("mold-name").value;
    const produtoId = document.getElementById("mold-product").value;
    const pecasPorCiclo = document.getElementById("mold-pieces-per-cicle").value;
    const maquinas = [];
    await api.updateMold({ id, nome, produtoId, pecasPorCiclo, maquinas });
    alert("Forma atualizada com sucesso!");
    window.location.replace("index.html");
  } catch (error) {
    alert(error);
  }
}

async function fillForm(moldId) {
  try {
    const mold = await api.getMoldById(moldId);
    document.getElementById("mold-id").value = mold.id;
    document.getElementById("mold-name").value = mold.nome;
    document.getElementById("mold-pieces-per-cicle").value = mold.pecasPorCiclo;
  } catch {
    alert("ocorreu um erro");
  }
}