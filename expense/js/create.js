import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("create-expense-form");
  form.addEventListener("submit", handleFormSubmit);
});

async function handleFormSubmit(event) {
  event.preventDefault();
    const nome = document.getElementById("expense-name").value;
    const descricao = document.getElementById("expense-description").value;
    const valor = document.getElementById("expense-value").value;
    await api.createExpense({ nome, descricao, valor });
}
