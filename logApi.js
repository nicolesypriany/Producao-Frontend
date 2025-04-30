const URL_BASE = "https://localhost:7133";

const apilog = {
  async getLogs(request) {
    try {
      const response = await fetch(`${URL_BASE}/Log`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      });
      return response.json();
    } catch (error) {
      alert(error);
    }
  }
}

export default apilog;