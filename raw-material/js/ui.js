import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const rawMaterials = await api.getRawMaterials();
  renderRawMaterials(rawMaterials);
});

function renderRawMaterials(rawMaterials) {
  const tableRawMaterials = document.getElementById("table-raw-materials");
  try {
    rawMaterials.forEach((rawMaterial) => {
			tableRawMaterials.innerHTML += `
				<tr>
					<td>${rawMaterial.id}</td>
					<td>${rawMaterial.nome}</td>
					<td>${rawMaterial.fornecedor}</td>
					<td>${rawMaterial.unidade}</td>
					<td>${rawMaterial.preco}</td>
					<td>
						<a href="update-raw-material.html?id=${rawMaterial.id}">
							<button class="button-update">Editar</button>
						</a>
						<button id="button-delete-${rawMaterial.id}" class="button-delete">Excluir</button>
					</td>
					<dialog id="dialog-${rawMaterial.id}">
						<p>Deseja realmente excluir a matéria-prima?</p>
						<button class="confirm-delete">Sim</button>
						<button class="cancel-delete">Cancelar</button>
					</dialog>
				</tr>
      `; 

      const deleteButtons = document.querySelectorAll(".button-delete");
      const modal = document.querySelector("dialog");
      const confirmButtons = document.querySelectorAll(".confirm-delete");
      const closeButtons = document.querySelectorAll(".cancel-delete");

      deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
          modal.showModal();
        });
      });

      confirmButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          await api.deleteRawMaterial(rawMaterial);
          modal.close();
          window.location.reload();
        });
      });

      closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          modal.close();
        });
      });
    });
  } catch (error) {
    alert("Erro ao carregar dados");
  }
}
