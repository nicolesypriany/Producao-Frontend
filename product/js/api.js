import showAlert from "../../alert.js";
import { showAlertError } from "../../alert.js";

const URL_BASE = "https://localhost:7133";

const api = {
  async getProducts() {
    try {
      const response = await fetch(`${URL_BASE}/Produto`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });
      if (response.status !== 200) {
        showAlertError("Erro ao buscar produtos", response.status);
      }
      return response.json();
    } catch (error) {
      showAlert("Erro ao buscar produtos", error);
    }
  },

  async getProductById(id) {
    try {
      const response = await fetch(`${URL_BASE}/Produto/${id}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });
      if (response.status !== 200) {
        showAlertError("Erro ao buscar produto", response.status);
      }
      return response.json();
    } catch (error) {
      showAlert("Erro ao buscar produto", error);
    }
  },

  async createProduct(product) {
    try {
      const response = await fetch(`${URL_BASE}/Produto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(product),
      });
      if (response.status !== 200) {
        showAlertError("Erro ao criar produto", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao criar produto", error);
    }
  },

  async updateProduct(product) {
    try {
      const response = await fetch(`${URL_BASE}/Produto/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(product),
      });
      if (response.status !== 200) {
        showAlertError("Erro ao atualizar produto", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao atualizar produto", error);
    }
  },

  async handleDelete(event) {
    event.preventDefault();
      const id = document.getElementById("product-id").value;
      const product = await getProductById(id);
      await deleteProduct({ product });
      alert("Produto excluído com sucesso!");
  },

  async deleteProduct(product) {
    try {
      const response = await fetch(`${URL_BASE}/Produto/${product.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(product),
      });
      if (response.status !== 200) {
        showAlertError("Erro ao excluir produto", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao excluir produto", error);
    }
  },
};

export default api;
