import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const productions = await api.getProductions();
  if (productions == "[object Object]") {
    alert("Nenhuma produção encontrada");
  } else {
    renderProductions(productions);
  }
});

function renderProductions(productions) {
  const tableProductions = document.getElementById("table-productions");
  try {
    productions.forEach((production) => {
      const rawMaterials = production.producaoMateriasPrimas
        .map((item) => {
          return `
          <div class="raw-material">
            <strong>${item.nomeMateriaPrima}</strong>: ${item.quantidade}
          </div>
        `;
        })
        .join("");

      tableProductions.innerHTML += `
        <tr>
          <td>${production.id}</td>
          <td>${new Date(production.data).toLocaleDateString()}</td>
          <td>${production.maquinaId}</td>
          <td>${production.formaId}</td>
          <td>${production.ciclos}</td>
          <td>
            <button class="button-show-details" data-production-id="${
              production.id
            }">
              Ver Detalhes
            </button>
					</td>
					<td>${production.quantidadeProduzida}</td>
					<td>${production.custoUnitario}</td>
					<td>${production.custoTotal}</td>
					<td>
            <a href="update-production.html?id=${production.id}">
            <button class="button-update">Editar</button>
            </a>
            <dialog id="raw-materials-${
              production.id
            }" class="raw-materials-dialog">
							<h1>Matérias Primas</h1>
              ${rawMaterials}
            </dialog>
            <button id="button-delete-${
              production.id
            }" class="button-delete">Excluir</button>
          </td>
          <dialog id="dialog-${production.id}">
            <p>Deseja realmente excluir a produção?</p>
            <button class="confirm-delete">Sim</button>
            <button class="cancel-delete">Cancelar</button>
          </dialog>
        </tr>
      `;

      const deleteButtons = document.querySelectorAll(".button-show-details");
      const modal = document.getElementById(`raw-materials-${production.id}`);

      deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
          console.log("click");
          modal.showModal();
        });
      });
    });
  } catch (error) {
    alert("Erro ao carregar dados da produção");
  }
}
