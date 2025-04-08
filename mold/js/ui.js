import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const molds = await api.getMolds();
  renderMolds(molds);
});

function renderMolds(molds) {
  const tableMolds = document.getElementById("table-molds");
  try {
    molds.forEach((mold) => {
			tableMolds.innerHTML += `
				<tr>
					<td>${mold.id}</td>
					<td>${mold.nome}</td>
					<td>${mold.produto.nome}</td>
					<td>${mold.pecasPorCiclo}</td>
					<td>${mold.maquinas}</td>
					<td>
						<a href="update-mold.html?id=${mold.id}">
							<button class="button-update">Editar</button>
						</a>
						<button id="button-delete-${mold.id}" class="button-delete">Excluir</button>
					</td>
					<dialog id="dialog-${mold.id}">
						<p>Deseja realmente excluir a forma?</p>
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
          await api.deleteMold(mold);
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
