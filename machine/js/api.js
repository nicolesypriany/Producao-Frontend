import showAlert from "../../alert.js";
import { showAlertError } from "../../alert.js";
import { showAlertSuccess } from "../../alert.js";

const URL_BASE = "https://localhost:7133";

const api = {
  async getMachines() {
    try {
      const response = await fetch(`${URL_BASE}/Maquina`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });
      if (response.status !== 200) {
        showAlertError("Erro ao buscar máquinas", response.status);
      }
      return response.json();
    } catch (error) {
      showAlert("Erro ao buscar máquinas", error);
    }
  },

  async getMachineById(id) {
    try {
      const response = await fetch(`${URL_BASE}/Maquina/${id}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      if (response.status !== 200) {
        showAlertError("Erro ao buscar máquina", response.status);
      }
      return response.json();
    } catch (error) {
      showAlert("Erro ao buscar máquina", error);
    }
  },

  async createMachine(machine) {
    try {
      const response = await fetch(`${URL_BASE}/Maquina`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(machine),
      });
      if (response.status == 200) {
        showAlertSuccess("Máquina criada com sucesso!")
      }
      if (response.status !== 200) {
        showAlertError("Erro ao criar máquina", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao criar máquina", error);
    }
  },

  async updateMachine(machine) {
    try {
      const response = await fetch(`${URL_BASE}/Maquina/${machine.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(machine),
      });
      if (response.status == 200) {
        showAlertSuccess("Máquina atualizada com sucesso! Atualize a listagem")
      }
      if (response.status !== 200) {
        showAlertError("Erro ao atualizar máquina", response.status);
      }
      return await response.json();
  } catch (error) {
    showAlert("Erro ao atualizar máquina", error);
  }
},

  async handleDelete(event) {
    event.preventDefault();
      const id = document.getElementById("machine-id").value;
      const machine = await getMachineById(id);
      await deleteMachine({ machine });
  },

  async deleteMachine(machine) {
    try {
      const response = await fetch(`${URL_BASE}/Maquina/${machine.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(machine),
      });
      if (response.status == 200) {
        showAlertSuccess("Máquina excluída com sucesso! Atualize a página")
      }
      if (response.status !== 200) {
        showAlertError("Erro ao excluir máquina", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao excluir máquina", error);
    }
  }
};

export default api;