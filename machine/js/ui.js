import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const machines = await api.getMachines();
  renderMachines(machines);
});

function renderMachines(machines) {
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
					<button class="button-delete">Excluir</button>
				</td>
				<dialog>
					<p>Deseja realmente excluir a máquina?</p>
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
          await api.deleteMachine(machine);
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
