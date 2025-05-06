import api from "./api.js";
import GetUserRole from "../../interface.js"
import { showAlertError } from "../../alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const expenses = await api.getExpenses();
  await renderExpenses(expenses);
  await renderButtons(expenses);
});

async function renderExpenses(expenses) {
  const tableExpenses = document.getElementById("table-expenses");
    expenses.forEach((expense) => {
      tableExpenses.innerHTML += `
			<tr>
				<td>${expense.id}</td>
				<td>${expense.nome}</td>
				<td>${expense.descricao} </td>
        <td>${expense.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
				<td style="text-align: right">
					<button class="button-update" id="button-update-expense-${expense.id}">Editar</button>
					<button id="button-delete-${expense.id}" class="button-delete">Excluir</button>
				</td>
				<dialog id="dialog-${expense.id}">
					<p>Deseja realmente excluir a despesa?</p>
					<button id="confirm-delete-${expense.id}" class="confirm-delete">Sim</button>
					<button id="cancel-delete-${expense.id}" class="cancel-delete">Cancelar</button>
				</dialog>
			</tr>
			`;
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
    const closeButton = document.getElementById(`cancel-delete-${expense.id}`);
    const updateExpense = document.getElementById(`button-update-expense-${expense.id}`)

    updateExpense.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        window.location.href = `update-expense.html?id=${encodeURIComponent(mold.id)}`;
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
      window.location.reload();
    });

    closeButton.addEventListener("click", () => {
      modal.close();
    });
  });
}
