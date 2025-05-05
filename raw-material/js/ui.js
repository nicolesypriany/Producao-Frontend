import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const rawMaterials = await api.getRawMaterials();
  await renderRawMaterials(rawMaterials);
  await renderButtons(rawMaterials);
});

async function renderRawMaterials(rawMaterials) {
  const tableRawMaterials = document.getElementById("table-raw-materials");
    rawMaterials.forEach((rawMaterial) => {
      tableRawMaterials.innerHTML += `
				<tr>
					<td>${rawMaterial.id}</td>
					<td>${rawMaterial.nome}</td>
					<td>${rawMaterial.fornecedor}</td>
					<td>${rawMaterial.unidade}</td>
					<td>${rawMaterial.preco}</td>
					<td style="text-align: right">
						<a href="update-raw-material.html?id=${rawMaterial.id}">
							<button class="button-update">Editar</button>
						</a>
						<button id="button-delete-${rawMaterial.id}" class="button-delete">Excluir</button>
					</td>
					<dialog id="dialog-${rawMaterial.id}">
						<p>Deseja realmente excluir a matéria-prima?</p>
						<button id="confirm-delete-${rawMaterial.id}" class="confirm-delete">Sim</button>
						<button id="cancel-delete-${rawMaterial.id}" class="cancel-delete">Cancelar</button>
					</dialog>
				</tr>
      `;
    });
}

async function renderButtons(rawMaterials) {
  rawMaterials.forEach((rawMaterial) => {
    const deleteButton = document.getElementById(
      `button-delete-${rawMaterial.id}`
    );
    const modal = document.getElementById(`dialog-${rawMaterial.id}`);
    const confirmButton = document.getElementById(
      `confirm-delete-${rawMaterial.id}`
    );
    const closeButton = document.getElementById(
      `cancel-delete-${rawMaterial.id}`
    );

    deleteButton.addEventListener("click", () => {
      modal.showModal();
    });

    confirmButton.addEventListener("click", async () => {
      await api.deleteRawMaterial(rawMaterial);
      modal.close();
      window.location.reload();
    });

    closeButton.addEventListener("click", () => {
      modal.close();
    });
  });
}
