import api from "./api.js";
import machinesApi from "../../machine/js/api.js";
import moldsApi from "../../mold/js/api.js";
import rawMaterialApi from "../../raw-material/js/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productionId = params.get("id");
  const production = await api.getProductionById(productionId);
  const machines = await machinesApi.getMachines();
  const molds = await moldsApi.getMolds();
  const rawMaterials = await rawMaterialApi.getRawMaterials();
  const form = document.getElementById("create-production-form");
  await renderMachines(machines, production);
  await renderMolds(molds, production);
  await renderRawMaterials(rawMaterials);
  fillForm(productionId);
  form.addEventListener("submit", handleFormSubmit);
});

async function renderMachines(machines, production) {
  const select = document.getElementById("production-machine");
  const machineSelected = production.maquina;
  try {
    Array.from(machines).forEach((machine) => {
      if (machine.nome === machineSelected) {
        select.innerHTML += `
        <option value="${machine.id}" selected>${machine.nome}</option>
        `;
      } else {
        select.innerHTML += `
        <option value="${machine.id}">${machine.nome}</option>
		    `;
      }
    });
  } catch (error) {
    alert(error);
  }
}

async function renderMolds(molds, production) {
  const select = document.getElementById("production-mold");
  const moldSelected = production.forma;
  try {
    Array.from(molds).forEach((mold) => {
      if (mold.nome == moldSelected) {
        select.innerHTML += `
        <option value="${mold.id}" selected>${mold.nome}</option>
        `;
      } else {
        select.innerHTML += `   
        <option value="${mold.id}">${mold.nome}</option>
		    `;
      }
    });
  } catch (error) {
    alert(error);
  }
}

async function renderRawMaterials(rawMaterials) {
  const table = document.getElementById("raw-materials-table");
  try {
    Array.from(rawMaterials).forEach((rawMaterial) => {
      table.innerHTML += `
				<tr>
					<td>${rawMaterial.nome}</td>
					<td>
						<input class="raw-material-quantity" id="${rawMaterial.id}-quantity" type="number" step="any" name="rawMaterial-quantidade" />
					</td>
				</tr>
		`;
    });
  } catch (error) {
    alert(error);
  }
}

async function getSelectedRawMaterials() {
  const rawMaterials = await rawMaterialApi.getRawMaterials();
  const selectedMaterials = [];
  rawMaterials.forEach((rawMaterial) => {
    const quantity = document.getElementById(`${rawMaterial.id}-quantity`).value;
    if (quantity > 0) {
      selectedMaterials.push({
        id: rawMaterial.id,
        quantidade: quantity,
      });
    }
  });
  return selectedMaterials;
}

async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const materiasPrimas = await getSelectedRawMaterials();
    const id = document.getElementById("production-id").value;
    const data = document.getElementById("production-date").value;
    const ciclos = document.getElementById("production-cicles").value;
    await api.updateProduction({ id, data, ciclos, materiasPrimas });
    alert("Produção atualizada com sucesso!");
    window.location.replace("index.html");
  } catch (error) {
    alert(error);
  }
}

async function fillForm(productionId) {
  try {
    const production = await api.getProductionById(productionId);
    document.getElementById("production-id").value = production.id;
    const date = production.data;
    const dateConverted = date.split("T")[0];
    document.getElementById("production-date").value = dateConverted;
    document.getElementById("production-cicles").value = production.ciclos;
  } catch {
    alert("ocorreu um erro");
  }
}
