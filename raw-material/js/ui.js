import api from "./api.js";
import apilog from "../../logApi.js";
import GetUserRole from "../../interface.js"
import { showAlertError } from "../../alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const rawMaterials = await api.getRawMaterials();
  await renderRawMaterials(rawMaterials);
  await renderButtons(rawMaterials);
});

async function renderRawMaterials(rawMaterials) {
  const tableRawMaterials = document.getElementById("table-raw-materials");
  const dialogContainer = document.getElementById("dialogs-container");

    rawMaterials.forEach((rawMaterial) => {
      tableRawMaterials.innerHTML += `
				<tr>
					<td class="td-name" id="td-${rawMaterial.id}">${rawMaterial.nome}</td>
					<td>${rawMaterial.fornecedor}</td>
					<td>${rawMaterial.unidade}</td>
					<td>${rawMaterial.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
					<td style="text-align: right">
						<button class="button-update" id="button-update-rawMaterial-${rawMaterial.id}">Editar</button>
						</a>
						<button id="button-delete-${rawMaterial.id}" class="button-delete">Excluir</button>
					</td>
				</tr>
      `;

      dialogContainer.insertAdjacentHTML("beforeend", `
        <dialog id="dialog-${rawMaterial.id}">
						<p>Deseja realmente excluir a matéria-prima?</p>
						<button id="confirm-delete-${rawMaterial.id}" class="confirm-delete">Sim</button>
						<button id="cancel-delete-${rawMaterial.id}" class="cancel-delete">Cancelar</button>
					</dialog>
        <dialog id="dialog-details-${rawMaterial.id}">
          <div class="div-header-with-button">
            <h1>Registro de alterações</h1>
            <button id="close-details-dialog-${rawMaterial.id}" class="button-delete">Fechar</button>
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
            <tbody id="log-rows-${rawMaterial.id}"></tbody>
          </table>
        </dialog>
      `);
    });
}

async function renderButtons(rawMaterials) {
  const buttonAdd = document.getElementById("button-add");
      buttonAdd.addEventListener("click", () => {
        const userRole = GetUserRole();
        if(userRole == "Administrador" || userRole == "Gerente") {
          window.location.href = "create-mold.html";
        } else {
          showAlertError("Ação não autorizada!");
        }
      });

  rawMaterials.forEach((rawMaterial) => {
    const deleteButton = document.getElementById(
      `button-delete-${rawMaterial.id}`
    );
    const modal = document.getElementById(`dialog-${rawMaterial.id}`);
    const confirmButton = document.getElementById(
      `confirm-delete-${rawMaterial.id}`
    );
    const cancelButton = document.getElementById(
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
    });

    cancelButton.addEventListener("click", () => modal.close());

    const td = document.getElementById(`td-${rawMaterial.id}`);
    const dialogDetails = document.getElementById(`dialog-details-${rawMaterial.id}`);
    const closeDetails = document.getElementById(`close-details-dialog-${rawMaterial.id}`);
    const tbodyLogs = document.getElementById(`log-rows-${rawMaterial.id}`);

    td.addEventListener("click", async () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
      const objeto = "MateriaPrima";
      const objetoId = rawMaterial.id;
      const logs = await apilog.getLogs({ objeto, objetoId });
      tbodyLogs.innerHTML = "";

      Array.from(logs).forEach(log => {
        if (log.acao == "Criar" || log.acao == "Inativar") {
          tbodyLogs.innerHTML += `
          <tr>
            <td>${log.acao}</td>
            <td>${new Date(log.data).toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'})}</td>
            <td></td>
            <td></td>
            <td>${log.usuario}</td>
          </tr>
        `;
        } else {
        tbodyLogs.innerHTML += `
          <tr>
            <td>${log.acao}</td>
            <td>${new Date(log.data).toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'})}</td>
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
