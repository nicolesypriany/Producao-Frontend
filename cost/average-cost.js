import api from "./api.js";
import productsApi from "../../product/js/api.js"
import { showAlertError } from "../alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("cost-form");
	const products = await productsApi.getProducts();
	await renderProducts(products)
  form.addEventListener("submit", handleFormSubmit);
});

async function renderProducts(products) {
  const select = document.getElementById("product");
  Array.from(products).forEach((product => {
    select.innerHTML += `
    <option value="${product.id}">${product.nome}</option>
    `;
  }));
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const produtoId = document.getElementById("product").value;
  if (produtoId == "") showAlertError("Selecione um produto");
  const dataInicio = document.getElementById("start-date").value;
  const dataFim = document.getElementById("end-date").value;
  const response = await api.calculatePeriodCost({ produtoId, dataInicio, dataFim });
  await renderProductions(response);
  await renderButtons(response.producoes);
}

async function renderProductions(response) {
  const container = document.getElementById("results-container");
  container.style.display = "block";

  document.getElementById("cost-label").innerHTML = `
    <label for="cost">Custo médio: ${response.custoMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
  `;

  document.getElementById("productions-label").innerHTML = `
    <label for="productions">Total de produções: ${response.producoes.length}</label>
  `;

  const tableProductions = document.getElementById("table-productions");
  tableProductions.innerHTML = "";

  response.producoes.forEach(production => {
    tableProductions.innerHTML += `
      <tr>
        <td>${production.id}</td>
        <td>${new Date(production.data).toLocaleDateString()}</td>
        <td>${production.maquina}</td>
        <td>${production.ciclos}</td>
        <td>
          <button class="button-show-details" id="show-details-${production.id}">Visualizar</button>
          <dialog id="raw-materials-${production.id}" class="raw-materials-dialog">
            <div class="div-header-with-button">
              <h1>Matérias Primas</h1>
              <button id="close-raw-materials-dialog-${production.id}" class="button-delete">Fechar</button>
            </div>
            <table id="table-raw-materials-${production.id}">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
            </table>
          </dialog>
        </td>
        <td>${production.quantidadeProduzida.toFixed(2).replace('.', ',')}</td>
        <td>${production.unidade}</td>
        <td>${production.custoUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td>${production.custoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      </tr>
    `;

    renderRawMaterials(production);
  });

  await renderButtons(response.producoes);
}


async function renderRawMaterials(production) {
  const rawMaterialsTable = document.getElementById(`table-raw-materials-${production.id}`);
  Array.from(production.producaoMateriasPrimas).forEach(rawMaterial => {
    rawMaterialsTable.innerHTML += `
      <tbody>
        <tr>
          <td>${rawMaterial.nomeMateriaPrima}</td>
          <td>${rawMaterial.preco}</td>
          <td>${rawMaterial.quantidade}</td>
        </tr>
      </tbody>
    `;
  });
}

async function renderButtons(productions) {
  try {
    productions.forEach((production) => {
      const showDetailsButton = document.getElementById(`show-details-${production.id}`);
      const rawMaterialsDialog = document.getElementById(`raw-materials-${production.id}`);
      const closeDialogRawMaterial = document.getElementById(`close-raw-materials-dialog-${production.id}`);

      showDetailsButton.addEventListener("click", () => {
        rawMaterialsDialog.showModal();
      });

      closeDialogRawMaterial.addEventListener("click", () => {
        rawMaterialsDialog.close();
      });
    });
  } catch (error) {
    alert(error);
  }
}