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
    await api.calculateProduction()
  } catch (error) {
    alert(error);
  }
}
