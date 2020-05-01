function pptGame(escolha) {

    console.log(escolha); // usamos isso para ver qual a resposta que vamos ter, e como trata-la

    console.log(escolha['id']) // teste

    // variavel para as escolhas 
    var humanChoice, ComputerChoice;

    // vai pegar o id 'pedra' 'papel' ou 'tesoura
    humanChoice = escolha['id'];

    // vai chamar a funcao randomChoice para pegar um numero de 0 a 2 e depois chamar a funcao numberToChoice para com o valor tirado escolher pedra, papel ou tesoura.
    ComputerChoice = numberToChoice(randomChoice());
    console.log(ComputerChoice);

    // vai mandar as duas opcoes para a funcao olhar no banco de dado e retornar um arran [1, 0] [0.5, 0.5] ou [0,1]
    resultado = decideWinner(humanChoice, ComputerChoice);
    console.log(resultado);
    
    // mensagem para dizer se perdeu, empatou ou ganhou
    mensagem = MensagemFinal(resultado);
    console.log(mensagem);

    // formatar o front end com o que cada um escolheu e a mensagem
    pptFrontEnd(humanChoice, ComputerChoice, mensagem);
    
}

function randomChoice() {
    // Math.random vai gerar um numero aleatorio entre 0 e 1 , ex= 0.175, 0.945
    // entao multiplicamos esse numero por 3 vamos ter um numero entree 0 e 2.9999
    // Math.floor vai excluir a casa decimal do numero, entao vamos ter 0, 1 ou 2
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    // com o numero aleatorio entre 0 e 2 pegar o valor respectivo 
    return ['pedra', 'papel', 'tesoura'][number];
}

// o resultado poderia ser obtido com if else, mas vamos utilizar outra forma
function decideWinner(YourChoice, ComputerChoice) {
    
    // 0 = derrota
    // 0.5 = empate
    // 1 = vitoria
    var pptDataBase = {
        'pedra': {'pedra': 0.5, 'papel':0, 'tesoura': 1},
        'papel': {'pedra': 1, 'papel': 0.5, 'tesoura': 0},
        'tesoura': {'pedra': 0, 'papel': 1, 'tesoura': 0.5},
    };

    // passar um numero para a variavel
    var yourScore = pptDataBase[YourChoice][ComputerChoice];
    var computerScore = pptDataBase[ComputerChoice][YourChoice];

    // vai retornar um array [1, 0], [0.5, 0.5] ou [0, 1]
    return [yourScore, computerScore]

}

function MensagemFinal([yourScore, ComputerChoice]) {
    // de acordo com nosso score vai retornar a mensagem e a formataçao
    if (yourScore === 0) {
        return {'mensagem': 'Voce Perdeu!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'mensagem': 'Empate!', 'color': 'yellow'};
    } else {
        return {'mensagem': 'Voce Venceu!', 'color': 'green'};
    };

}

function pptFrontEnd(humanChoiceImagem, ComputerChoiceImagem, MensagemFinal) {

    // database das imagem
    var imageDataBase = {
        'pedra': document.getElementById('pedra').src,
        'papel': document.getElementById('papel').src,
        'tesoura': document.getElementById('tesoura').src
    }

    // remover todas as imagens
    document.getElementById('pedra').remove();
    document.getElementById('papel').remove();
    document.getElementById('tesoura').remove();


    // criar div para colocar os resultados
    var humanDiv = document.createElement('div');
    var computerDiv = document.createElement('div');
    var mensagemDiv = document.createElement('div');

    // colocar um id nas div para poder tratar eles depois
    humanDiv.setAttribute('id', 'human');
    computerDiv.setAttribute('id', 'computer');
    mensagemDiv.setAttribute('id', 'mensagem');

    // colocar dentro do div a imagem que escolhemos e sua formataçao
    humanDiv.innerHTML = "<img src='" + imageDataBase[humanChoiceImagem]  + "'style='box-shadow: 0px 10px 58px rgba(37, 50, 233, 1);'>";
    console.log(humanDiv);

    // colocar dentro do div a mensagem com a formataçao
    mensagemDiv.innerHTML = "<h1 style='color: " + MensagemFinal['color'] + "; font-size: 68px; padding:30px'>" + MensagemFinal['mensagem'] + "</h1>"

    // colocar dentro do div a imagem que o computador tirou
    computerDiv.innerHTML = "<img src='" + imageDataBase[ComputerChoiceImagem] + "'style='box-shadow: 0px 10px 58px rgba(243, 38, 24, 1);'>";

    // inserir os valorese no id do flex-box-div
    document.getElementById('flex-box-div').appendChild(humanDiv);

    document.getElementById('flex-box-div').appendChild(mensagemDiv);
    
    document.getElementById('flex-box-div').appendChild(computerDiv);

}

function reset(){

    document.getElementById('human').remove();
    document.getElementById('computer').remove();
    document.getElementById('mensagem').remove();

    var pedra = document.createElement('img');
    var papel = document.createElement('img');
    var tesoura = document.createElement('img');

    pedra.setAttribute('id', 'pedra');
    papel.setAttribute('id', 'papel');
    tesoura.setAttribute('id', 'tesoura');

    pedra.setAttribute('src', 'pedra.PNG');
    papel.setAttribute('src',' papel.PNG');
    tesoura.setAttribute('src', 'tesoura.PNG')

    pedra.setAttribute('onclick', 'pptGame(this)');
    papel.setAttribute('onclick','pptGame(this)');
    tesoura.setAttribute('onclick', 'pptGame(this)');

    document.getElementById('flex-box-div').appendChild(pedra);
    document.getElementById('flex-box-div').appendChild(papel);
    document.getElementById('flex-box-div').appendChild(tesoura);

}