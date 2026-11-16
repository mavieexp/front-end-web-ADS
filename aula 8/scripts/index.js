
function executar(evento) {
    evento.preventDefault();
    limparForm();
    validarForm();
}

function validarForm() {

    const nome = document.querySelector("#nome").value;
    const erroNome = document.querySelector("#erro-nome");

    if (nome.trim() === "") {
        erroNome.textContent = "Nome não pode estar vazio!";
        erroNome.classList.add("erro");
        erroNome.classList.remove("oculto");
    }

    const idade = document.querySelector("#idade").value;
    const erroIdade = document.querySelector("#erro-idade");

    if (idade === "") {
        erroIdade.textContent = "Idade não pode estar vazia!";
        erroIdade.classList.add("erro");
        erroIdade.classList.remove("oculto");
    } else if (Number(idade) < 18) {
        erroIdade.textContent = "Idade mínima de 18 anos!";
        erroIdade.classList.add("erro");
        erroIdade.classList.remove("oculto");
    }

    const email = document.querySelector("#email").value;
    const erroEmail = document.querySelector("#erro-email");

    if (email === "") {
        erroEmail.textContent = "E-mail não pode estar vazio!";
        erroEmail.classList.add("erro");
        erroEmail.classList.remove("oculto");
    } else if (!document.querySelector("#email").validity.valid) {
        erroEmail.textContent = "Digite um e-mail válido!";
        erroEmail.classList.add("erro");
        erroEmail.classList.remove("oculto");
    }

    const telefone = document.querySelector("#telefone").value;
    const erroTelefone = document.querySelector("#erro-telefone");

    if (telefone === "") {
        erroTelefone.textContent = "Telefone não pode estar vazio!";
        erroTelefone.classList.add("erro");
        erroTelefone.classList.remove("oculto");
    }

    const cpf = document.querySelector("#cpf").value;
    const erroCpf = document.querySelector("#erro-cpf");

    if (cpf === "") {
        erroCpf.textContent = "CPF não pode estar vazio!";
        erroCpf.classList.add("erro");
        erroCpf.classList.remove("oculto");
    } else if (cpf.length !== 14) {
        erroCpf.textContent = "Digite um CPF completo!";
        erroCpf.classList.add("erro");
        erroCpf.classList.remove("oculto");
    }

    const nascimento = document.querySelector("#nascimento").value;
    const erroNascimento = document.querySelector("#erro-nascimento");

    if (nascimento === "") {
        erroNascimento.textContent = "Data de nascimento obrigatória!";
        erroNascimento.classList.add("erro");
        erroNascimento.classList.remove("oculto");
    }

    const cidade = document.querySelector("#cidade").value;
    const erroCidade = document.querySelector("#erro-cidade");

    if (cidade.trim() === "") {
        erroCidade.textContent = "Cidade não pode estar vazia!";
        erroCidade.classList.add("erro");
        erroCidade.classList.remove("oculto");
    }

    const vaga = document.querySelector("#vaga").value;
    const erroVaga = document.querySelector("#erro-vaga");

    if (vaga === "") {
        erroVaga.textContent = "Selecione uma vaga!";
        erroVaga.classList.add("erro");
        erroVaga.classList.remove("oculto");
    }

    const experiencia = document.querySelector("#experiencia").value;
    const erroExperiencia = document.querySelector("#erro-experiencia");

    if (experiencia === "") {
        erroExperiencia.textContent = "Selecione uma opção!";
        erroExperiencia.classList.add("erro");
        erroExperiencia.classList.remove("oculto");
    }

    const escolaridade = document.querySelector("#escolaridade").value;
    const erroEscolaridade = document.querySelector("#erro-escolaridade");

    if (escolaridade === "") {
        erroEscolaridade.textContent = "Selecione sua escolaridade!";
        erroEscolaridade.classList.add("erro");
        erroEscolaridade.classList.remove("oculto");
    }

    const sobre = document.querySelector("#sobre").value;
    const erroSobre = document.querySelector("#erro-sobre");

    if (sobre.trim() === "") {
        erroSobre.textContent = "Preencha este campo!";
        erroSobre.classList.add("erro");
        erroSobre.classList.remove("oculto");
    }

    const termos = document.querySelector("#termos");
    const erroTermos = document.querySelector("#erro-termos");

    if (!termos.checked) {
        erroTermos.textContent = "É preciso aceitar os termos!";
        erroTermos.classList.add("erro");
        erroTermos.classList.remove("oculto");
    }

    const valido = document.querySelectorAll(".erro").length === 0;

    if (!valido) {
        const concluido = document.querySelector("#concluido");

        concluido.textContent = "Corrija os erros antes de prosseguir!";
        concluido.classList.remove("oculto");
        concluido.classList.add("erro");

    } else {
        enviarDados();
    }
}

// Limpa as mensagens anteriores
function limparForm() {

    document.querySelectorAll(".erro, .sucesso").forEach((item) => {
        item.classList.remove("erro");
        item.classList.remove("sucesso");
        item.classList.add("oculto");
    });

}

// Máscara do CPF
document.querySelector("#cpf").addEventListener("input", function() {

    let cpf = this.value.replace(/\D/g, "");

    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    this.value = cpf;

});

// Envia os dados para a API
async function enviarDados() {

    const dados = {
        nome: document.querySelector("#nome").value,
        idade: document.querySelector("#idade").value,
        email: document.querySelector("#email").value,
        telefone: document.querySelector("#telefone").value,
        cpf: document.querySelector("#cpf").value,
        nascimento: document.querySelector("#nascimento").value,
        cidade: document.querySelector("#cidade").value,
        vaga: document.querySelector("#vaga").value,
        experiencia: document.querySelector("#experiencia").value,
        escolaridade: document.querySelector("#escolaridade").value,
        sobre: document.querySelector("#sobre").value
    };

    try {

        const resposta = await fetch("https://postman-echo.com/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {

            const concluido = document.querySelector("#concluido");

            concluido.textContent = "Enviado com sucesso!";
            concluido.classList.remove("oculto");
            concluido.classList.add("sucesso");

        } else {
            alert("Não foi possível enviar o formulário!");
        }

    } catch (erro) {

        alert("Erro ao conectar com o servidor!");
        console.log(erro);

    }
}

