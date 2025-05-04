export default async function showAlert(message, error, status) {
	if (!error && !status) {
		// const alertBox = document.createElement("div");
		// alertBox.id = "alertBoxSuccess";
		// const alertMessage = document.createElement("p");
		// alertMessage.textContent = message;
		// const closeButton = document.createElement("button");
		// closeButton.textContent = "Fechar";
		// closeButton.onclick = () => alertBox.remove();
		// alertBox.appendChild(alertMessage);
		// alertBox.appendChild(closeButton);
		// document.body.appendChild(alertBox);
	} 
	else if (status == 200) {
		
	}
	else {
			const alertBox = document.createElement("div");
			alertBox.id = "alertBoxError";
			const alertMessage = document.createElement("p");
			alertMessage.textContent = message;
		
			if (status === 404) {
				alertMessage.textContent += ": Nenhum dado encontrado!";
			}
			
			if (status === 401) {
				alertMessage.textContent += ": Acesso não autorizado!";
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