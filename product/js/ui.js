import api from "./api.js";
import apilog from "../../logApi.js";
import GetUserRole from "../../interface.js"
import { showAlertError } from "../../alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const products = await api.getProducts();
  await renderProducts(products);
  await renderButtons(products);
});

async function renderProducts(products) {
  const tableProducts = document.getElementById("table-products");
  const dialogContainer = document.getElementById("dialogs-container");

    products.forEach((product) => {
      tableProducts.innerHTML += `
				<tr>
					<td class="td-name" id="td-${product.id}">${product.nome}</td>
					<td>${product.medidas}</td>
					<td>${product.unidade}</td>
					<td>${product.pecasPorUnidade}</td>
					<td style="text-align: right">
						<button class="button-update" id="button-update-product-${product.id}">Editar</button>
						<button id="button-delete-${product.id}" class="button-delete">Excluir</button>
					</td>
				</tr>
      `;
    
      dialogContainer.insertAdjacentHTML("beforeend", `
        <dialog id="dialog-${product.id}">
          <p>Deseja realmente excluir o produto?</p>
          <button id="confirm-delete-${product.id}" class="confirm-delete">Sim</button>
          <button id="cancel-delete-${product.id}" class="cancel-delete">Cancelar</button>
        </dialog>
        <dialog id="dialog-details-${product.id}">
          <div class="div-header-with-button">
            <h1>Registro de alterações</h1>
            <button id="close-details-dialog-${product.id}" class="button-delete">Fechar</button>
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
            <tbody id="log-rows-${product.id}"></tbody>
          </table>
        </dialog>
      `);
    });
}

async function renderButtons(products) {
  const buttonAdd = document.getElementById("button-add");
  buttonAdd.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        window.location.href = "create-product.html";
      } else {
        showAlertError("Ação não autorizada!");
      }
    });

  products.forEach((product) => {
    const deleteButton = document.getElementById(`button-delete-${product.id}`);
    const modal = document.getElementById(`dialog-${product.id}`);
    const confirmButton = document.getElementById(
      `confirm-delete-${product.id}`
    );
    const cancelButton = document.getElementById(`cancel-delete-${product.id}`);
    const updateProduct = document.getElementById(`button-update-product-${product.id}`)

    updateProduct.addEventListener("click", () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
        window.location.href = `update-product.html?id=${encodeURIComponent(product.id)}`;
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
      await api.deleteProduct(product);
      modal.close();
    });

    cancelButton.addEventListener("click", () => 
      modal.close());

    const td = document.getElementById(`td-${product.id}`);
    const dialogDetails = document.getElementById(`dialog-details-${product.id}`);
    const closeDetails = document.getElementById(`close-details-dialog-${product.id}`);
    const tbodyLogs = document.getElementById(`log-rows-${product.id}`);

    td.addEventListener("click", async () => {
      const userRole = GetUserRole();
      if(userRole == "Administrador" || userRole == "Gerente") {
      const objeto = "Produto";
      const objetoId = product.id;
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
