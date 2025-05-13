const URL_BASE = "https://producao.pro/api/";

const api = {
  async register(user) {
    try {
      const response = await fetch(`${URL_BASE}/User/Registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (error) {
      alert(error);
    }
  }
};

export default api;