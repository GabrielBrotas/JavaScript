let rodada = 1;                 // variavel para verificar qual o jogador da vez
let positions = [];             // marcar as posicoes escolhidas para nao ter duplicadas
let arrayPositions = [ , , ,    // array das posicoes que os jogadores escolheram (verificar winner)
                       , , ,
                       , , ,]

let condicao = false;           // variavel pra checar se pode jogar na posicao escolhida
let winner = false

// funcao principal
function Play(posicao) {

    // caso nao tenha vencedor...
    if (!winner) {

    
        // verificar se pode jogar na posicao escolhida
        condicao = checkPosition(posicao);

        if (condicao) {

            // pegar o simbolo(x,o) do jogador da vez
            jogador = switchPlayer(rodada);

            // marcar o simbolo do jogador da vez na board
            marcarBoad(jogador, posicao);
        
            // checar se venceu
            vencedor = checkWinner();
        
            // acrescentar +1 na rodada
            rodada++;

            // se algum jogador venceu
            if (vencedor){

                // retornar uma mensagem
                winner = mensagem(vencedor);
            }

        }

    }
    
    
    
}


// funcao para mudar os jogadores
function switchPlayer(rodada){

    if (rodada % 2 == 0) {
        player = 'o';
        adversario = 'x';
    } else {
        player = 'x';
        adversario = 'o';
    }

    // funcao para mostrar na tela a vez do jogador adversario
    trocarTurno(adversario);

    return player;

}


// mudar o diplay do turno
function trocarTurno(adversario){

    // remover o atual
    document.getElementById('jogador').querySelector('img').remove();

    // criar o elemento img
    let imagem = document.createElement('img');

    // pegar a imagem do adversario
    imagem.setAttribute('src', 'imagens/' + adversario + '.jpg')

    // mostrar na tela o turno
    document.getElementById('jogador').appendChild(imagem)

}


// marcar na board
function marcarBoad(jogador, posicao) {

    // criar o elemento img do jogador atual
    let imagem = document.createElement('img');

    // pegar a imagem dele
    imagem.setAttribute('src', 'imagens/' + jogador + '.jpg');
    
    // colocar na board na posicao escolhida
    document.getElementById(posicao).appendChild(imagem);

    // acrescentar essa posicao no array para evitar duplicadas
    positions.push(posicao);

    // colocar escolha do jogador no array da board
    arrayPositions[posicao-1] = jogador;
}


// verificar se posicao ja foi escolhida
function checkPosition(posicao) {

    // no array das posicoes...
    for (let i = 0; i <= positions.length; i ++) {

        // se a posicao escolhida ja estiver nesse array nao vai permitir...
        if (posicao == positions[i]) {
            return false;
        }
        
    }

    return true;
}


// checar vencedor
function checkWinner() {
    // array de condicoes para vencer
    condicoes = [
        [arrayPositions[0] + arrayPositions[1] + arrayPositions[2]],
        [arrayPositions[3] + arrayPositions[4] + arrayPositions[5]],
        [arrayPositions[6] + arrayPositions[7] + arrayPositions[8]],
        [arrayPositions[0] + arrayPositions[3] + arrayPositions[6]],
        [arrayPositions[1] + arrayPositions[4] + arrayPositions[7]],
        [arrayPositions[2] + arrayPositions[5] + arrayPositions[8]],
        [arrayPositions[0] + arrayPositions[4] + arrayPositions[8]],
        [arrayPositions[2] + arrayPositions[4] + arrayPositions[6]],
    ]

    // para todas as condicoes
    for (let i = 0; i <= condicoes.length; i++) {

        // verificar se alguma posicao está igual os valores

        if (condicoes[i] == 'xxx'){
        
            return 'x';
        
        } else if ( condicoes[i] == 'ooo') {
        
            return 'o';
        
        }

    }

    if (positions.length == 9) {
        return 'empate';
    }

}


// mensageem para o vencedor
function mensagem(vencedor) {


    if (vencedor != 'empate') {

        // trocar a mensagem 'Turno de' para 'Vencedor ='
        document.getElementById('turno').innerHTML = 'Vencedor = ';

        // deletar a imagem antiga
        document.getElementById('jogador').querySelector('img').remove();
        
        // criar novo elemento imagem
        let winner = document.createElement('img');

        // colocar a imagem do vencedor no atributo
        winner.setAttribute('src', 'imagens/' + vencedor + '.jpg')
    
        // mostrar no display
        document.getElementById('turno').appendChild(winner);

    } else {

        document.getElementById('turno').innerHTML = 'EMPATE !!';
        
        document.getElementById('jogador').querySelector('img').remove();

    }

    return true;


}


function restart(){
    rodada = 1;               
    positions = [];      
    arrayPositions = [ , , , 
                       , , ,
                       , , ,];

    condicao = false;  
    winner = false;

    document.getElementById('turno').innerHTML = 'turno de: ';
    
    // document.getElementById('jogador').querySelector('img').remove();

    let imagem = document.createElement('img');
    
    imagem.setAttribute('src', 'imagens/x.jpg');

    document.getElementById('jogador').appendChild(imagem);



    for (let i = 0; i <= 8; i++) {
        document.getElementById('board').querySelector('img').remove();
    }
    

}