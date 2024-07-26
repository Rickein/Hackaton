$(document).ready(function () {

    $("#ocultarNovaSenha").on("click", function () {
        ShowHide();
    });

    $("#ocultarConfirmacaoSenha").on("click", function () {
        ShowHide();
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

function VerificarSenha() {
    var senha = $('#NewPassword').val();
    var confirmacaoSenha = $('#PasswordConfirm').val();
    var alerta = $('#verificaSenha');
    alerta.attr('class', 'none');

    if (senha == "" || confirmacaoSenha == "") {
        Swal.fire({
            title: "Atenção!",
            text: "existem campos não preenchidos, verifique novamente",
            icon: "info",
        });
        return
    }

    if (senha === confirmacaoSenha) {
        alerta.attr('class', 'none');
        RecuperarSenha(senha);
        return
    }
    else {
        alerta.attr('class', ' ');
        alerta.addClass('alert alert-danger');
        alerta.text("Senhas não conferem! verifique os campos e tente novamente")
        return
    }

}

function RecuperarSenha() {
//funcao para mudar a senha e redirecionar aqui 
}
