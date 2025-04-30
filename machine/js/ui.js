import api from "./api.js";
import apilog from "../../logApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  const machines = await api.getMachines();
  await renderMachines(machines);
  await renderButtons(machines);
});

async function renderMachines(machines) {
  const tableMachines = document.getElementById("table-machines");
  const dialogContainer = document.getElementById("dialogs-container");

  try {
    machines.forEach((machine) => {
      tableMachines.innerHTML += `
        <tr id="tr-${machine.id}">
          <td>${machine.id}</td>
          <td>${machine.nome}</td>
          <td>${machine.marca}</td>
          <td style="text-align: right">
            <a href="update-machine.html?id=${machine.id}">
              <button class="button-update">Editar</button>
            </a>
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
  } catch (error) {
    alert("Erro ao carregar dados");
  }
}

async function renderButtons(machines) {
  machines.forEach((machine) => {
    const deleteButton = document.getElementById(`button-delete-${machine.id}`);
    const modal = document.getElementById(`dialog-${machine.id}`);
    const confirmButton = document.getElementById(`confirm-delete-${machine.id}`);
    const cancelButton = document.getElementById(`cancel-delete-${machine.id}`);

    deleteButton.addEventListener("click", () => modal.showModal());

    confirmButton.addEventListener("click", async () => {
      await api.deleteMachine(machine);
      modal.close();
      window.location.reload();
    });

    cancelButton.addEventListener("click", () => modal.close());

    const tr = document.getElementById(`tr-${machine.id}`);
    const dialogDetails = document.getElementById(`dialog-details-${machine.id}`);
    const closeDetails = document.getElementById(`close-details-dialog-${machine.id}`);
    const tbodyLogs = document.getElementById(`log-rows-${machine.id}`);

    tr.addEventListener("click", async () => {
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

    });

    closeDetails.addEventListener("click", () => dialogDetails.close());
  });
}