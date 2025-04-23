const URL_BASE = "https://localhost:7133";

const api = {
  async calculateFreight(freight) {
    try {
      const response = await fetch(`${URL_BASE}/Frete/Calcular`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(freight),
      });
      alert("Frete calculado com sucesso!");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  }
}

export default api;