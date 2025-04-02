function showPassword() {
  var passwordField = document.getElementById("password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}



const API = "https://localhost:7133/Maquina"

async function getMachines() {
  try {
    const response = await fetch(API)
    return await response.json()
  }
  catch (error) {
    alert(error)
    alert('Erro ao buscar a API')
  }
}

const ui = {
  async renderMachines() {
    const tableMachines = document.getElementById("table-machines")
    try {
      const machines = await getMachines()
      machines.forEach(machine => {
        tableMachines.innerHTML += `
        <tr>
          <td>${machine.id}</td>
          <td>${machine.nome}</td>
          <td>${machine.marca} </td>
          <td>
            <button class="button-update">Editar</button>
            <button class="button-delete">Excluir</button>
          </td>
        `
      });
    } catch (error) {
      alert("Erro ao carregar dados")
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ui.renderMachines()
})