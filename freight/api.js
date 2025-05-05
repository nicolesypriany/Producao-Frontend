import showAlert from "../../alert.js";
import { showAlertError } from "../../alert.js";

const URL_BASE = "https://localhost:7133";

const api = {
  async calculateFreight(freight) {
    try {
      const response = await fetch(`${URL_BASE}/Frete/Calcular`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(freight),
      });
      if (response.status !== 200) {
        showAlertError("Erro ao calcular frete", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao calcular frete", error);
    }
  }
}

export default api;