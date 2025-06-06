import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const expenseId = params.get("id");
  const form = document.getElementById("create-expense-form");
  fillForm(expenseId);
  form.addEventListener("submit", handleFormSubmit);
});

async function handleFormSubmit(event) {
  event.preventDefault();
  const id = document.getElementById("expense-id").value;
  const nome = document.getElementById("expense-name").value;
  const descricao = document.getElementById("expense-description").value;
  const valor = document.getElementById("expense-value").value;
  await api.updateExpense({ id, nome, descricao, valor });
}

async function fillForm(expenseId) {
  const expense = await api.getExpenseById(expenseId);
  document.getElementById("expense-id").value = expense.id;
  document.getElementById("expense-name").value = expense.nome;
  document.getElementById("expense-description").value = expense.descricao;
  document.getElementById("expense-value").value = expense.valor;
}
