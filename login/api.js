const URL_BASE = "https://localhost:7133";

const api = {
  async login(user) {
    try {
      const response = await fetch(`${URL_BASE}/User/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      //window.location.replace("index.html");
      return await response.json();
    } catch (error) {
      alert(error);
    }
  }
};

export default api;