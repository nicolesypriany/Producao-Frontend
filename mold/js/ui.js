import api from "./api.js";
import apilog from "../../logApi.js";
import GetUserRole from "../../interface.js";
import { showAlertError } from "../../alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const molds = await api.getMolds();
  await renderMolds(molds);
  await renderButtons(molds);
});

async function renderMolds(molds) {
  const tableMolds = document.getElementById("table-molds");
  const dialogContainer = document.getElementById("dialogs-container");

  molds.forEach((mold) => {
    tableMolds.innerHTML += `
				<tr>
					<td class="td-name" id="td-${mold.id}">${mold.nome}</td>
					<td>${mold.produto.nome}</td>
					<td>${mold.pecasPorCiclo}</td>
					<td style="text-align: right">
						<button class="button-update" id="button-update-mold-${mold.id}">Editar</button>
						<button id="button-delete-${mold.id}" class="button-delete">Excluir</button>
					</td>
				</tr>
      `;

    dialogContainer.insertAdjacentHTML(
      "beforeend",
      `
        <dialog id="dialog-${mold.id}">
						<p>Deseja realmente excluir a forma?</p>
						<button id="confirm-delete-${mold.id}" class="confirm-delete">Sim</button>
						<button id="cancel-delete-${mold.id}" class="cancel-delete">Cancelar</button>
					</dialog>
        <dialog id="dialog-details-${mold.id}">
          <div class="div-header-with-button">
            <h1>Registro de alterações</h1>
            <button id="close-details-dialog-${mold.id}" class="button-delete">Fechar</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Ação</th>
                <th>Data</th>
                <th>Dado alterado</th>
                <th>Conteudo</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody id="log-rows-${mold.id}"></tbody>
          </table>
        </dialog>
      `
    );
  });
}

async function renderButtons(molds) {
  const buttonAdd = document.getElementById("button-add");
  buttonAdd.addEventListener("click", () => {
    const userRole = GetUserRole();
    if (userRole == "Administrador" || userRole == "Gerente") {
      window.location.href = "create-mold.html";
    } else {
      showAlertError("Ação não autorizada!");
    }
  });

  molds.forEach((mold) => {
    const deleteButton = document.getElementById(`button-delete-${mold.id}`);
    const modal = document.getElementById(`dialog-${mold.id}`);
    const confirmButton = document.getElementById(`confirm-delete-${mold.id}`);
    const cancelButton = document.getElementById(`cancel-delete-${mold.id}`);
    const updateMold = document.getElementById(`button-update-mold-${mold.id}`);

    updateMold.addEventListener("click", () => {
      const userRole = GetUserRole();
      if (userRole == "Administrador" || userRole == "Gerente") {
        window.location.href = `update-mold.html?id=${encodeURIComponent(
          mold.id
        )}`;
      } else {
        showAlertError("Ação não autorizada!");
      }
    });

    deleteButton.addEventListener("click", () => {
      const userRole = GetUserRole();
      if (userRole == "Administrador" || userRole == "Gerente") {
        modal.showModal();
      } else {
        showAlertError("Ação não autorizada!");
      }
    });

    confirmButton.addEventListener("click", async () => {
      await api.deleteMold(mold);
      modal.close();
    });

    cancelButton.addEventListener("click", () => modal.close());

    const td = document.getElementById(`td-${mold.id}`);
    const dialogDetails = document.getElementById(`dialog-details-${mold.id}`);
    const closeDetails = document.getElementById(
      `close-details-dialog-${mold.id}`
    );
    const tbodyLogs = document.getElementById(`log-rows-${mold.id}`);

    td.addEventListener("click", async () => {
      const userRole = GetUserRole();
      if (userRole == "Administrador" || userRole == "Gerente") {
        const objeto = "Forma";
        const objetoId = mold.id;
        const logs = await apilog.getLogs({ objeto, objetoId });
        tbodyLogs.innerHTML = "";

        Array.from(logs).forEach((log) => {
          if (log.acao == "Criar" || log.acao == "Inativar") {
            tbodyLogs.innerHTML += `
          <tr>
            <td>${log.acao}</td>
            <td>${new Date(log.data).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            })}</td>
            <td></td>
            <td></td>
            <td>${log.usuario}</td>
          </tr>
        `;
          } else {
            tbodyLogs.innerHTML += `
          <tr>
            <td>${log.acao}</td>
            <td>${new Date(log.data).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            })}</td>
            <td>${log.dadoAlterado}</td>
            <td>${log.conteudo}</td>
            <td>${log.usuario}</td>
          </tr>
        `;
          }
        });

        dialogDetails.showModal();
      } else {
        showAlertError("Ação não autorizada!");
      }
    });

    closeDetails.addEventListener("click", () => dialogDetails.close());
  });
}
