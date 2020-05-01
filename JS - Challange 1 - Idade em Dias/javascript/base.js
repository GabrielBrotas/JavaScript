// challange : Idade em dias


function IdadeDias() {
    
    // pegar o ano que nasceu
    var birthYear = prompt('Em que ano você nasceu?');

    // pegar a idade e multiplicar por 365 vai obter a quantidade de dias
    var IdadeEmDias = (2020 - birthYear) * 365;

    // vai criar um elemento h1
    var h1 = document.createElement("h1");

    // vai criar um texto 'Voce tem + <a variavel IdadeEmDias> + dias'
    var textoResposta = document.createTextNode('Você tem '+ IdadeEmDias + ' dias');

    // vai inserir no h1 criado o id = 'IdadeEmDias'
    h1.setAttribute('id', 'IdadeEmDias');

    // vai inserir a variavel texto no h1
    h1.appendChild(textoResposta);

    // dentro da div flex-box-result, vai colocar o elemento h1
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    // pegar o elemento h1 criado que demos o id 'IdadeEmDias' e remover elee
    document.getElementById('IdadeEmDias').remove();
}
