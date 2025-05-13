import showAlert from "../alert.js";
import { showAlertError } from "../alert.js";

const URL_BASE = "https://producao.pro/api/";

const api = {
  async calculatePeriodCost(request) {
    try {
      const response = await fetch(
        `${URL_BASE}/Custo/CustoMedioPorProdutoEPeriodo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(request),
        }
      );
      if (response.status !== 200) {
        showAlertError("Erro ao calcular custo", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao calcular custo", error);
    }
  },

  async calculateMonthlyCost(request) {
    try {
      const response = await fetch(`${URL_BASE}/Custo/CustoTotalMensal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(request),
      });
      if (response.status !== 200) {
        showAlertError("Erro ao calcular custo", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao calcular custo", error);
    }
  },
};

export default api;
