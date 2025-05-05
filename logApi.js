import showAlert from "./alert.js";
import { showAlertError } from "./alert.js";

const URL_BASE = "https://localhost:7133";

const apilog = {
  async getLogs(request) {
    try {
      const response = await fetch(`${URL_BASE}/Log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(request),
      });
      if (response.status !== 200) {
        showAlertError("Erro ao criar log", response.status);
      }
      return await response.json();
    } catch (error) {
      showAlert("Erro ao criar log", error);
    }
  }
}

export default apilog;