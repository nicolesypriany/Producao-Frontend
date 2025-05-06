import api from "./api.js";
import apilog from "../../logApi.js";
import GetUserRole from "../../interface.js"
import { showAlertError } from "../../alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const machines = await api.getMachines();
  await renderMachines(machines);
  await renderButtons(machines);
});

async function renderMachines(machines) {
  const tableMachines = document.getElementById("table-machines");
  const dialogContainer = document.getElementById("dialogs-container");

    machines.forEach((machine) => {
      tableMachines.innerHTML += `
        <tr>
          <td class="td-name" id="td-${machine.id}">${machine.nome}</td>
          <td>${machine.marca}</td>
          <td style="text-align: right">
            <button class="button-update" id="button-update-machine-${machine.id}">Editar</button>
            <button id="button-delete-${machine.id}" class="button-delete">Excluir</button>
          </td>
        </tr>
      `;

      dialogContainer.insertAdjacentHTML("beforeend", `
        <dialog id="dialog-${machine.id}">
          <p>Deseja realmente excluir a máquina?</p>
          <button id="confirm-delete-${machine.id}" class="confirm-delete">Sim</button>
          <button id="cancel-delete-${machine.id}" class="cancel-delete">Cancelar</button>
        </dialog>
        <dialog id="dialog-details-${machine.id}">
          <div class="div-header-with-button">
            <h1>Registro de alterações</h1>
            <button id="close-details-dialog-${machine.id}" class="button-delete">Fechar</button>
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
            <tbody id="log-rows-${machine.id}"></tbody>
          </table>
        </dialog>
      `);
    });
}

async function renderButtons(machines) {
  const buttonAdd = document.getElementById("button-add");
  buttonAdd.addEventListener("click", () => {
    const userRole = GetUserRole();
    if(userRole == "Administrador" || userRole == "Gerente") {
      window.location.href = "create-machine.html";
    } else {
      showAlertError("Ação não autorizada!");
    }
  });

  machines.forEach((machine) => {
    const deleteButton = document.getElementById(`button-delete-${machine.id}`);
    const modal = document.getElementById(`dialog-${machine.id}`);
    const confirmButton = document.getElementById(`confirm-delete-${machine.id}`);
    const cancelButton = document.getElementById(`cancel-delete-${machine.id}`);
    const updateMachine = document.getElementById(`button-update-machine-${machine.id}`)

    updateMachine.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        window.location.href = `update-machine.html?id=${encodeURIComponent(machine.id)}`;
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
      await api.deleteMachine(machine);
      modal.close();
      window.location.reload();
    });

    cancelButton.addEventListener("click", () => modal.close());

    const td = document.getElementById(`td-${machine.id}`);
    const dialogDetails = document.getElementById(`dialog-details-${machine.id}`);
    const closeDetails = document.getElementById(`close-details-dialog-${machine.id}`);
    const tbodyLogs = document.getElementById(`log-rows-${machine.id}`);

    td.addEventListener("click", async () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
      const objeto = "Maquina";
      const objetoId = machine.id;
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