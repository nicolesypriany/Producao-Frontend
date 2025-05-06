import api from "./api.js";
import GetUserRole from "../../interface.js"
import { showAlertError } from "../../alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const molds = await api.getMolds();
  await renderMolds(molds);
  await renderButtons(molds);
});

async function renderMolds(molds) {
  const tableMolds = document.getElementById("table-molds");
    molds.forEach((mold) => {
      tableMolds.innerHTML += `
				<tr>
					<td>${mold.id}</td>
					<td>${mold.nome}</td>
					<td>${mold.produto.nome}</td>
					<td>${mold.pecasPorCiclo}</td>
					<td style="text-align: right">
						<button class="button-update" id="button-update-mold-${mold.id}">Editar</button>
						<button id="button-delete-${mold.id}" class="button-delete">Excluir</button>
					</td>
					<dialog id="dialog-${mold.id}">
						<p>Deseja realmente excluir a forma?</p>
						<button id="confirm-delete-${mold.id}" class="confirm-delete">Sim</button>
						<button id="cancel-delete-${mold.id}" class="cancel-delete">Cancelar</button>
					</dialog>
				</tr>
      `;
    });
}

async function renderButtons(molds) {
  const buttonAdd = document.getElementById("button-add");
    buttonAdd.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        window.location.href = "create-mold.html";
      } else {
        showAlertError("Ação não autorizada!");
      }
    });

  molds.forEach((mold) => {
    const deleteButton = document.getElementById(`button-delete-${mold.id}`);
    const modal = document.getElementById(`dialog-${mold.id}`);
    const confirmButton = document.getElementById(`confirm-delete-${mold.id}`);
    const closeButton = document.getElementById(`cancel-delete-${mold.id}`);
    const updateMold = document.getElementById(`button-update-mold-${mold.id}`)

    updateMold.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        window.location.href = `update-mold.html?id=${encodeURIComponent(mold.id)}`;
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
      await api.deleteMold(mold);
      modal.close();
      window.location.reload();
    });

    closeButton.addEventListener("click", () => {
      modal.close();
    });
  });
}
