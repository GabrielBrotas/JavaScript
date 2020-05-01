
function CriarGatos() {
    // url de uma api que gera imagem de gatos, sempre que rodar esse url vai mostrar uma imagem diferente

    // criar o elemento img
    var image = document.createElement("img");

    // pegar a div que vamos colocar as imagem
    var div = document.getElementById('flex-cat-gen');

    // adicionar o atributo src com o url abaixo, mesma coisa do comando setAttribute('src', 'url)
    image.src = "Http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    
    // inserir na div a imagem
    div.appendChild(image);

}