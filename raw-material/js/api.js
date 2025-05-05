import showAlert from "../../alert.js";
import { showAlertError } from "../../alert.js";

const URL_BASE = "https://localhost:7133";

const api = {
  async getRawMaterials() {
    try {
      const response = await fetch(`${URL_BASE}/MateriaPrima`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });
      if (response.status !== 200) {
        showAlertError("Erro ao buscar matérias-primas", response.status);
      }
      return response.json();
    } catch (error) {
      showAlert("Erro ao buscar matérias-primas", error);
    }
  },

  async getRawMaterialById(id) {
    try {
      const response = await fetch(`${URL_BASE}/MateriaPrima/${id}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });
      if (response.status !== 200) {
        showAlertError("Erro ao buscar matéria-prima", response.status);
      }
      return response.json();
    } catch (error) {
      showAlert("Erro ao buscar matéria-prima", error);
    }
  },

  async createRawMaterial(rawMaterial) {
    try {
      const response = await fetch(`${URL_BASE}/MateriaPrima`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(rawMaterial),
      });
      if (response.status !== 200) {
        showAlertError("Erro ao criar matéria-prima", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao criar matéria-prima", error);
    }
  },

  async updateRawMaterial(rawMaterial) {
    try {
      const response = await fetch(`${URL_BASE}/MateriaPrima/${rawMaterial.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify(rawMaterial),
        });
        if (response.status !== 200) {
          showAlertError("Erro ao atualizar matéria-prima", response.status);
        }
        return await response.json();
      } catch (error) {
        showAlert("Erro ao atualizar matéria-prima", error);
      }
  },

  async handleDelete(event) {
    event.preventDefault();
      const id = document.getElementById("raw-material-id").value;
      const rawMaterial = await getRawMaterialById(id);
      await deleteRawMaterial({ rawMaterial });
  },

  async deleteRawMaterial(rawMaterial) {
    try {
      const response = await fetch(`${URL_BASE}/MateriaPrima/${rawMaterial.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(rawMaterial),
      });
      if (response.status !== 200) {
        showAlertError("Erro ao excluir matéria-prima", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao excluir matéria-prima", error);
    }
  }
};

export default api;
