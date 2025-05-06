import showAlert from "../../alert.js";
import { showAlertError } from "../../alert.js";
import { showAlertSuccess } from "../../alert.js";

const URL_BASE = "https://localhost:7133";

const api = {
  async getExpenses() {
    try {
      const response = await fetch(`${URL_BASE}/Despesa`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });
      if (response.status !== 200) {
        showAlertError("Erro ao buscar despesas", response.status);
      }
      return response.json();
    } catch (error) {
      showAlert("Erro ao buscar despesas", error);
    }
  },

  async getExpenseById(id) {
    try {
      const response = await fetch(`${URL_BASE}/Despesa/${id}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });
      if (response.status !== 200) {
        showAlertError("Erro ao buscar despesa", response.status);
      }
      return response.json();
    } catch (error) {
      showAlert("Erro ao buscar despesa", error);
    }
  },

  async createExpense(expense) {
    try {
      const response = await fetch(`${URL_BASE}/Despesa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(expense),
      });
      if (response.status == 200) {
        showAlertSuccess("Despesa criada com sucesso!")
      }
      if (response.status !== 200) {
        showAlertError("Erro ao criar despesa", response.status);
      }
      if(response.status === 200) {
        showAlertSuccess("Despesa criada com sucesso!")
      }
    } catch (error) {
      showAlert("Erro ao criar despesa", error);
    }
  },

  async updateExpense(expense) {
    try {
      const response = await fetch(`${URL_BASE}/Despesa/${expense.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(expense),
      });
      if (response.status == 200) {
        showAlertSuccess("Despesa atualizada com sucesso!")
      }
      if (response.status !== 200) {
        showAlertError("Erro ao atualizar despesa", response.status);
      }
      if (response.status === 200) {
        showAlertSuccess("Despesa atualizada!");
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao atualizar despesa", error);
    }
  },

  async handleDelete(event) {
    event.preventDefault();
    const id = document.getElementById("expense-id").value;
    const expense = await getExpenseById(id);
    await deleteExpense({ expense });
  },

  async deleteExpense(expense) {
    try {
      const response = await fetch(`${URL_BASE}/Despesa/${expense.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(request),
      });
      if (response.status == 200) {
        showAlertSuccess("Despesa excluída com sucesso!")
      }
      if (response.status !== 200) {
        showAlertError("Erro ao excluir despesa", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao excluir despesa", error);
    }
  }
};

export default api;
