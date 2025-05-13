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
  await renderRawMaterials(rawMaterials, production);
  fillForm(productionId);
  form.addEventListener("submit", handleFormSubmit);
});

async function renderMachines(machines, production) {
  const select = document.getElementById("production-machine");
  const machineSelected = production.maquina;
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
}

async function renderMolds(molds, production) {
  const select = document.getElementById("production-mold");
  const moldSelected = production.forma;
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
}

async function renderRawMaterials(rawMaterials, production) {
  const table = document.getElementById("raw-materials-table");
  const producaoMateriasPrimas = production.producaoMateriasPrimas;
  const materiasPrimasIds = producaoMateriasPrimas.map(
    (rawMaterial) => rawMaterial.materiaPrimaId
  );
  Array.from(rawMaterials).forEach((rawMaterial) => {
    if (materiasPrimasIds.includes(rawMaterial.id)) {
      const quantity = producaoMateriasPrimas.find(
        (materia) => materia.materiaPrimaId === rawMaterial.id
      ).quantidade;
      table.innerHTML += `
				<tr>
					<td>${rawMaterial.nome}</td>
					<td>
						<input class="raw-material-quantity" id="${rawMaterial.id}-quantity" type="number" step="any" name="rawMaterial-quantidade" value="${quantity}" />
					</td>
				</tr>
		`;
    } else {
      table.innerHTML += `
				<tr>
					<td>${rawMaterial.nome}</td>
					<td>
						<input class="raw-material-quantity" id="${rawMaterial.id}-quantity" type="number" step="any" name="rawMaterial-quantidade" />
					</td>
				</tr>
		`;
    }
  });
}

async function getSelectedRawMaterials() {
  const rawMaterials = await rawMaterialApi.getRawMaterials();
  const selectedMaterials = [];
  rawMaterials.forEach((rawMaterial) => {
    const quantity = document.getElementById(
      `${rawMaterial.id}-quantity`
    ).value;
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
  const materiasPrimas = await getSelectedRawMaterials();
  const id = document.getElementById("production-id").value;
  const data = document.getElementById("production-date").value;
  const maquinaId = document.getElementById("production-machine").value;
  const formaId = document.getElementById("production-mold").value;
  const ciclos = document.getElementById("production-cicles").value;
  await api.updateProduction({
    id,
    data,
    maquinaId,
    formaId,
    ciclos,
    materiasPrimas,
  });
}

async function fillForm(productionId) {
  const production = await api.getProductionById(productionId);
  document.getElementById("production-id").value = production.id;
  document.getElementById("production-date").value = production.data;
  document.getElementById("production-cicles").value = production.ciclos;
}
