import api from "./api.js";
import GetUserRole from "../../interface.js"
import { showAlertError } from "../../alert.js";

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
						<button class="button-update" id="button-update-rawMaterial-${rawMaterial.id}">Editar</button>
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
     const updateRawMaterial = document.getElementById(`button-update-rawMaterial-${rawMaterial.id}`)
    
        updateRawMaterial.addEventListener("click", () => {
          const userRole = GetUserRole();
          if(userRole == "Administrador" || userRole == "Gerente") {
            window.location.href = `update-raw-material.html?id=${encodeURIComponent(rawMaterial.id)}`;
          } else {
            showAlertError("Ação não autorizada!");
          }
        });
    

    deleteButton.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        modal.showModal();
      } else {
        showAlertError("Ação não autorizada!");
      }
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
