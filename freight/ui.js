const map = L.map("map").setView([-23.55052, -46.633308], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let routeLayer;

function calcularRota() {
  const origemInput = document.getElementById("origin").value;
  const destinoInput = document.getElementById("destination").value;

  const origem = origemInput.split(",").map(Number);
  const destino = destinoInput.split(",").map(Number);

  if (origem.length !== 2 || destino.length !== 2) {
    alert("Insira coordenadas válidas.");
    return;
  }

  if (routeLayer) {
    map.removeLayer(routeLayer);
  }

  const url = `https://router.project-osrm.org/route/v1/driving/${origem[1]},${origem[0]};${destino[1]},${destino[0]}?overview=full&geometries=geojson`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const geometry = route.geometry;
        const distanceKm = (route.distance / 1000).toFixed(2); // distância em km

        // Exibir rota
        routeLayer = L.geoJSON(geometry, {
          style: {
            color: "blue",
            weight: 5,
          },
        }).addTo(map);

        map.fitBounds(routeLayer.getBounds());

        // Exibir distância
        document.getElementById(
          "distancia"
        ).textContent = `Distância: ${distanceKm} km`;
      } else {
        alert("Não foi possível calcular a rota.");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Erro ao calcular a rota.");
    });
}
