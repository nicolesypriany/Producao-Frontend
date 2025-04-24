const URL_BASE = "https://localhost:7133";

const api = {
  async getExpenses() {
    try {
      const response = await fetch(`${URL_BASE}/Despesa`);
      return response.json();
    } catch (error) {
      alert(error);
    }
  },

  async getExpenseById(id) {
    try {
      const response = await fetch(`${URL_BASE}/Despesa/${id}`);
      return await response.json();
    } catch {
      alert("Erro ao buscar despesa");
    }
  },

  async createExpense(expense) {
    try {
      const response = await fetch(`${URL_BASE}/Despesa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });
      alert("Despesa criada com sucesso!");
      window.location.replace("index.html");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async updateExpense(expense) {
    try {
      const response = await fetch(`${URL_BASE}/Despesa/${expense.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async handleDelete(event) {
    event.preventDefault();
    try {
      const id = document.getElementById("expense-id").value;
      const expense = await getExpenseById(id);
      await deleteExpense({ expense });
      alert("Despesa excluída com sucesso!");
    } catch (error) {
      alert(error);
    }
  },

  async deleteExpense(expense) {
    try {
      const response = await fetch(`${URL_BASE}/Despesa/${expense.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });
      alert("Despesa excluída com sucesso!");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },
};

export default api;
