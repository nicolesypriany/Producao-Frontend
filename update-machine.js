const URL_BASE = "https://localhost:7133";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const machineId = params.get("id");
  const form = document.getElementById("create-machine-form");
  fillForm(machineId);
  form.addEventListener("submit", handleFormSubmit);
});

async function getMachineById(id) {
  try {
    const response = await fetch(`${URL_BASE}/Maquina/${id}`);
    return await response.json();
  } catch {
    alert("Erro ao buscar máquina");
  }
}

async function updateMachine(machine) {
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
}

async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const id = document.getElementById("machine-id").value;
    const nome = document.getElementById("machine-name").value;
    const marca = document.getElementById("machine-brand").value;
    await updateMachine({ id, nome, marca });
    alert("Máquina atualizada com sucesso!");
    window.location.replace("machine.html");
  } catch (error) {
    alert(error);
  }
}

async function fillForm(machineId) {
  try {
    const machine = await getMachineById(machineId);
    document.getElementById("machine-id").value = machine.id;
    document.getElementById("machine-name").value = machine.nome;
    document.getElementById("machine-brand").value = machine.marca;
  } catch {
    alert("ocorreu um erro");
  }
}
