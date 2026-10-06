const botoesAdicionar = document.querySelectorAll(".adicionar");
const listaPedido = document.querySelector("#listaPedido");
const totalTexto = document.querySelector("#total");
const limpar = document.querySelector("#limpar");
const categoria = document.querySelector("#categoria");
const avisoCategoria = document.querySelector("#avisoCategoria");
const nome = document.querySelector("#nome");
const textoNome = document.querySelector("#textoNome");
const tema = document.querySelector("#tema");
const formPedido = document.querySelector("#formPedido");
const mensagem = document.querySelector("#mensagem");

let total = 0;
let quantidade = 0;

botoesAdicionar.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const nomeProduto = botao.getAttribute("data-nome");
    const preco = Number(botao.getAttribute("data-preco"));

    if (quantidade === 0) {
      document.querySelector("#pedidoVazio").remove();
    }

    const item = document.createElement("li");
    item.innerHTML = nomeProduto + " - R$ " + preco.toFixed(2).replace(".", ",");
    listaPedido.appendChild(item);

    total = total + preco;
    quantidade++;
    totalTexto.innerHTML = total.toFixed(2).replace(".", ",");
  });
});

limpar.addEventListener("click", function () {
  listaPedido.innerHTML = '<li id="pedidoVazio">Nenhum item adicionado.</li>';
  total = 0;
  quantidade = 0;
  totalTexto.innerHTML = "0,00";
});

categoria.addEventListener("change", function () {
  const produtos = document.querySelectorAll(".produto");

  produtos.forEach(function (produto) {
    produto.classList.remove("escondido");

    if (categoria.value !== "todos" && !produto.classList.contains(categoria.value)) {
      produto.classList.add("escondido");
    }
  });

  if (categoria.value === "todos") {
    avisoCategoria.innerHTML = "Mostrando todos os produtos.";
  } else {
    avisoCategoria.innerHTML = "Filtro alterado.";
  }
});

nome.addEventListener("input", function () {
  if (nome.value === "") {
    textoNome.innerHTML = "";
  } else {
    textoNome.innerHTML = "Pedido de: " + nome.value;
  }
});

tema.addEventListener("click", function () {
  document.body.classList.toggle("cor-alternativa");
  tema.setAttribute("title", "A cor da página foi alterada");
});

formPedido.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const retirada = document.querySelector("#retirada");

  if (nome.value.trim() === "") {
    mensagem.innerHTML = "Digite seu nome.";
  } else if (quantidade === 0) {
    mensagem.innerHTML = "Adicione um produto.";
  } else if (retirada.value === "") {
    mensagem.innerHTML = "Escolha retirada ou entrega.";
  } else {
    mensagem.innerHTML = "Pedido enviado com sucesso!";
  }
});
