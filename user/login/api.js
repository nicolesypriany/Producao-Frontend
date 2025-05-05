const URL_BASE = "https://localhost:7133";

const api = {
  async login(user) {
  const response = await fetch(`${URL_BASE}/User/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json();
  }
};

export default api;