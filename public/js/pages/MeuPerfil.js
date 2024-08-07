$(document).ready(function () {

    $("#ocultarConfirmacaoSenha").on("click", function () {
        ShowHide();
    });

    $("#ocultarSenha").on("click", function () {
        ShowHide();
    });

    $('#VoluntarioSenha').on('input', function () {
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
            tips += "Use Letras Maiúsculas e Minúsculas. ";
        }

        if (password.match(/\d/)) {
            strength += 1;
        } else {
            tips += "Inclua letras e números. ";
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
            passwordStrengthElement.addClass('alert alert-danger');
        } else if (strength === 2) {
            passwordStrengthElement.text("Senha com força Media: " + tips);
            passwordStrengthElement.addClass('alert alert alert-warning');
        } else if (strength === 3) {
            passwordStrengthElement.text("Senha com força Média: " + tips);
            passwordStrengthElement.addClass('alert alert alert-info');
        } else {
            passwordStrengthElement.text("Sua Senha está Forte");
            passwordStrengthElement.addClass('alert alert alert-success');
        }
    });

    $('#VoluntarioEmail').on('input', function () {
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

});

function ShowHide() {
    var campoSenha = document.getElementById('VoluntarioSenha');
    var campoConfirmarSenha = document.getElementById('VoluntarioConfirmeSenha');
    var icone = document.getElementById('ocultarSenha');
    var icone2 = document.getElementById('ocultarConfirmacaoSenha');

    if (campoSenha.type === 'password') {
        campoSenha.setAttribute('type', 'text');
        campoConfirmarSenha.setAttribute('type', 'text');
        icone.classList.remove('fa-eye');
        icone2.classList.remove('fa-eye');

        icone.classList.add('fa-eye-slash');
        icone2.classList.add('fa-eye-slash');
    } else {
        campoSenha.setAttribute('type', 'password');
        campoConfirmarSenha.setAttribute('type', 'password');

        icone.classList.add('fa-eye');
        icone2.classList.add('fa-eye');

        icone.classList.remove('fa-eye-slash');
        icone2.classList.remove('fa-eye-slash');
    }

}

function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function AbrirModalVerificarONG(){
    $('#ModalVerificarONG').modal('show');
}

function RemoverVoluntario(){
    Swal.fire({
        title: "Atenção!",
        text: "Tem certeza que deseja sair do voluntariado?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Voltar",
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: "Remover"
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Removeu");
        }
      });
}

function EditarVoluntario(){
    var erros = [];

    var nome = $('#VoluntarioNome').val();
    nome == "" ? erros.push("Informe o Nome do Integrante") : "";

    var email = $('#VoluntarioEmail').val();
    email == "" ? erros.push("Informe o E-mail do Integrante") : "";

    var senha = $('#VoluntarioSenha').val();
    senha == "" ? erros.push("Informe a senha do usuario") : "";


    let VerificaEmail = $('#verificaEmail').text();

    if (VerificaEmail != "Email Válido!" && VerificaEmail != "") {
        Swal.fire({
            title: "Email Inválido",
            text: "Insira um Email válido e tente novamente",
            icon: "info"
        });
        return
    }

    let forcaSenha = $('#verificaSenha').text();

    if (forcaSenha != "Sua Senha está Forte" && forcaSenha != "") {
        Swal.fire({
            title: "Sua senha ainda não está forte",
            text: "Fortaleça sua senha e tente novamente",
            icon: "info"
        });
        return
    }

    if (erros.length == 0) {

        var confirmacaoSenha = $('#VoluntarioConfirmeSenha').val();
        if(senha === confirmacaoSenha){
            //PostLogin(nome, email, senha);
            console.log("foi");
        }else{
            Swal.fire({
                title: "Atenção!",
                text: "Senhas não conferem! verifique os dados e tente novamente",
                icon: "info",
            });
            return
        }

    } else {
        erros.forEach(e => {
            Command: toastr["warning"](e);
        });
        
        return
    }
}


function AbrirModalVerificarInformacoes(){
    $('#ModalVerificacoes').modal('show');
}

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}