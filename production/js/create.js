import api from "./api.js";
import machinesApi from "../../machine/js/api.js";
import moldsApi from "../../mold/js/api.js";
import rawMaterialApi from "../../raw-material/js/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("create-production-form");
  const machines = await machinesApi.getMachines();
  const molds = await moldsApi.getMolds();
  const rawMaterials = await rawMaterialApi.getRawMaterials();
  await renderMachines(machines);
  await renderMolds(molds);
  await renderRawMaterials(rawMaterials);
  form.addEventListener("submit", handleFormSubmit);
});

async function renderMachines(machines) {
  const select = document.getElementById("production-machine");
  try {
    Array.from(machines).forEach((machine) => {
      select.innerHTML += `   
			<option value="${machine.id}">${machine.nome}</option>
		`;
    });
  } catch (error) {
    alert(error);
  }
}

async function renderMolds(molds) {
  const select = document.getElementById("production-mold");
  try {
    Array.from(molds).forEach((mold) => {
      select.innerHTML += `   
			<option value="${mold.id}">${mold.nome}</option>
		`;
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
					<td>
						<input type="checkbox" name="rawMaterialSelected"/>
						<input type="hidden" name="raw-material-id" value="${rawMaterial.id}" />
					</td>
					<td>${rawMaterial.nome}</td>
					<td>
						<input type="number" step="any" name="rawMaterial-quantidade" />
					</td>
				</tr>
		`;
    });
  } catch (error) {
    alert(error);
  }
}

async function getSelectedRawMaterials() {
  const selectedMaterials = [];
  const checkboxes = document.querySelectorAll(
    'input[name="rawMaterialSelected"]:checked'
  );

  checkboxes.forEach((checkbox) => {
    const row = checkbox.closest("tr");
    const id = row.querySelector('input[name="raw-material-id"]').value;
    const quantidade = row.querySelector(
      'input[name="rawMaterial-quantidade"]'
    ).value;

    selectedMaterials.push({
      id: id,
      quantidade: quantidade,
    });
  });

  return selectedMaterials;
}

async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const materiasPrimas = await getSelectedRawMaterials();
    const data = document.getElementById("production-date").value;
    const maquinaId = document.getElementById("production-machine").value;
    const formaId = document.getElementById("production-mold").value;
    const ciclos = document.getElementById("production-cicles").value;
    await api.createProduction({
      data,
      maquinaId,
      formaId,
      ciclos,
      materiasPrimas,
    });
  } catch (error) {
    alert(error);
  }
}
