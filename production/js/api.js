const URL_BASE = "https://localhost:7133";

const api = {
  async getProductions() {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao`);
      return response.json();
    } catch (error) {
      alert(error);
    }
  },

  async getProductionById(id) {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao/${id}`);
      return await response.json();
    } catch {
      alert("Erro ao buscar produção");
    }
  },

  async createProduction(production) {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(production),
      });
      alert("Produção criada com sucesso!");
      //window.location.replace("index.html");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async updateProduction(production) {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao/${production.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(production),
      });
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async handleDelete(event) {
    event.preventDefault();
    try {
      const id = document.getElementById("production-id").value;
      const production = await getProductionById(id);
      await deleteProduction({ production });
      alert("Produção excluída com sucesso!");
    } catch (error) {
      alert(error);
    }
  },

  async deleteProduction(production) {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao/${production.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(production),
      });
      alert("Produção excluída com sucesso!");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async calculateProduction(production) {
    try {
      const response = await fetch(`${URL_BASE}/ProcessoProducao/CalcularProducao/${production.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(production),
      });
      alert("Produção calculada com sucesso!");
      return await response.json();
    } catch (error) {
      alert(error)
    }
  }
};

export default api;
