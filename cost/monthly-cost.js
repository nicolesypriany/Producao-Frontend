import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("cost-form");
  form.addEventListener("submit", handleFormSubmit);
});

async function handleFormSubmit(event) {
	event.preventDefault();
	try {
			const mes = document.getElementById("month").value;
			const ano = document.getElementById("year").value;
			const response = await api.calculateMonthlyCost({ mes, ano });

			console.log(response.StatusCode);
			if (response.StatusCode == 404) {
					alert("Nenhum resultado encontrado para o período informado.");
			} else {
					await renderProductions(response);
			}
	} catch (error) {
			alert(error);
	}
}

async function renderProductions(response) {
  const container = document.getElementById("results-container");
  container.style.display = "block";

  document.getElementById("cost-label").innerHTML = `
    <label for="cost">Custo mensal: ${response.custoMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
  `;

  document.getElementById("productions-label").innerHTML = `
    <label for="productions">Total de produções: ${response.producoesDoMes.length}</label>
  `;

  document.getElementById("expenses-label").innerHTML = `
    <label for="expenses">Total de despesas: ${response.totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
  `;

  document.getElementById("total-cost-label").innerHTML = `
    <label for="total-cost-label">Custo total das produções: ${response.custoTotalProducoes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
  `;

  const tableProductions = document.getElementById("table-productions");
  tableProductions.innerHTML = "";

  response.producoesDoMes.forEach(production => {
    tableProductions.innerHTML += `
      <tr>
        <td>${new Date(production.data).toLocaleDateString()}</td>
        <td>${production.maquina}</td>
				<td>${production.produto}</td>
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

  await renderButtons(response.producoesDoMes);
  await renderExpenses(response.despesas);
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

async function renderExpenses(expenses) {
  const tableExpenses = document.getElementById("table-expenses");
  tableExpenses.innerHTML = "";

  console.log(expenses);
  expenses.forEach(expense => {
    tableExpenses.innerHTML += `
      <tr>
        <td>${expense.nome}</td>
        <td>${expense.descricao}</td>
        <td>${expense.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      </tr>
    `;
  });
}