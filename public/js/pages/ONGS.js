$(document).ready(function() {
    atualizarEstadoNaTabela();
  });


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

    let OngContato = $('#NovaONGContato').val();
    OngContato  == "" ? erros.push("Informe o contato") : "";


    if (erros.length == 0) {

        PostNovaONG(OngNome, OngLocalizacao, OngDescricao,OngAtuacao,OngContato);

    } else {
        erros.forEach(e => {
            Command: toastr["warning"](e);
        });
        return
    }

}

function PostNovaONG(OngNome, OngLocalizacao, OngDescricao,OngAtuacao,OngContato){

    $('.body-loader').show();

    $.ajax({
        type: "POST",
        url: "/api/Ongs/InserirOrganizacao",
        contentType: 'application/json',
        data: JSON.stringify({ nome_ong: OngNome, estado:OngLocalizacao,
            descricao_ong:OngDescricao, id_Area_atuacao: OngAtuacao, contato: OngContato }),
        success: function (response) {
            $('.body-loader').hide();

            if (response.resultado === "criado") {

                Swal.fire({
                    title: "Organização criada com sucesso",
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

function EditarOrganizacao(){
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

        Swal.fire({
            title: "Nao deu Tempo =(",
            text: "nou houve tempo para finalizar",
            icon: "info",
        });

    } else {
        erros.forEach(e => {
            Command: toastr["warning"](e);
        });
        return
    }
}

function AbrirModalVerificarONG(idOng) {    
    $(`.body-loader`).show();
    
    $.ajax({
        url: `/api/Ongs/${idOng}`,
        method: 'GET',
        success: function (e) {
            $('#ConsultaNomeONG').text(e.nome_ong);
            $('#ConsultaLocalizacaoONG').text(e.estado);
            $('#ConsultaAtuacaoONG').text(e.id_Area_atuacao);
            $('#ConsultaContatoONG').text(e.contato);
            $('#ConsultaDescricaoONG').text(e.descricao_ong);
            $('#ConsultaVoluntáriosONG').text(e.voluntarios_inscritos_ong);

            $.when(
                buscarNomeEstado(e.estado),
                buscarNomeAtuacao(e.id_Area_atuacao)
            ).done(function(nomeEstado, nomeAtuacao) {
                $('#ConsultaLocalizacaoONG').text(nomeEstado[0].nome_estado); 
                $('#ConsultaAtuacaoONG').text(nomeAtuacao[0].atuacao); 

                $('#ModalVerificarONG').modal('show');
            }).fail(function (error) {
                Swal.fire({
                    title: "Algo deu Errado",
                    text: "Erro ao buscar nomes",
                    icon: "info",
                });
            });
        },
        error: function (e) {
            Swal.fire({
                title: "Algo deu Errado",
                text: "Erro ao buscar detalhes da ONG",
                icon: "info",
            });
        },
        complete: function () {
            $(`.body-loader`).hide();
        }
    });
}

function AbrirModalAlterarONG(id){
    $('#ModalEditarONG').modal('show');

}

function AbrirModalAdicionarVoluntario(){
    // $(`.body-loader`).show();
    // $('#ModalVerificarONG').modal('hide');
    // setTimeout(function () {
    //     $(`.body-loader`).hide();
    //     $('#ModalAdicionarVoluntario').modal('show');
    // }, 400);
    // $(`.body-loader`).hide();

    Swal.fire({
        title: "Nao deu Tempo =(",
        text: "nou houve tempo para finalizar",
        icon: "info",
    });

}

function InscreverVoluntario(){
    let voluntario = $('#InserirVoluntarioONGVoluntario').val()

    if(voluntario == ""){
        Command: toastr["warning"]("Insira o voluntário");
    }
    //InserirVoluntarioONGId
}

function buscarNomeEstado(id) {
    return $.ajax({
      url: `/api/estado/${id}`, 
      method: 'GET',
      dataType: 'json'
    });
  }

  function buscarNomeAtuacao(id) {
    return $.ajax({
      url: `/api/areaAtuacao/${id}`, 
      method: 'GET',
      dataType: 'json'
    });
  }

  function atualizarEstadoNaTabela() {

    $(`.body-loader`).show();

    $('td.estado').each(async function() {
      const $td = $(this);
      const idEstado = $td.text().trim();   
      try {
        const resposta = await buscarNomeEstado(idEstado);
        const nomeEstado = resposta.nome_estado; 
        $td.text(nomeEstado); 
      } catch (error) {
        console.error('Erro ao buscar o nome do estado:', error);
      }
    });

    $('td.atuacao').each(async function() {
        const $td = $(this);
        const id = $td.text().trim();   
        try {
          const resposta = await buscarNomeAtuacao(id);
          const nomeEstado = resposta.atuacao; 
          $td.text(nomeEstado); 
        } catch (error) {
          console.error('Erro ao buscar o nome do estado:', error);
        }
      });

      $(`.body-loader`).hide();
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