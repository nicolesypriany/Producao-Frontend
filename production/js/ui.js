import api from "./api.js";
import apilog from "../../logApi.js";
import GetUserRole from "../../interface.js"
import { showAlertError } from "../../alert.js";

const ITEMS_PER_PAGE = 10;

document.addEventListener("DOMContentLoaded", async () => {
  const productions = await api.getProductions();
  setupPagination(productions);
});

function setupPagination(productions) {
  const totalPages = Math.ceil(productions.length / ITEMS_PER_PAGE);
  let currentPage = 1;

  function renderPage(page) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageProductions = productions.slice(start, end);
    renderProductions(pageProductions);
    renderButtons(pageProductions);
    renderPaginationControls(page, totalPages);
  }

  function renderPaginationControls(current, total) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= total; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.className = i === current ? "active-page" : "";
      btn.addEventListener("click", () => {
        currentPage = i;
        renderPage(currentPage);
      });
      pagination.appendChild(btn);
    }
  }

  renderPage(currentPage);
}

async function renderProductions(productions) {
  const tableProductions = document.getElementById("table-productions");
  const dialogContainer = document.getElementById("dialogs-container");

  tableProductions.innerHTML = "";
  dialogContainer.innerHTML = "";

    productions.forEach((production) => {
      tableProductions.innerHTML += `
        <tr>
          <td class="td-name" id="td-${production.id}">${new Date(production.data).toLocaleDateString()}</td>
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
        </tr>
      `;

      dialogContainer.insertAdjacentHTML("beforeend", `
        <dialog id="dialog-${production.id}">
          <p>Deseja realmente excluir a produção?</p>
          <button id="confirm-delete-${production.id}" class="confirm-delete">Sim</button>
          <button id="cancel-delete-${production.id}" class="cancel-delete">Cancelar</button>
        </dialog>
        <dialog id="dialog-details-${production.id}">
          <div class="div-header-with-button">
            <h1>Registro de alterações</h1>
            <button id="close-details-dialog-${production.id}" class="button-delete">Fechar</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Ação</th>
                <th>Data</th>
                <th>Dado alterado</th>
                <th>Conteudo</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody id="log-rows-${production.id}"></tbody>
          </table>
        </dialog>
      `);

        const rawMaterialsTable = document.getElementById(`table-raw-materials-${production.id}`);
        Array.from(production.producaoMateriasPrimas).forEach(rawMaterial => {
          rawMaterialsTable.innerHTML += `
          <tbody>
            <tr>
					    <td>${rawMaterial.nomeMateriaPrima}</td>
					    <td>R$ ${rawMaterial.preco}</td>
					    <td>${rawMaterial.quantidade.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
          </tbody>
          `
          ;
        });
    });

    const exportXLXSButton = document.getElementById("xlsx-export");
    exportXLXSButton.addEventListener("click", async () => {
      await api.exportXLSX();
    });

    const exportTXTButton = document.getElementById("txt-export");
    exportTXTButton.addEventListener("click", async () => {
      await api.exportTXT();
    });
}

async function renderButtons(productions) {
  const buttonAdd = document.getElementById("button-add");
    buttonAdd.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        window.location.href = "create-production.html";
      } else {
        showAlertError("Ação não autorizada!");
      }
    });

  productions.forEach((production) => {
    const showDetailsButton = document.getElementById(`show-details-${production.id}`);
    const rawMaterialsDialog = document.getElementById(`raw-materials-${production.id}`);
    const closeDialogRawMaterial = document.getElementById(`close-raw-materials-dialog-${production.id}`);
    const updateProduction = document.getElementById(`button-update-production-${production.id}`)

    updateProduction.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
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
    const cancelButton = document.getElementById(`cancel-delete-${production.id}`);

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

    cancelButton.addEventListener("click", () => modal.close());

    const td = document.getElementById(`td-${production.id}`);
    const dialogDetails = document.getElementById(`dialog-details-${production.id}`);
    const closeDetails = document.getElementById(`close-details-dialog-${production.id}`);
    const tbodyLogs = document.getElementById(`log-rows-${production.id}`);

    td.addEventListener("click", async () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
      const objeto = "ProcessoProducao";
      const objetoId = production.id;
      const logs = await apilog.getLogs({ objeto, objetoId });
        tbodyLogs.innerHTML = "";
  
        Array.from(logs).forEach(log => {
          if (log.acao == "Criar" || log.acao == "Inativar") {
            tbodyLogs.innerHTML += `
            <tr>
              <td>${log.acao}</td>
              <td>${new Date(log.data).toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'})}</td>
              <td></td>
              <td></td>
              <td>${log.usuario}</td>
            </tr>
          `;
          } else {
          tbodyLogs.innerHTML += `
            <tr>
              <td>${log.acao}</td>
              <td>${new Date(log.data).toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'})}</td>
              <td>${log.dadoAlterado}</td>
              <td>${log.conteudo}</td>
              <td>${log.usuario}</td>
            </tr>
          `;
        }
      });
    
    if(logs.StatusCode !== 404) {
      dialogDetails.showModal();
    }
   } else {
      showAlertError("Ação não autorizada!");
    }
    });

    closeDetails.addEventListener("click", () => dialogDetails.close());
  });
}