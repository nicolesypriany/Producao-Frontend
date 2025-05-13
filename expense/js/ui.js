import api from "./api.js";
import apilog from "../../logApi.js";
import GetUserRole from "../../interface.js"
import { showAlertError } from "../../alert.js";

function getItemsPerPage() {
  if (window.innerHeight < 700) {
    return 6;
  } else if (window.innerHeight < 730) {
    return 9;
  } else if (window.innerHeight < 850) {
    return 9;
  } else if (window.innerHeight < 1080) {
    return 11;
  } else {
    return 15;
  }
}

let ITEMS_PER_PAGE = getItemsPerPage();

document.addEventListener("DOMContentLoaded", async () => {
  const expenses = await api.getExpenses();
  setupPagination(expenses);
});

function setupPagination(expenses) {
  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);
  let currentPage = 1;

  function renderPage(page) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageExpenses = expenses.slice(start, end);
    renderExpenses(pageExpenses);
    renderButtons(pageExpenses);
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

async function renderExpenses(expenses) {
  const tableExpenses = document.getElementById("table-expenses");
  const dialogContainer = document.getElementById("dialogs-container");

  tableExpenses.innerHTML = "";
  dialogContainer.innerHTML = "";

    expenses.forEach((expense) => {
      tableExpenses.innerHTML += `
			<tr>
				<td class="td-name" id="td-${expense.id}">${expense.nome}</td>
				<td>${expense.descricao} </td>
        <td>${expense.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
				<td style="text-align: right">
					<button class="button-update" id="button-update-expense-${expense.id}">Editar</button>
					<button id="button-delete-${expense.id}" class="button-delete">Excluir</button>
				</td>
			</tr>
			`;

      dialogContainer.insertAdjacentHTML("beforeend", `
        <dialog id="dialog-${expense.id}">
          <p>Deseja realmente excluir a despesa?</p>
          <button id="confirm-delete-${expense.id}" class="confirm-delete">Sim</button>
          <button id="cancel-delete-${expense.id}" class="cancel-delete">Cancelar</button>
        </dialog>
        <dialog id="dialog-details-${expense.id}">
          <div class="div-header-with-button">
            <h1>Registro de alterações</h1>
            <button id="close-details-dialog-${expense.id}" class="button-delete">Fechar</button>
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
            <tbody id="log-rows-${expense.id}"></tbody>
          </table>
        </dialog>
      `);
    });
}


async function renderButtons(expenses) {
  const buttonAdd = document.getElementById("button-add");
    buttonAdd.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        window.location.href = "create-expense.html";
      } else {
        showAlertError("Ação não autorizada!");
      }
    });

  expenses.forEach((expense) => {
    const deleteButton = document.getElementById(`button-delete-${expense.id}`);
    const modal = document.getElementById(`dialog-${expense.id}`);
    const confirmButton = document.getElementById(
      `confirm-delete-${expense.id}`
    );
    const cancelButton = document.getElementById(`cancel-delete-${expense.id}`);
    const updateExpense = document.getElementById(`button-update-expense-${expense.id}`)

    updateExpense.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        window.location.href = `update-expense.html?id=${encodeURIComponent(expense.id)}`;
      } else {
        showAlertError("Ação não autorizada!");
      }
    });

    deleteButton.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        modal.showModal();
      } else {
        showAlertError("Ação não autorizada!");
      }
    });


    confirmButton.addEventListener("click", async () => {
      await api.deleteExpense(expense);
      modal.close();
    });

    cancelButton.addEventListener("click", () => modal.close());

    const td = document.getElementById(`td-${expense.id}`);
    const dialogDetails = document.getElementById(`dialog-details-${expense.id}`);
    const closeDetails = document.getElementById(`close-details-dialog-${expense.id}`);
    const tbodyLogs = document.getElementById(`log-rows-${expense.id}`);

    td.addEventListener("click", async () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
      const objeto = "Despesa";
      const objetoId = expense.id;
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

      dialogDetails.showModal();
    } else {
      showAlertError("Ação não autorizada!");
    }
    });

    closeDetails.addEventListener("click", () => dialogDetails.close());
  });
}