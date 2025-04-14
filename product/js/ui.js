import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const products = await api.getProducts();
  await renderProducts(products);
  await renderButtons(products);
});

async function renderProducts(products) {
  const tableProducts = document.getElementById("table-products");
  try {
    products.forEach((product) => {
      tableProducts.innerHTML += `
				<tr>
					<td>${product.id}</td>
					<td>${product.nome}</td>
					<td>${product.medidas}</td>
					<td>${product.unidade}</td>
					<td>${product.pecasPorUnidade}</td>
					<td>
						<a href="update-product.html?id=${product.id}">
							<button class="button-update">Editar</button>
						</a>
						<button id="button-delete-${product.id}" class="button-delete">Excluir</button>
					</td>
					<dialog id="dialog-${product.id}">
						<p>Deseja realmente excluir o produto?</p>
						<button id="confirm-delete-${product.id}" class="confirm-delete">Sim</button>
						<button id="cancel-delete-${product.id}" class="cancel-delete">Cancelar</button>
					</dialog>
				</tr>
      `;
    });
  } catch (error) {
    alert("Erro ao carregar dados");
  }
}

async function renderButtons(products) {
  products.forEach((product) => {
    const deleteButton = document.getElementById(`button-delete-${product.id}`);
    const modal = document.getElementById(`dialog-${product.id}`);
    const confirmButton = document.getElementById(
      `confirm-delete-${product.id}`
    );
    const closeButton = document.getElementById(`cancel-delete-${product.id}`);

    deleteButton.addEventListener("click", () => {
      modal.showModal();
    });

    confirmButton.addEventListener("click", async () => {
      await api.deleteProduct(product);
      modal.close();
      window.location.reload();
    });

    closeButton.addEventListener("click", () => {
      modal.close();
    });
  });
}
