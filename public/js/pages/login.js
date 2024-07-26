$(document).ready(function () {

    $('#NewPassword').on('input', function () {
        var password = $(this).val();
        var strength = 0;
        var tips = "";

        if (password.length < 8) {
            tips += "";
        } else {
            strength += 1;
        }

        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
            strength += 1;
        } else {
            tips += "Use Letras Maiusculas e Minusculas. ";
        }

        if (password.match(/\d/)) {
            strength += 1;
        } else {
            tips += "Inclua letras e numeros. ";
        }

        if (password.match(/[^a-zA-Z\d]/)) {
            strength += 1;
        } else {
            tips += "Inclua um caractere especial. ";
        }

        var passwordStrengthElement = $('#verificaSenha');
        passwordStrengthElement.attr('class', '');

        if (password == "") {
            passwordStrengthElement.addClass('none');
        }

        if (strength < 2) {
            passwordStrengthElement.text("Senha Fraca: " + tips);
            passwordStrengthElement.addClass('alert-danger');
        } else if (strength === 2) {
            passwordStrengthElement.text("Senha com força Media: " + tips);
            passwordStrengthElement.addClass('alert alert-primary');
        } else if (strength === 3) {
            passwordStrengthElement.text("Senha com força Média: " + tips);
            passwordStrengthElement.addClass('alert alert-info');
        } else {
            passwordStrengthElement.text("Sua Senha está Forte");
            passwordStrengthElement.addClass('alert alert-success');
        }
    });


    $('#esqueciEmail').on('input', function () {
        var email = $(this).val();
        var Alerta = $('#verificaEmail');
        Alerta.attr('class', '');

        if (email == "") {
            Alerta.addClass('none');
        }

        if (validarEmail(email)) {
            Alerta.text("Email Válido!");
            Alerta.addClass('alert alert-success');
        } else {
            Alerta.text("Email inválido! Por favor, insira um email válido");
            Alerta.addClass('alert alert-danger');
        }
    });

    $('#NewEmail').on('input', function () {
        var email = $(this).val();
        var Alerta = $('#verificaNovoEmail');
        Alerta.attr('class', '');

        if (email == "") {
            Alerta.addClass('none');
        }

        if (validarEmail(email)) {
            Alerta.text("Email Válido!");
            Alerta.addClass('alert alert-success');
        } else {
            Alerta.text("Email inválido! Por favor, insira um email válido");
            Alerta.addClass('alert alert-danger');
        }
    });

    $("#ocultarNovaSenha").on("click", function () {
        ShowHide();
    });

    $("#ocultarConfirmacaoSenha").on("click", function () {
        ShowHide();
    });

    $("#ocultarSenha").on("click", function () {
        ShowHideSenha();
    });

});

function ShowHide() {
    var campoSenha = document.getElementById('NewPassword');
    var campoConfirmarSenha = document.getElementById('PasswordConfirm');
    var icone = document.getElementById('ocultarNovaSenha');
    var icone2 = document.getElementById('ocultarConfirmacaoSenha');

    if (campoSenha.type === 'password') {
        campoSenha.setAttribute('type', 'text');
        campoConfirmarSenha.setAttribute('type', 'text');
        icone.classList.add('hide');
        icone2.classList.add('hide');
    } else {
        campoSenha.setAttribute('type', 'password');
        campoConfirmarSenha.setAttribute('type', 'password');
        icone.classList.remove('hide');
        icone2.classList.remove('hide');
    }

}

function ShowHideSenha() {
    var campoSenha = document.getElementById('passwordLogin');
    var icone = document.getElementById('ocultarSenha');

    if (campoSenha.type === 'password') {
        campoSenha.setAttribute('type', 'text');
        icone.classList.add('hide');
    } else {
        campoSenha.setAttribute('type', 'password');
        icone.classList.remove('hide');
    }

}

function Deslogar() {
    $(`.body-loader`).show();

    $.ajax({
        type: "POST",
        url: "/Login/Logout",
        contentType: 'application/json',
        success: function (r) {
            if (r.resultado === "Deslogado") {
                window.location.href = "/Login";
            } else {
                Swal.fire({
                    title: "Algo deu Errado",
                    text: r.mensagem,
                    icon: "info",
                });
            }
        },
        error: function (err) {
            Swal.fire({
                title: "Erro",
                text: "Não foi possível deslogar",
                icon: "error",
            });
        },
        dataType: "json"
    });
    $('.body-loader').hide();
}

