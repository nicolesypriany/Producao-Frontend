import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const machines = await api.getMachines();
  await renderMachines(machines);
  await renderButtons(machines);
});

async function renderMachines(machines) {
  const tableMachines = document.getElementById("table-machines");
  try {
    machines.forEach((machine) => {
      tableMachines.innerHTML += `
			<tr>
				<td>${machine.id}</td>
				<td>${machine.nome}</td>
				<td>${machine.marca} </td>
				<td>
					<a href="update-machine.html?id=${machine.id}">
						<button class="button-update">Editar</button>
					</a>
					<button id="button-delete-${machine.id}" class="button-delete">Excluir</button>
				</td>
				<dialog id="dialog-${machine.id}">
					<p>Deseja realmente excluir a máquina?</p>
					<button id="confirm-delete-${machine.id}" class="confirm-delete">Sim</button>
					<button id="cancel-delete-${machine.id}" class="cancel-delete">Cancelar</button>
				</dialog>
			</tr>
			`;
    });
  } catch (error) {
    alert("Erro ao carregar dados");
  }
}

async function renderButtons(machines) {
  machines.forEach((machine) => {
    const deleteButton = document.getElementById(`button-delete-${machine.id}`);
    const modal = document.getElementById(`dialog-${machine.id}`);
    const confirmButton = document.getElementById(
      `confirm-delete-${machine.id}`
    );
    const closeButton = document.getElementById(`cancel-delete-${machine.id}`);

    deleteButton.addEventListener("click", () => {
      modal.showModal();
    });

    confirmButton.addEventListener("click", async () => {
      await api.deleteMachine(machine);
      modal.close();
      window.location.reload();
    });

    closeButton.addEventListener("click", () => {
      modal.close();
    });
  });
}
