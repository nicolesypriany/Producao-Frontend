const URL_BASE = "https://localhost:7133";

const api = {
  async getProducts() {
    try {
      const response = await fetch(`${URL_BASE}/Produto`);
      return response.json();
    } catch (error) {
      alert(error);
    }
  },

  async getProductById(id) {
    try {
      const response = await fetch(`${URL_BASE}/Produto/${id}`);
      return await response.json();
    } catch {
      alert("Erro ao buscar produto");
    }
  },

  async createProduct(product) {
    try {
      const response = await fetch(`${URL_BASE}/Produto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      alert("Produto criado com sucesso!");
      window.location.replace("index.html");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async updateProduct(product) {
    try {
      const response = await fetch(`${URL_BASE}/Produto/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async handleDelete(event) {
    event.preventDefault();
    try {
      const id = document.getElementById("product-id").value;
      const product = await getProductById(id);
      await deleteProduct({ product });
      alert("Produto excluído com sucesso!");
    } catch (error) {
      alert(error);
    }
  },

  async deleteProduct(product) {
    try {
      const response = await fetch(`${URL_BASE}/Produto/${product.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      alert("Produto excluído com sucesso!");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },
};

export default api;
