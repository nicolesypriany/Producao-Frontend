const URL_BASE = "https://localhost:7133";

document.addEventListener("DOMContentLoaded", async () => {
  const machines = await getMachines();
  renderMachines(machines);

  // const form = document.getElementById("create-machine-form")
  // form.addEventListener("submit", handleFormSubmit)
});

async function getMachines() {
  try {
    const response = await fetch(`${URL_BASE}/Maquina`);
    return response.json();
  } catch (error) {
    alert(error);
    alert("Erro ao buscar a API");
  }
}

async function getMachineById(id) {
  try {
    const response = await fetch(`${URL_BASE}/Maquina/${id}`);
    return await response.json();
  } catch {
    alert("Erro ao buscar máquina");
  }
}

async function createMachine(machine) {
  try {
    const response = await fetch(`${URL_BASE}/Maquina`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(machine),
    });
    return await response.json();
  } catch (error) {
    alert(error);
    alert("Erro ao buscar a API");
  }
}

async function updateMachine(machine) {
  try {
    const response = await fetch(`${URL_BASE}/Maquina/${machine.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(machine),
    });
    return await response.json();
  } catch (error) {
    alert(error);
    alert("Erro ao buscar a API");
  }
}

async function deleteMachine(machine) {
  try {
    const response = await fetch(`${URL_BASE}/Maquina/${machine.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(machine),
    });
    return await response.json();
  } catch (error) {
    alert(error);
    alert("Erro ao buscar a API");
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const nome = document.getElementById("machine-name").value;
    const marca = document.getElementById("machine-brand").value;
    await createMachine({ nome, marca });
  } catch (error) {
    alert(error);
  }
}

function renderMachines(machines) {
  const tableMachines = document.getElementById("table-machines");
  try {
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

  const deleteButtons = document.querySelectorAll(".button-delete");
  console.log(deleteButtons[0]);
  const modal = document.querySelector("dialog");
  // const closeButtons = document.querySelectorAll(".cancel-delete")

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.showModal();
    });
  });
}
