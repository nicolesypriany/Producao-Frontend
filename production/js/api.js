import showAlert from "../../alert.js";

const URL_BASE = "https://localhost:7133";

const api = {
  async getProductions(errorMessage) {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });
      showAlert(errorMessage, null, response.status);
      return response.json();
    } catch (error) {
      showAlert(errorMessage, error);
    }
  },

  async getProductionById(id, errorMessage) {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao/${id}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      showAlert(errorMessage, null, response.status);
      return await response.json();
    } catch (error) {
      showAlert(errorMessage, error);
    }
  },

  async createProduction(production, errorMessage) {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(production),
      });
      window.location.replace("index.html");
      showAlert(errorMessage, null, response.status);
      return await response.json();
    } catch (error) {
      showAlert(errorMessage, error);
    }
  },

  async updateProduction(production, errorMessage) {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao/${production.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(production),
      });
      showAlert(errorMessage, null, response.status);
      return await response.json();
    } catch (error) {
      showAlert(errorMessage, error);
    }
  },

  async handleDelete(event) {
    event.preventDefault();
    try {
      const id = document.getElementById("production-id").value;
      const production = await getProductionById(id);
      await deleteProduction({ production });
    } catch (error) {
      showAlert(errorMessage, error);
    }
  },

  async deleteProduction(production, errorMessage) {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao/${production.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(production),
      });
      showAlert(errorMessage, null, response.status);
      return await response.json();
    } catch (error) {
      showAlert(errorMessage, error);
    }
  },

  async calculateProduction(production, errorMessage) {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao/CalcularProducao/${production.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(production),
      });
      showAlert(errorMessage, null, response.status);
      return await response.json();
    } catch (error) {
      showAlert(errorMessage, error);
    }
  }
};

export default api;