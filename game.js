/* VARIAVEIS DE PERGUNTAS DO JOGO. */
var  qtdperguntas = 3;
let perguntasFeitas = [];
//PERGUNTAS DO JOGO
const perguntas = [
    //PERGUNTA O
    {pergunta:"Qual destas linguagens não é conciderada uma linguagem de programação?",
        respostas: ["PHP","javascript","C++","HTML"],
        correta:"resp3"
    },
    //PERGUNTA 1
    {pergunta:"Em que ano o Brasil foi descoberto ?",
        respostas: ["1498","1500","1365","1828"],
        correta:"resp1"
    },
    //PERGUNTA 2
    {pergunta:"O que significa a sigla HTML?",
        respostas: ["Hyper Tonto Maluco Legal","Hyper Text Markup Linguage","Hey Trade More language","Hyper Text Mark Ling"],
        correta:"resp1"
    },
    //PERGUNTA 3
    {pergunta:"Quais destas linguage é considerada uma linguagem de marcação?",
        respostas: ["HTML","javascript","C++","PHP"],
        correta:"resp0"
    },
]

qtdperguntas = perguntas.length - 1; 
gerarPergunta(qtdperguntas);

//FUNÇÃO PARA CARREGAR PERGUNTAS
function gerarPergunta(maxPerguntas){
    
    //GERAR UM NUMERO ALEATORIO
    var aleatorio = Math.floor(Math.random() * (maxPerguntas + 1));
    
    
    //CONVERTER PARA NUMERO
    aleatorio = Number(aleatorio);
    
    // MOSTRA NO CONSOLE QUAL FOI A PERGUNTA SORTEADA
    console.log('A pergunta sorteada foi a: ' + aleatorio);
    
    //VERIFICA SE A PERGUNTA  SORTIADA JÁ FOI FEITA
    if(!perguntasFeitas.includes(aleatorio)){
       
        //COLOCAR COMO PERGUNTA FEITA
        perguntasFeitas.push(aleatorio);

        //PREENCHER O HTML COM OS DADOS DA QUASTÃO SORTEADA
        var p_selecionada = perguntas[aleatorio].pergunta;
        console.log(p_selecionada);

       //ALIMENTAR A PERGUNTA VINDO DO SORTEIO
       $("#pergunta").html(p_selecionada);
       $("#pergunta").attr('data-indice', aleatorio);

       //ALIMENTAR AS RESPOSTAS VINDO DO SORTEIO
       for (var i = 0; i < 4; i++) {
        $("#resp" + i).html(perguntas[aleatorio].respostas[i]);
       }
       /*
       $("#resp0").html(perguntas[aleatorio].respostas[0]);
       $("#resp1").html(perguntas[aleatorio].respostas[1]);
       $("#resp2").html(perguntas[aleatorio].respostas[2]);
       $("#resp3").html(perguntas[aleatorio].respostas[3]);*/

       //EMBARALHAR AS RESPOSTAS
       var pai = $("#respostas");
       var botoes = pai.children();

       for (var i = 0; i < botoes.length; i++) {
        pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
       }
   
    }
    else{
        //SE A PERGUNTA JÁ FOI FEITA, 
        console.log('Pergunta já foi feita. Sorteando novamente');
        if(perguntasFeitas.length < qtdperguntas +1 ){
            return gerarPergunta(maxPerguntas);
        }
        else{
            console.log('Todas as perguntas já foram feitas');
            $('#quiz').addClass('oculto');
            $('#mensagem').html('Você ganhou!')
            $('#status').removeClass('oculto');
        }
    }

}

$(".resposta").click(function () {
    if ($("#quiz").attr('data-status') !== 'travado'){
         //PERCORRER TODAS AS RESPOSTAS E DESMARCAR AS QUE ESTÃO MARCADAS
        resetaBotoes();

         //ADICIONAR A CLASSE SELECIONADA 
        $(this).addClass('selecionada');
    }

});
//PEGAR O INDICE DA PERGUNTA 
$("#confirm").click(function(){
    var indice = $("#pergunta").attr('data-indice');

    //QUAL A RESPOSTA CERTA
    var respCerta = perguntas[indice].correta;
    
    //QUAL FOI A RESPOSTA QUE O USUARIO SELECIONOU
    $('.resposta').each(function(){
        if ($(this).hasClass('selecionada')){
            var respostaEscolhida = $(this).attr('id');


            if (respCerta == respostaEscolhida){
                console.log('resposta correta'); 
                proximaPergunta(); 
            }
            else{
                //SE A RESPOSTA ESTIVER ERRADA
                console.log('resposta errada');
                //TRAVAR O JOGO
                $("#quiz").attr('data-status','travado');
            
                $('#confirm').addClass('oculto');
                // MOSTRAR A RESPOSTA CERTA E A ERRADA
                $('#'+ respCerta).addClass('correta');
                $('#'+ respCerta).removeClass('selecionada');
                $('#'+ respostaEscolhida).addClass('errada');
                //4 SEGUNDOS PARA MODTRAR
                setTimeout(function () {
                    gameOuver();
                },4000);

            
            }

        }
    })
});
function newGame() {
    $('#confirm').removeClass('oculto');
    $("#quiz").attr('data-status','OK');
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(qtdperguntas);
    $('#quiz').removeClass('oculto');
    $('#status').addClass('oculto');

}


function proximaPergunta(){
    resetaBotoes();
    gerarPergunta(qtdperguntas);


}

function resetaBotoes(){
    //PERCORRER TODAS AS RESPOSTAS E DESMARCAR AS QUE ESTÃO MARCADAS
    $('.resposta').each(function () {
        if($(this).hasClass('selecionada')){
           $(this).removeClass('selecionada');
        }
        if($(this).hasClass('correta')){
            $(this).removeClass('correta');
        }
        if($(this).hasClass('errada')){
            $(this).removeClass('errada');
         }

    });
} 

function gameOuver(){
    $('#quiz').addClass('oculto');
    $('#mensagem').html('Você perdeu!')
    $('#status').removeClass('oculto');
}   

$('#novoJogo').click(function () {
    newGame();

});
