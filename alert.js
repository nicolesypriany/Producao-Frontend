export default async function showAlert(message, error, status) {
	if (!error && !status) {

	} 
	else if (status === 200) {
	}
	else {
			const alertBox = document.createElement("div");
			alertBox.id = "alertBoxError";
			const alertMessage = document.createElement("p");
			alertMessage.textContent = message;
		
			if (status === 400) {
				alertMessage.textContent += ": Dados inválidos!";
			}

			if (status === 401) {
				alertMessage.textContent += ": Acesso não autorizado!";
			}

			if (status === 404) {
				alertMessage.textContent += ": Nenhum dado encontrado!";
			}
			
			if(error) {
				if (error.message === "Failed to fetch") {
					alertMessage.textContent += ": Sem conexão com o servidor!";
				}
			}

			const closeButton = document.createElement("button");
			closeButton.textContent = "Fechar";
			closeButton.onclick = () => alertBox.remove();
			alertBox.appendChild(alertMessage);
			alertBox.appendChild(closeButton);
			document.body.appendChild(alertBox);
	}
}

function showAlertError(message, status) {
	if (status === "Failed to fetch") {
		alertMessage.textContent += ": Sem conexão com o servidor!";
	}
	
	if (status !== 200) {
		const alertBox = document.createElement("div");
		alertBox.id = "alertBoxError";
		const alertMessage = document.createElement("p");
		alertMessage.textContent = message;
		if (status === 400) {
			alertMessage.textContent += ": Dados inválidos!";
		}
		if (status === 401) {
			alertMessage.textContent += ": Acesso não autorizado!";
		}
		if (status === 403) {
			alertMessage.textContent += ": Acesso não autorizado!";
		}
		if (status === 404) {
			alertMessage.textContent += ": Nenhum dado encontrado!";
		}
		const closeButton = document.createElement("button");
		closeButton.textContent = "Fechar";
		closeButton.onclick = () => alertBox.remove();
		alertBox.appendChild(alertMessage);
		alertBox.appendChild(closeButton);
		document.body.appendChild(alertBox);
	}
}

function showAlertSuccess(message) {
	const alertBox = document.createElement("div");
	alertBox.id = "alertBoxSuccess";
	const alertMessage = document.createElement("p");
	alertMessage.textContent = message;
	const closeButton = document.createElement("button");
	closeButton.textContent = "Fechar";
	closeButton.onclick = () => alertBox.remove();
	alertBox.appendChild(alertMessage);
	alertBox.appendChild(closeButton);
	document.body.appendChild(alertBox);
	
}

export { showAlertError, showAlertSuccess };