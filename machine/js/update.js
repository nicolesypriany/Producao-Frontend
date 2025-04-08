import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const machineId = params.get("id");
  const form = document.getElementById("create-machine-form");
  fillForm(machineId);
  form.addEventListener("submit", handleFormSubmit);
});

async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const id = document.getElementById("machine-id").value;
    const nome = document.getElementById("machine-name").value;
    const marca = document.getElementById("machine-brand").value;
    await api.updateMachine({ id, nome, marca });
    alert("Máquina atualizada com sucesso!");
    window.location.replace("index.html");
  } catch (error) {
    alert(error);
  }
}

async function fillForm(machineId) {
  try {
    const machine = await api.getMachineById(machineId);
    document.getElementById("machine-id").value = machine.id;
    document.getElementById("machine-name").value = machine.nome;
    document.getElementById("machine-brand").value = machine.marca;
  } catch {
    alert("ocorreu um erro");
  }
}
