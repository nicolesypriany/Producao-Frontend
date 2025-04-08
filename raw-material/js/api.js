const URL_BASE = "https://localhost:7133";

const api = {
  async getRawMaterials() {
    try {
      const response = await fetch(`${URL_BASE}/MateriaPrima`);
      return response.json();
    } catch (error) {
      alert(error);
    }
  },

  async getRawMaterialById(id) {
    try {
      const response = await fetch(`${URL_BASE}/MateriaPrima/${id}`);
      return await response.json();
    } catch {
      alert("Erro ao buscar matéria-prima");
    }
  },

  async createRawMaterial(rawMaterial) {
    try {
      const response = await fetch(`${URL_BASE}/MateriaPrima`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawMaterial),
      });
      alert("Matéria-prima criada com sucesso!");
      window.location.replace("index.html");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async updateRawMaterial(rawMaterial) {
    try {
      const response = await fetch(`${URL_BASE}/MateriaPrima/${rawMaterial.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawMaterial),
      });
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async handleDelete(event) {
    event.preventDefault();
    try {
      const id = document.getElementById("raw-material-id").value;
      const rawMaterial = await getRawMaterialById(id);
      await deleteRawMaterial({ rawMaterial });
      alert("Matéria-prima excluída com sucesso!");
    } catch (error) {
      alert(error);
    }
  },

  async deleteRawMaterial(rawMaterial) {
    try {
      const response = await fetch(`${URL_BASE}/MateriaPrima/${rawMaterial.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawMaterial),
      });
      alert("Matéria-prima excluída com sucesso!");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },
};

export default api;
