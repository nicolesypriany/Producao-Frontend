import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const expenses = await api.getExpenses();
  await renderExpenses(machines);
  await renderButtons(expenses);
});

async function renderExpenses(expenses) {
  const tableExpenses = document.getElementById("table-expenses");
  try {
    expenses.forEach((expense) => {
      tableExpenses.innerHTML += `
			<tr>
				<td>${expense.id}</td>
				<td>${expense.nome}</td>
				<td>${expense.descricao} </td>
                <td>${expense.valor}</td>
				<td style="text-align: right">
					<a href="update-expense.html?id=${expense.id}">
						<button class="button-update">Editar</button>
					</a>
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
  } catch (error) {
    alert("Erro ao carregar dados");
  }
}

async function renderButtons(expenses) {
  expenses.forEach((expense) => {
    const deleteButton = document.getElementById(`button-delete-${expense.id}`);
    const modal = document.getElementById(`dialog-${expense.id}`);
    const confirmButton = document.getElementById(
      `confirm-delete-${expense.id}`
    );
    const closeButton = document.getElementById(`cancel-delete-${expense.id}`);

    deleteButton.addEventListener("click", () => {
      modal.showModal();
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
