function RemoverONG(){
    Swal.fire({
        title: "Atenção!",
        text: "Tem certeza que deseja remover a ONG?",
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

function NovaOrganizacao(){

    var erros = [];
    let OngNome =$('#NovaONGNome').val();
    OngNome == "" ? erros.push("Informe o Nome da Organização") : "";

    let OngLocalizacao =$('#NovaONGLocalizacao').val();
    OngLocalizacao == "" ? erros.push("Informe a Localização") : "";

    let OngDescricao = $('#NovaONGDescricao').val();
    OngDescricao  == "" ? erros.push("Informe a Descrição") : "";

    let OngAtuacao = $('#NovaONGAtuacao').val();
    OngAtuacao  == "" ? erros.push("Informe a Atuação") : "";

    let OngContato = $('#NovaONGContato');
    OngContato  == "" ? erros.push("Informe o contato") : "";


    if (erros.length == 0) {

        //PostNovaONG(nome, email, senha);
        console.log("foi");

    } else {
        erros.forEach(e => {
            Command: toastr["warning"](e);
        });
        return
    }

}

function EditarOeganizacao(){
    var erros = [];
    let OngNome =$('#EditarONGNome').val();
    OngNome == "" ? erros.push("Informe o Nome da Organização") : "";

    let OngLocalizacao =$('#EditarONGLocalizacao').val();
    OngLocalizacao == "" ? erros.push("Informe a Localização") : "";

    let OngDescricao = $('#EditarONGDescricao').val();
    OngDescricao  == "" ? erros.push("Informe a Descrição") : "";

    let OngAtuacao = $('#EditarONGAtuacao').val();
    OngAtuacao  == "" ? erros.push("Informe a Atuação") : "";

    let OngContato = $('#EditarONGContato');
    OngContato  == "" ? erros.push("Informe o contato") : "";


    if (erros.length == 0) {

        //PostEditONG(nome, email, senha);
        console.log("foi");

    } else {
        erros.forEach(e => {
            Command: toastr["warning"](e);
        });
        return
    }
}

function AbrirModalAlterarONG(){
    //$('#NovoIntegranteIdEquipe').val(idTime);
    $('#ModalEditarONG').modal('show');
}

function AbrirModalVerificarONG(){
    $('#ModalVerificarONG').modal('show');
}

function AbrirModalAdicionarVoluntario(){
    $(`.body-loader`).show();
    $('#ModalVerificarONG').modal('hide');
    setTimeout(function () {
        $(`.body-loader`).hide();
        $('#ModalAdicionarVoluntario').modal('show');
    }, 400);
    $(`.body-loader`).hide();
}

function InscreverVoluntario(){
    let voluntario = $('#InserirVoluntarioONGVoluntario').val()

    if(voluntario == ""){
        Command: toastr["warning"]("Insira o voluntário");
    }
    //InserirVoluntarioONGId
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