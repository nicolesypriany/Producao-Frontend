import showAlert from "../../alert.js";
import { showAlertError } from "../../alert.js";

const URL_BASE = "https://localhost:7133";

const api = {
  async getMolds() {
    try {
      const response = await fetch(`${URL_BASE}/Forma`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });
      if (response.status !== 200) {
        showAlertError("Erro ao buscar formas", response.status);
      }
      return response.json();
    } catch (error) {
      showAlert("Erro ao buscar formas", error);
    }
  },

  async getMoldById(id) {
    try {
      const response = await fetch(`${URL_BASE}/Forma/${id}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });
      if (response.status !== 200) {
        showAlertError("Erro ao buscar forma", response.status);
      }
      return response.json();
    } catch (error) {
      showAlert("Erro ao buscar forma", error);
    }
  },

  async createMold(mold) {
    try {
      const response = await fetch(`${URL_BASE}/Forma`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(expense),
      });
      if (response.status !== 200) {
        showAlertError("Erro ao criar forma", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao criar forma", error);
    }
  },

  async updateMold(mold) {
    try {
      const response = await fetch(`${URL_BASE}/Forma/${mold.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(request),
      });
      if (response.status !== 200) {
        showAlertError("Erro ao atualizar forma", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao atualizar forma", error);
    }
  },

  async handleDelete(event) {
    event.preventDefault();
      const id = document.getElementById("mold-id").value;
      const mold = await getMoldById(id);
      await deleteMold({ mold });
  },

  async deleteMold(mold) {
    try {
      const response = await fetch(`${URL_BASE}/Forma/${mold.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(request),
      });
      if (response.status !== 200) {
        showAlertError("Erro ao excluir forma", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao excluir forma", error);
    }
  },
};

export default api;
