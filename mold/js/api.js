const URL_BASE = "https://localhost:7133";

const api = {
  async getMolds() {
    try {
      const response = await fetch(`${URL_BASE}/Forma`);
      return response.json();
    } catch (error) {
      alert(error);
    }
  },

  async getMoldById(id) {
    try {
      const response = await fetch(`${URL_BASE}/Forma/${id}`);
      return await response.json();
    } catch {
      alert("Erro ao buscar forma");
    }
  },

  async createMold(mold) {
    try {
      const response = await fetch(`${URL_BASE}/Forma`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mold),
      });
      alert("Forma criada com sucesso!");
      window.location.replace("index.html");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async updateMold(mold) {
    try {
      const response = await fetch(`${URL_BASE}/Forma/${mold.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mold),
      });
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async handleDelete(event) {
    event.preventDefault();
    try {
      const id = document.getElementById("mold-id").value;
      const mold = await getMoldById(id);
      await deleteMold({ mold });
      alert("Forma excluída com sucesso!");
    } catch (error) {
      alert(error);
    }
  },

  async deleteMold(mold) {
    try {
      const response = await fetch(`${URL_BASE}/Forma/${mold.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mold),
      });
      alert("Forma excluída com sucesso!");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },
};

export default api;
