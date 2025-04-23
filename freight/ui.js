import api from "./api.js";
import productsApi from "../../product/js/api.js"

document.addEventListener("DOMContentLoaded", async () => {
  const map = L.map("map").setView([-23.55052, -46.633308], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);
  
  const mapa = document.getElementById("map");
  mapa.style.display = "none";
  const form = document.getElementById("freight-form");
	const products = await productsApi.getProducts();
	await renderProducts(products)
  form.addEventListener("submit", async (event) => {
    const response = await handleFormSubmit(event);
    fillMap(response, map);
  });
});

async function renderProducts(products) {
  const select = document.getElementById("product");
	try {
    Array.from(products).forEach((product => {
      select.innerHTML += `   
			<option value="${product.id}">${product.nome}</option>
      `;
		}));
	}
	catch (error) {
    alert(error)
	}
}

async function handleFormSubmit(event) {
  event.preventDefault();
	try {
    const enderecoOrigem = document.getElementById("origin-address").value;
		const enderecoDestino = document.getElementById("destination-address").value;
		const precoDiesel = document.getElementById("fuel-price").value;
    const kmPorLitro = document.getElementById("kilometers-per-liter").value;
		const produtoId = document.getElementById("product").value;
    const quantidadeProduto = document.getElementById("product-quantity").value;
    const quantidadePorPalete = document.getElementById("quantity-per-pallet").value;
    const paletesPorCarga = document.getElementById("pallets-per-load").value;

		var response = await api.calculateFreight({ enderecoOrigem, enderecoDestino, precoDiesel, kmPorLitro, produtoId, quantidadeProduto, quantidadePorPalete, paletesPorCarga });

    return response;
	} 
	catch (error) {
    alert(error);
	}
}

function fillMap(response, map) {
  try {
    const mapa = document.getElementById("map");
    mapa.style.display = "block";
    const geoJson = JSON.parse(response.geoJson);  
    const routeLayer = L.geoJSON(geoJson, {
      style: {
        color: "blue",
        weight: 5,
      },
    }).addTo(map);

    setTimeout(() => {
      map.fitBounds(routeLayer.getBounds());
      map.invalidateSize();
    }, 200);

  } catch (error) {
    alert("Erro ao carregar o mapa: " + error.message);
  }

  const form = document.getElementById("freight-form");
  form.style.display = "none";

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Distância</th>
        <th>Número de Viagens</th>
        <th>Preço do Diesel</th>
        <th>Preço Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${response.distanciaEmQuilometros.toFixed(2)} KM</td>
        <td>${response.numeroDeViagens}</td>
        <td>${response.precoLitro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td>${response.precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      </tr>
    </tbody>
  `;
  document.querySelector("main").appendChild(table);
}
