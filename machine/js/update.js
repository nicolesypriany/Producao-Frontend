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
  const id = document.getElementById("machine-id").value;
  const nome = document.getElementById("machine-name").value;
  const marca = document.getElementById("machine-brand").value;
  await api.updateMachine({ id, nome, marca });
}

async function fillForm(machineId) {
  const machine = await api.getMachineById(machineId);
  document.getElementById("machine-id").value = machine.id;
  document.getElementById("machine-name").value = machine.nome;
  document.getElementById("machine-brand").value = machine.marca;
}
