// criar um objeto com os dados dos 2 player
let blackjackGame = {
    // dentro do dicionario vamos pegar o id do span resultado, id do div da box, e a pontuacao 
    'voce': {'pontuacaoSpan': '#your-blackjack-result', 'div': '#your-box', 'pontuacao': 0},
    'adversario': {'pontuacaoSpan': '#adversario-blackjack-result', 'div':'#adversario-box', 'pontuacao': 0},
    'cardsDeq': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'],
    'cardsValue': [2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 10, 10, 10],
};

// criar atalhos para acessar o objeto,
// const pois nao vai mudar 
const VOCE = blackjackGame['voce'];
const ADVERSARIO = blackjackGame['adversario'];


// criar arquivo de audio para quando clicar em hit
const hitSound = new Audio('sounds/swish.m4a');
const cashSound = new Audio('sounds/cash.mp3');


// querySelector é semelhante ao getElemenyById, porem com essa funcao nos nao precisamos colocar no html o atributo on click, o comando addEventListener tem essa propriedade, ao clicar executar a funcao indicada (nao precisa dos parenteses depois da funcao).
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);


// botao stand para encerrar a vez
document.querySelector('#blackjack-stand-button').addEventListener('click', adversarioLogica);


// quando clicar no botao reset vai executar a funcao para limpar as cartas da mesa
document.querySelector('#blackjack-restart-button').addEventListener('click', blackjackRestart);



function blackjackHit() {
    // pegar uma carta na funcao random
    let card = randomCard();
    // console.log(card);

    showCard(card[0] ,VOCE);
    // console.log(card[1])

    updateScore(card[1], VOCE);
    // console.log(VOCE['pontuacao']);

    showScore(VOCE);
}


function showCard (card, activePlayer) {

    // alert('auu'); <- apenas para verificar se a funcao esta funcionando

    // so vai mostrar as cartas se a pontuacao for menor ou igual q 21.
    if (activePlayer['pontuacao'] <= 21) {

        // criar elemento img para colocar as cartas
        let cardImage = document.createElement('img');
        
        // colocar atributo src no elemento e indicar o endereco 0 que fica as cartas no array
        cardImage.setAttribute('src', 'images/' + card + '.png');

        // console.log(cardImage); teste

        // colocar imagem na nossa board (div)
        document.querySelector(activePlayer['div']).appendChild(cardImage);

        hitSound.play();
    
    }


};


// funcao para gerar uma carta aleatoria
function randomCard(){

    // pegar um numero aleatorio entre 0 e 12
    random = Math.floor(Math.random() * 13);
    
    // pegar uma carta usando o index do random 
    card = [blackjackGame['cardsDeq'][random], blackjackGame['cardsValue'][random]];

    // teste
    // console.log(card); teste
    // console.log(value); teste
    
    return card

};


// funcao para remover as imagens e resetar a pontuacao
function blackjackRestart () {

    // alert('yoo') <-- teste

    // dentro da div 'your-box' pegar todas as img
    let yourCards = document.querySelector('#your-box').querySelectorAll('img');
    let adversarioCards = document.querySelector('#adversario-box').querySelectorAll('img');

    // checar oq vamos obter, vai ser um array com as imagens dentro
    // console.log(yourCards);
    // console.log(adversarioCards);

    for (let i = 0; i < yourCards.length; i++) {

        yourCards[i].remove();

    };

    for (let i = 0; i < adversarioCards.length; i++) {

        adversarioCards[i].remove()

    }

    // reiniciar o score dos dois
    VOCE['pontuacao'] = 0;
    ADVERSARIO['pontuacao'] = 0;
    
    // alterar o score no span da board
    document.querySelector(VOCE['pontuacaoSpan']).textContent = 0;
    document.querySelector(ADVERSARIO['pontuacaoSpan']).textContent = 0;

    // cor da pontuacao branca
    document.querySelector(VOCE['pontuacaoSpan']).style.color = 'white';
    document.querySelector(ADVERSARIO['pontuacaoSpan']).style.color = 'white';

    document.querySelector('#blackjack-result').textContent = 'Lets Play';
    document.querySelector('#blackjack-result').style.color = 'black';
};


// funcao para atualizar o score do player atual
function updateScore(card, activePlayer) {
    activePlayer['pontuacao'] += card;
}


// funcao para mostrar o score do player atual
function showScore(activePlayer) {
 
    if (activePlayer['pontuacao'] > 21) {
        // colocando elementos do css 
        document.querySelector(activePlayer['pontuacaoSpan']).textContent = 'Ultrapassou!!';
        document.querySelector(activePlayer['pontuacaoSpan']).style.color = 'red'; 
    } else { 
        document.querySelector(activePlayer['pontuacaoSpan']).textContent = activePlayer['pontuacao'];

    }
    
}

function adversarioLogica() {

    if (VOCE['pontuacao'] <= 21) {
    // escolher carta enquanto a pontuacao for menor que a sua ou menor que 11.
        while ( ADVERSARIO['pontuacao'] < VOCE['pontuacao'] || ADVERSARIO['pontuacao'] <= 11) {

            // pegar uma carta aleatoria
            let card = randomCard();

            // mostrar a carta na board
            showCard(card[0], ADVERSARIO);

            // atualizar o score do adversario
            updateScore(card[1], ADVERSARIO);

            // mostrar o score na board
            showScore(ADVERSARIO);

        };
    ;}

    let winner = winnerCheck(VOCE, ADVERSARIO);
    showResult(winner);
  
}


// condicoes para escolher o vencedor
function winnerCheck(VOCE, ADVERSARIO) {

    let winner;


    if (VOCE['pontuacao'] <= 21) {

        if (VOCE['pontuacao'] > ADVERSARIO['pontuacao'] || ADVERSARIO['pontuacao'] > 21) {

            winner = VOCE;

        } else if (VOCE['pontuacao'] < ADVERSARIO['pontuacao'] && ADVERSARIO['pontuacao'] <= 21) {

            winner = ADVERSARIO;

        } else if (VOCE['pontuacao'] === ADVERSARIO['pontuacao']) {

            winner = 'ninguem';
        }

    } else if (VOCE['pontuacao'] > 21 && ADVERSARIO['pontuacao'] <= 21 ) {

        winner = ADVERSARIO;
        
    } else if (VOCE['pontuacao'] > 21 && ADVERSARIO['pontuacao'] > 21) {

        winner = 'ninguem'

    }

    return winner;

}

 
// mostrar mensagem dizendo se ganhou, perdeu ou empatou
function showResult(winner) {

    let message, messageColor;

    if (winner === VOCE){
        message = 'voce venceu !!';
        messageColor = 'green';
        document.querySelector('#vitorias').textContent ++;
        cashSound.play()
        
    } else if (winner === ADVERSARIO) {
        message = 'voce perdeu!';
        messageColor = 'red'
        document.querySelector('#derrotas').textContent ++;

    } else {
        message = 'empate'
        messageColor = 'blue'
        document.querySelector('#empates').textContent ++;

    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}