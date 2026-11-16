function executar(evento) {
    evento.preventDefault();
    limparForm();
    validarForm();
  
}

function validarForm() {
    const nome = document.querySelector("#nome").value;
    const erroNome = document.querySelector("#erro-nome");
    if (nome === ""){
        erroNome.textContent = "Nome não pode estar vazio!";
        erroNome.classList.add("erro");
        erroNome.classList.remove("oculto");
    }

    const idade = document.querySelector("#idade").value;
    const erroIdade = document.querySelector("#erro-idade");
    if (idade === ""){
        erroIdade.textContent = "Idade não pode estar vazio!";
        erroIdade.classList.add("erro");
        erroIdade.classList.remove("oculto");
    } else if (Number(idade) < 18){
        erroIdade.textContent = "Idade mínima de 18 anos!";
        erroIdade.classList.add("erro");
        erroIdade.classList.remove("oculto");
    }

    const termos = document.querySelector("#termos");
    const erroTermos = document.querySelector("#erro-termos");
    if (!termos.checked) {
        erroTermos.textContent = "É preciso aceitar os termos!";
        erroTermos.classList.add("erro");
        erroTermos.classList.remove("oculto");
    }

    const concluido = document.querySelector("#concluido");
    const valido = document.querySelectorAll(".erro").length === 0;
    
  
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
        concluido.classList.add("sucesso");
        concluido.classList.remove("oculto");
    } else {
        alert("Erro ao enviar o formulário!");
    }

} catch (erro) {
    alert("Erro ao conectar com o servidor!");
    console.log(erro);
}
