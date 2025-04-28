const URL_BASE = "https://localhost:7133";

const api = {
  async calculatePeriodCost(request) {
    try {
      const response = await fetch(`${URL_BASE}/Custo/CustoMedioPorProdutoEPeriodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      return await response.json();
    } catch (error) {
      alert(error);
    }
  },

  async calculateMonthlyCost(request) {
    try {
      const response = await fetch(`${URL_BASE}/Custo/CustoTotalMensal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      return await response.json();
    } catch (error) {
      alert(error);
    }
  }
}

export default api;