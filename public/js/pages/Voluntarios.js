$(document).ready(function () {

    $("#ocultarConfirmacaoSenha").on("click", function () {
        ShowHide();
    });

    $("#ocultarSenha").on("click", function () {
        ShowHide();
    });

    $('#NovoVoluntarioSenha').on('input', function () {
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


    $('#EditarVoluntarioEmail').on('input', function () {
        var email = $(this).val();
        var Alerta = $('#verificaEditarEmail');
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

    $('#NovoVoluntarioEmail').on('input', function () {
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
});


function ShowHide() {
    var campoSenha = document.getElementById('NovoVoluntarioSenha');
    var campoConfirmarSenha = document.getElementById('NovoVoluntarioConfirmeSenha');
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

function AbrirModalNovoVoluntario(){
    $('#ModalNovoVoluntario').modal('show');
}

function NovoVoluntario() {

    var erros = [];

    var nome = $('#NovoVoluntarioNome').val();
    nome == "" ? erros.push("Informe o Nome do Integrante") : "";

    var email = $('#NovoVoluntarioEmail').val();
    email == "" ? erros.push("Informe o E-mail do Integrante") : "";

    var senha = $('#NovoVoluntarioSenha').val();
    senha == "" ? erros.push("Informe a senha do usuario") : "";

    var tipo = $('#NovoTipo').val();

    let VerificaEmail = $('#verificaNovoEmail').text();

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

        var confirmacaoSenha = $('#NovoVoluntarioConfirmeSenha').val();
        if (senha === confirmacaoSenha) {
            $('.body-loader').show();
            PostLogin(nome, email, senha,tipo);
        } else {
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

function PostLogin(nome,email,senha,tipo){
    $.ajax({
        type: "POST",
        url: "/api/InserirUsuario",
        contentType: 'application/json',
        data: JSON.stringify({ usu_nome: nome, usu_email: email, usu_senha: senha, usu_tipo: tipo }),
        success: function (response) {
            $('.body-loader').hide();

            if (response.resultado === "criado") {

                Swal.fire({
                    title: "Voluntario criado com sucesso",
                    text: "Confirme para recarregar a pagina",
                    icon: "success",
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
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

function RemoverVoluntario(IdVoluntario) {
    Swal.fire({
        title: "Atenção!",
        text: "Tem certeza que deseja remover voluntário?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Voltar",
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: "Remover"
    }).then((result) => {
        if (result.isConfirmed) {
            
            $(`.body-loader`).show();

            $.ajax({
                url: `api/Voluntarios/${IdVoluntario}`,
                type: 'DELETE', 
                success: function(response) {


                    $(`.body-loader`).hide();

                    Swal.fire({
                        title: 'Usuário Excluído!',
                        text: response.message,
                        icon: 'success',
                        showConfirmButton: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(); 
                        }
                    });
                },
                error: function(xhr, status, error) {

                    $(`.body-loader`).hide();

                    if (xhr.status === 404) {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Usuário não encontrado.',
                            icon: 'error',
                        });
                    } else {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Ocorreu um problema ao excluir o usuário.',
                            icon: 'error',
                        });
                    }
                },
                dataType: 'json'
            });


        }
    });
}

function AbrirModalNivel(idVoluntario) {

    $(`.body-loader`).show();
    $.ajax({
        url: `/api/voluntarios/${idVoluntario}`,
        method: 'GET',
        success: function (e) {
            $('#NivelVoluntarioNome').text(e.nome_completo_usuarios);
            $('#NivelVoluntarioId').val(e.id_usuarios);
            $('#NivelVoluntario').text(e.nivel_usuarios);
            $('#ModalNiveis').modal('show');
        },
        error: function (e) {
            Swal.fire({
                title: "Algo deu Errado",
                text: e,
                icon: "info",
            });
        }
    });

    $(`.body-loader`).hide();


}

function AbrirModalEditarVoluntario(idVoluntario) {
    $(`.body-loader`).show();
    $.ajax({
        url: `/api/voluntarios/${idVoluntario}`,
        method: 'GET',
        success: function (e) {
            $('#EditarVoluntarioNome').val(e.nome_completo_usuarios);
            $('#EditarVoluntarioEmail').val(e.email_usuarios);
            $('#EditarVoluntarioTipo').val(e.id_tipo_usuario);
            $('#EditarVoluntarioId').val(e.id_usuarios);
            $('#ModalEditarIntegrante').modal('show');

        },
        error: function (e) {
            Swal.fire({
                title: "Algo deu Errado",
                text: e,
                icon: "info",
            });
        }
    });

    $(`.body-loader`).hide();
}

function EditarVoluntario() {

    Swal.fire({
        title: "Atenção!",
        text: "Tem certeza que deseja editar o voluntario?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Voltar",
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#f3b760",
        confirmButtonText: "Alterar"
    }).then((result) => {
        if (result.isConfirmed) {

            $(`.body-loader`).show();

            let nome = $('#EditarVoluntarioNome').val();
            let email = $('#EditarVoluntarioEmail').val();
            let tipo_usuario = $('#EditarVoluntarioTipo').val();
            let idUsuario = $('#EditarVoluntarioId').val();

            $.ajax({
                type: "patch",
                url: `/api/Voluntarios/${idUsuario}`,
                contentType: 'application/json',
                data: JSON.stringify({ nome_completo_usuarios: nome,
                                        email_usuarios: email, 
                                        id_tipo_usuario: tipo_usuario }),
                success: function (r) {

                    if (r.message == "alterado") {
                        $(`.body-loader`).hide();

                        Swal.fire({
                            title: "Voluntario Alterado!",
                            text: "Confirme para recarregar a pagina",
                            icon: "success",
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    }
                },
                error: function (xhr, status, error) {
                    if (xhr.status == 400 || xhr.status == 404) {
                        $(`.body-loader`).hide();

                        var resposta = JSON.parse(xhr.responseText);
                        var mensagem = resposta.mensagem;
                        Swal.fire({
                            title: "Algo deu Errado",
                            text: mensagem,
                            icon: "info",
                        });
                    } else {
                        console.error("Erro na requisição:", error);
                    }
                },
                dataType: "json"
            });
        }
    });
}

function SubirNivelVoluntario() {

    Swal.fire({
        title: "Atenção!",
        text: "Tem certeza que deseja subir o nivvel do voluntario?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Voltar",
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#46c37b",
        confirmButtonText: "Subir Nivel"
    }).then((result) => {
        if (result.isConfirmed) {
            
            $(`.body-loader`).show();

            let nivelTexto = $('#NivelVoluntario').text(); 
            let nivel = parseInt(nivelTexto, 10); 
            nivel += 1;
            let Id= $('#NivelVoluntarioId').val();

            $.ajax({
                type: "patch",
                url: `/api/Voluntarios/${Id}`,
                contentType: 'application/json',
                data: JSON.stringify({ nivel_usuarios:nivel }),
                success: function (r) {

                    if (r.message == "alterado") {
                        $(`.body-loader`).hide();

                        Swal.fire({
                            title: "Nivel Elevado!",
                            text: "Confirme para recarregar a pagina",
                            icon: "success",
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    }
                },
                error: function (xhr, status, error) {
                    if (xhr.status == 400 || xhr.status == 404) {
                        $(`.body-loader`).hide();

                        var resposta = JSON.parse(xhr.responseText);
                        var mensagem = resposta.mensagem;
                        Swal.fire({
                            title: "Algo deu Errado",
                            text: mensagem,
                            icon: "info",
                        });
                    } else {
                        console.error("Erro na requisição:", error);
                    }
                },
                dataType: "json"
            });
        }
    });
}

function DescerNivelVoluntario() {


    Swal.fire({
        title: "Atenção!",
        text: "Tem certeza que deseja descer o nivel do voluntário?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Voltar",
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: "Descer Nivel"
    }).then((result) => {
        if (result.isConfirmed) {

            $(`.body-loader`).show();

            let nivelTexto = $('#NivelVoluntario').text(); 
            let nivel = parseInt(nivelTexto, 10);

            if(nivel == 1){
                Swal.fire({
                    title: "Atenção!",
                    text: "Jogador já está no nivel Inicial",
                    icon: "info",
                });
                return
            }

            nivel -= 1;
            let Id= $('#NivelVoluntarioId').val();
            
            $.ajax({
                type: "patch",
                url: `/api/Voluntarios/${Id}`,
                contentType: 'application/json',
                data: JSON.stringify({ nivel_usuarios:nivel }),
                success: function (r) {

                    if (r.message == "alterado") {
                        $(`.body-loader`).hide();

                        Swal.fire({
                            title: "Nivel Alterado!",
                            text: "Confirme para recarregar a pagina",
                            icon: "success",
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    }
                },
                error: function (xhr, status, error) {
                    if (xhr.status == 400 || xhr.status == 404) {
                        $(`.body-loader`).hide();

                        var resposta = JSON.parse(xhr.responseText);
                        var mensagem = resposta.mensagem;
                        Swal.fire({
                            title: "Algo deu Errado",
                            text: mensagem,
                            icon: "info",
                        });
                    } else {
                        console.error("Erro na requisição:", error);
                    }
                },
                dataType: "json"
            });
        }
    });
}

function PesquisarPorNome(){

    let nome = $(`#Nome`).val();

    var url = ""
    if (nome == "") {
        url = `/voluntarios`;
    } else {
        url = `/voluntarios?Nome=${encodeURIComponent(nome)}`;
    }
    window.location.href = url;
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