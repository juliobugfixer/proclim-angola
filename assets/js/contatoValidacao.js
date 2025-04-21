/*=======================================VALIDAÇÕES CONTATO====================================================*/
document.getElementById("contatoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let valid = true;

    function showError(id, message) {
        document.getElementById(id).textContent = message;
    }

    const nomeCompleto = document.getElementById("NomeCompleto").value.trim();
    const email = document.getElementById("Email").value.trim();
    const assunto = document.getElementById("Assunto").value.trim();

    if (nomeCompleto === "") {
        showError("errorNomeCompleto", "O nome é obrigatório.");
        valid = false;
    } else {
        showError("errorNomeCompleto", "");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === "" || !emailRegex.test(email)) {
      showError("errorEmail", "E-mail válido é obrigatório.");
      valid = false;
    } else {
      showError("errorEmail", "");
    }

    const inputTelefone = document.getElementById("Telefone");
    const numeroUsuario = inputTelefone.value.trim();
    const telefoneCompleto = "+244" + numeroUsuario;
    
    const telefoneRegex = /^\+2449\d{8}$/;
    
    if (numeroUsuario === "" || !telefoneRegex.test(telefoneCompleto)) {
        showError("errorTelefone", "Digite o contacto de forma correta.");
        valid = false;
    } else {
        showError("errorTelefone", "");
    }
    
    if (assunto === "") {
        showError("errorAssunto", "O campo de assunto não pode estar vazio.");
        valid = false;
    } else {
        showError("errorAssunto", "");
    }

    if (valid) {
        showLoading(true);

        const formData = new FormData(this);

        fetch("../contato.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                showLoading(false);
                showDialog("fas fa-check-circle", "Mensagem enviada com sucesso!", false);
                document.getElementById("contatoForm").reset();
            })
            .catch(error => {
                showLoading(false);
                console.error("Erro:", error);
                showDialog("fas fa-times-circle", "Erro ao enviar mensagem. Tente novamente.", true);
            });
    }
});

function showDialog(iconClass, message, isError) {
    const dialogBox = document.getElementById("dialogBox");
    const dialogIcon = document.getElementById("dialogIcon");
    const dialogText = document.getElementById("dialogText");

    dialogBox.classList.toggle("error", isError);
    dialogIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;
    dialogText.textContent = message;
    dialogBox.style.display = "flex";
}

document.getElementById("dialogCloseBtn").addEventListener("click", function () {
    document.getElementById("dialogBox").style.display = "none";
});

function showLoading(show) {
    const loading = document.getElementById("loadingOverlay");
    loading.style.display = show ? "flex" : "none";
}
