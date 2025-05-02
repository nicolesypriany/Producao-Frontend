import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const productions = await api.getProductions();
  if (productions !== undefined) {
    await renderProductions(productions);
    await renderButtons(productions);
  }
});

async function renderProductions(productions) {
  const tableProductions = document.getElementById("table-productions");
  try {
    productions.forEach((production) => {
      tableProductions.innerHTML += `
        <tr>
          <td>${new Date(production.data).toLocaleDateString()}</td>
          <td>${production.maquina}</td>
          <td>${production.produto}</td>
          <td>${production.ciclos}</td>
          <td style="width: 60px">
            <button class="button-show-details" id="show-details-${production.id}">
              Visualizar
            </button>
					</td>
					<td style="width: 60px">${production.quantidadeProduzida.toFixed(2).replace('.', ',')}</td>
          <td>${production.unidade}</td>
          <td style="width: 60px">${production.custoUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
					<td>${production.custoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
					<td style="text-align: right">
            <a href="update-production.html?id=${production.id}">
              <button class="button-update">Editar</button>
            </a>
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
            <button id="button-delete-${production.id}" class="button-delete">Excluir</button>
          </td>
          <dialog id="dialog-${production.id}">
            <p>Deseja realmente excluir a produção?</p>
            <button id="confirm-delete-${production.id}" class="confirm-delete">Sim</button>
            <button id="cancel-delete-${production.id}" class="cancel-delete">Cancelar</button>
          </dialog>
        </tr>
      `;

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
          `
          ;
        });
    });
  }
   catch (error) {
    alert("Erro ao carregar dados da produção");
  }
}

async function renderButtons(productions) {
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


    const deleteButton = document.getElementById(`button-delete-${production.id}`);
    const modal = document.getElementById(`dialog-${production.id}`);
    const confirmButton = document.getElementById(`confirm-delete-${production.id}`);
    const closeButton = document.getElementById(`cancel-delete-${production.id}`);

    deleteButton.addEventListener("click", () => {
      modal.showModal();
    });

    confirmButton.addEventListener("click", async () => {
      await api.deleteProduction(production);
      modal.close();
      window.location.reload();
    });

    closeButton.addEventListener("click", () => {
      modal.close();
    });
  });
}
