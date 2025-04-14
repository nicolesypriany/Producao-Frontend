import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const molds = await api.getMolds();
  await renderMolds(molds);
  await renderButtons(molds);
});

async function renderMolds(molds) {
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
						<button id="confirm-delete-${mold.id}" class="confirm-delete">Sim</button>
						<button id="cancel-delete-${mold.id}" class="cancel-delete">Cancelar</button>
					</dialog>
				</tr>
      `;
    });
  } catch (error) {
    alert("Erro ao carregar dados");
  }
}

async function renderButtons(molds) {
  molds.forEach((mold) => {
    const deleteButton = document.getElementById(`button-delete-${mold.id}`);
    const modal = document.getElementById(`dialog-${mold.id}`);
    const confirmButton = document.getElementById(`confirm-delete-${mold.id}`);
    const closeButton = document.getElementById(`cancel-delete-${mold.id}`);

    deleteButton.addEventListener("click", () => {
      modal.showModal();
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
