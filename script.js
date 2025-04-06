function showPassword() {
  var passwordField = document.getElementById("password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}

const URL_BASE = "https://localhost:7133";
async function getMachines() {
  try {
    const response = await fetch(`${URL_BASE}/Maquina`);
    return await response.json();
  } catch (error) {
    alert(error);
    alert("Erro ao buscar a API");
  }
}

async function renderMachines() {
  const tableMachines = document.getElementById("table-machines");
  try {
    const machines = await getMachines();
    machines.forEach((machine) => {
      tableMachines.innerHTML += `
			<tr>
				<td>${machine.id}</td>
				<td>${machine.nome}</td>
				<td>${machine.marca} </td>
				<td>
					<a href="update-machine.html?id=${machine.id}">
						<button class="button-update">Editar</button>
					</a>
					<button class="button-delete">Excluir</button>
				</td>
				<dialog>
					<p>Deseja realmente excluir a máquina ${machine.nome}?</p>
					<button class="cancel-delete">Cancelar</button>
					<button id="confirm-delete">Sim</button>
				</dialog>
			</tr>
			`;
    });
  } catch (error) {
    alert("Erro ao carregar dados");
  }
}

renderMachines();

// closeButtons.forEach(button => {
//   button.addEventListener("click", () => {
//     modal.close()
//   })
// })
