import api from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const products = await api.getProducts();
  renderProducts(products);
});

function renderProducts(products) {
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
          await api.deleteProduct(product);
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
