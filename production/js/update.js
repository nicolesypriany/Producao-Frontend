import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productionId = params.get("id");
  console.log(productionId);
//   const form = document.getElementById("create-production-form");
//   fillForm(productionId);
//   form.addEventListener("submit", handleFormSubmit);
});

// async function handleFormSubmit(event) {
//   event.preventDefault();
//   try {
//     const id = document.getElementById("machine-id").value;
//     const nome = document.getElementById("machine-name").value;
//     const marca = document.getElementById("machine-brand").value;
//     await api.updateMachine({ id, nome, marca });
//     alert("Máquina atualizada com sucesso!");
//     window.location.replace("index.html");
//   } catch (error) {
//     alert(error);
//   }
// }

async function fillForm(productionId) {
  try {
    const production = await api.getProductionById(productionId);
    document.getElementById("production-id").value = production.id;
    document.getElementById("production-date").value = production.data;
    document.getElementById("production-machine").value = production.maquina;
    document.getElementById("production-mold").value = production.forma;
    document.getElementById("production-cicles").value = production.ciclos;
  } catch {
    alert("ocorreu um erro");
  }
}
