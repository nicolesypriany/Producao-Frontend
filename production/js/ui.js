import api from "./api.js";
import GetUserRole from "../../interface.js"
import { showAlertError } from "../../alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const productions = await api.getProductions();
  await renderProductions(productions);
  await renderButtons(productions);
});

async function renderProductions(productions) {
  const tableProductions = document.getElementById("table-productions");
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
            <button class="button-update" id="button-update-production-${production.id}">Editar</button>
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

async function renderButtons(productions) {
  productions.forEach((production) => {
    const showDetailsButton = document.getElementById(`show-details-${production.id}`);
    const rawMaterialsDialog = document.getElementById(`raw-materials-${production.id}`);
    const closeDialogRawMaterial = document.getElementById(`close-raw-materials-dialog-${production.id}`);
    const updateProduction = document.getElementById(`button-update-production-${production.id}`)

    updateProduction.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        console.log(`html/update-production.html?id=${encodeURIComponent(production.id)}`)
        window.location.href = `update-production.html?id=${encodeURIComponent(production.id)}`;
      } else {
        showAlertError("Ação não autorizada!");
      }
    });

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
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        modal.showModal();
      } else {
        showAlertError("Ação não autorizada!");
      }
    });

    confirmButton.addEventListener("click", async () => {
      await api.deleteProduction(production);
      modal.close();
    });

    closeButton.addEventListener("click", () => {
      modal.close();
    });
  });
}
