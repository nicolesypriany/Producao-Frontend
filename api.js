const URL_BASE = "https://localhost:7133";

const api = {
  async getMachines() {
    try {
      const response = await fetch(`${URL_BASE}/Maquina`);
      return response.json();
    } catch (error) {
      alert(error);
      alert("Erro ao buscar a API");
    }
  },

  async getMachineById(id) {
    try {
      const response = await fetch(`${URL_BASE}/Maquina/${id}`);
      return await response.json();
    } catch {
      alert("Erro ao buscar máquina");
    }
  },

  async createMachine(machine) {
    try {
      const response = await fetch(`${URL_BASE}/Maquina`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(machine),
      });
      alert("Máquina criada com sucesso!");
      window.location.replace("machine.html");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async updateMachine(machine) {
    try {
      const response = await fetch(`${URL_BASE}/Maquina/${machine.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(machine),
      });
      return await response.json();
    } catch (error) {
      alert(error);
      alert("Erro ao buscar a API");
    }
  },

  async handleDelete(event) {
    event.preventDefault();
    try {
      const id = document.getElementById("machine-id").value;
      const machine = await getMachineById(id);
      await deleteMachine({ machine });
      alert("Máquina excluída com sucesso!");
    } catch (error) {
      alert(error);
    }
  },

  async deleteMachine(machine) {
    try {
      const response = await fetch(`${URL_BASE}/Maquina/${machine.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(machine),
      });
      alert("Máquina excluída com sucesso!");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },
};

export default api;