function AutenticarLogin() {

    Carregamento();

    let email = $('#emailLogin').val();
    let senha = $('#passwordLogin').val();

    if (email == "" || senha == "") {

        Carregamento();

        Swal.fire({
            title: "Login e/ou senha não informado",
            text: "Verifique seus dados e tente novamente",
            icon: "info"
        });
        return
    }

    GetLogin(email, senha);
}

function GetLogin(email, senha) {
    $.ajax({
        type: "POST",
        url: "/api/login",
        contentType: 'application/json',
        data: JSON.stringify({ usu_email: email, usu_senha: senha }),
        success: function (response) {

            if (response.message === "Valido") {
                window.location.href = "/voluntariado";

            } if(response.message === "Invalido") {

                Swal.fire({
                    title: "Login e/ou senha inválidos",
                    text: "Verifique seus dados e tente novamente",
                    icon: "info"
                });
                Carregamento();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao processar a solicitação.",
                icon: "error"
            });
            console.error("Erro na solicitação:", textStatus, errorThrown);
            Carregamento(); 
        },
        dataType: "json"
    });
}

function NovoUsuario() {

    $(`.body-loader`).show();

    let nome = $("#NewName").val();
    let email = $('#NewEmail').val();
    let senha = $('#NewPassword').val();
    let confirmacaoSenha = $('#PasswordConfirm').val();

    if (email == "" || senha == "" || nome == "") {

        $('.body-loader').hide();

        Swal.fire({
            title: "Existem campos não preenchidos",
            text: "Verifique os dados e tente novamente",
            icon: "info"
        });

        return
    }

    let VerificaEmail = $('#verificaNovoEmail').text();

    if (VerificaEmail != "Email Válido!") {
        Swal.fire({
            title: "Email Inválido",
            text: "Insira um Email válido e tente novamente",
            icon: "info"
        });

        return
    }

    let forcaSenha = $('#verificaSenha').text();

    if (forcaSenha != "Sua Senha está Forte") {
        Swal.fire({
            title: "Sua senha ainda não está forte",
            text: "Fortaleça sua senha e tente novamente",
            icon: "info"
        });

        return
    }


    if(senha === confirmacaoSenha){

        let tipoUsuario = $('#Tipo').val();
        PostLogin(nome, email, senha,tipoUsuario);
    }else{
        Swal.fire({
            title: "Atenção!",
            text: "Senhas não conferem! verifique os dados e tente novamente",
            icon: "info",
        });
        return
    }
    
}

function PostLogin(nome, email, senha,tipoUsuario) {

    
    $.ajax({
        type: "POST",
        url: "/api/InserirUsuario",
        contentType: 'application/json',
        data: JSON.stringify({ usu_nome: nome, usu_email: email, usu_senha: senha, usu_tipo: tipoUsuario }),
        success: function (response) {
            $('.body-loader').hide();

            if (response.resultado === "criado") {
                $('#novo_cadastro')[0].reset();
                $('#modal-cadastro').modal('toggle');
                Swal.fire({
                    title: "Usuário criado com sucesso",
                    text: "Prossiga com o acesso à plataforma",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: "Algo deu errado",
                    text: response.error,
                    icon: "warning"
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.body-loader').hide();
            Swal.fire({
                title: "Erro na solicitação",
                text: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
                icon: "error"
            });
            console.error("Erro na solicitação:", textStatus, errorThrown);
        },
        dataType: "json"
    });
}

function NovaSenha() {
    var VerificaEmail = $("#verificaEmail").text();

    if (VerificaEmail != "Email Válido!") {
        Swal.fire({
            title: "Email Inválido!",
            text: "Insira um E-mail válido e tente novamente",
            icon: "info"
        });

        return
    }

    //Envia nova senha aqui
}

function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function Deslogar(){

    $(`.body-loader`).show();
    $.ajax({
        type: "POST",
        url: "api/Logout",
        contentType: 'application/json',
        success: function (r) {
            if (r.resultado === "Deslogado") {
                window.location.href = "/Login";
            } else {
                Swal.fire({
                    title: "Algo deu Errado",
                    text: r.mensagem,
                    icon: "info",
                });
            }
        },
        error: function (err) {
            Swal.fire({
                title: "Erro",
                text: "Não foi possível deslogar",
                icon: "error",
            });
        },
        dataType: "json"
    });
    $('.body-loader').hide();
}


function Carregamento() {
    $('.body-loader').toggle();
}