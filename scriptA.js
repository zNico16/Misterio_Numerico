var numberToFind = 0;
var attempts = 0;
var isEnviar = true;
var tentativas = 0;
var modoAtual = 'normal'; // Começa no modo normal
var maxTentativas = 10; // Número de tentativas padrão


document.addEventListener("DOMContentLoaded", () => {
  const startGameBtn = document.getElementById("startGameBtn");
  const lobbyContent = document.querySelector(".lobby-content");
  const gameContent = document.querySelector("#historicoNumeros");

  startGameBtn.addEventListener("click", () => {
    lobbyContent.style.display = "none";
    gameContent.style.display = "flex";
    limparHistorico();
  });

  document.getElementById('voltarLobbyBtn').addEventListener('click', voltarParaLobby);
});

function iniciarJogo() {
  document.getElementById("lobbyContent").style.display = "none";
  document.getElementById("jogoContent").style.display = "block";
  document.getElementById('voltarLobbyBtn').style.display = "block";
}

function refresh() {
    var element = document.getElementById('bet');
    element.value = '';
    
    tentativas = 0;

    do {
        numberToFind = parseInt(Math.random() * 100);
    } while (numberToFind === 0);
    attempts = 0;

    console.log('O número a ser encontrado: ' + numberToFind);

    limparHistorico();
}

refresh();

function verificarEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if (isEnviar) {
            acionarBotao();
        } else {
            reiniciarJogo();
        }
    }
}

function acionarBotao() {
  var element = document.getElementById('bet');
  var bet = parseInt(element.value);
  var parabensTexto = document.getElementById('parabensTexto');
  var mensagemPerda = document.getElementById('mensagemPerda');
  var imagemVitoria = document.getElementById('imagemVitoria');

  if (isNaN(bet) || bet < 1 || bet > 100) {
      alert('🚨 Por favor, digite um número entre 1 e 100. 🚨');
      element.value = "";
      return;
  }

  exibirBotaoVoltarLobby();
  tentativas++;

  if (bet === numberToFind) {
      parabensTexto.style.display = 'block';
      document.getElementById('tentativasTexto').textContent = `${tentativas}`;
      imagemVitoria.style.display = 'block'; // Mostra a imagem de vitória
      finalizarJogo();
      document.getElementById('somCerto').play();
  } else {
      if (tentativas === maxTentativas) { // Usando a variável maxTentativas
          mensagemPerda.style.display = 'block';
          document.getElementById('numeroCorreto').textContent = numberToFind;
          finalizarJogo();
          document.getElementById('somErro').play();
      }
  }

  adicionarAoHistorico(bet);
  element.value = "";
}

function finalizarJogo() {
    document.getElementById('bet').style.display = 'none';
    document.getElementById('enviarBtn').style.display = 'none';
    document.getElementById('texto').style.display = 'none';
    exibirBotaoReiniciar();
    isEnviar = false;
}

function exibirBotaoVoltarLobby() {
    var voltarLobbyBtn = document.getElementById('voltarLobbyBtn');
    voltarLobbyBtn.style.display = 'block';
}

function voltarParaLobby() {
    var lobbyContent = document.getElementById('lobbyContent');
    var jogoContent = document.getElementById('jogoContent');
    lobbyContent.style.display = 'flex';
    jogoContent.style.display = 'none';
    voltarLobbyBtn.style.display = 'none';
    limparHistorico();
    refresh();
}

function adicionarAoHistorico(numero) {
    var historicoElemento = document.getElementById('historicoNumeros');
    var novoItem = document.createElement('li');

    if (parseInt(numero) !== numberToFind) {
        novoItem.textContent = numero;

        if (parseInt(numero) < numberToFind) {
            novoItem.classList.add('maior');
        }

        if (parseInt(numero) > numberToFind) {
            novoItem.classList.add('menor');
        }
    } else {
        novoItem.textContent = numero + ' ✅';
        novoItem.classList.add('acertou');
    }

    historicoElemento.appendChild(novoItem);
    historicoElemento.scrollTop = historicoElemento.scrollHeight;
}

function exibirBotaoReiniciar() {
    var reiniciarBtn = document.getElementById('reiniciarBtn');
    reiniciarBtn.style.display = 'block';
}

function reiniciarJogo() {
  var reiniciarBtn = document.getElementById('reiniciarBtn');
  var enviarBtn = document.getElementById('enviarBtn');
  var parabensTexto = document.getElementById('parabensTexto');
  var mensagemPerda = document.getElementById('mensagemPerda');
  var imagemVitoria = document.getElementById('imagemVitoria');
  var texto = document.getElementById('texto');
  var bet = document.getElementById('bet');

  // Esconder elementos de resultado
  reiniciarBtn.style.display = 'none';
  parabensTexto.style.display = 'none';
  mensagemPerda.style.display = 'none';
  imagemVitoria.style.display = 'none';
  
  // Mostrar elementos do jogo novamente
  enviarBtn.style.display = 'block';
  texto.style.display = 'block';
  bet.style.display = 'block';

  isEnviar = true; // Resetar estado do botão enviar

  limparHistorico();
  refresh();
}


function limparHistorico() {
    var historicoElemento = document.getElementById('historicoNumeros');
    historicoElemento.innerHTML = "<li>HISTÓRICO</li>"; // Restaurar o texto inicial
}

function selecionarModo(modo) {
  if (modo === 'normal') {
      modoAtual = 'normal';
      maxTentativas = 10;
      document.getElementById("modoSelecionado").innerHTML = "Modo atual: <strong>Normal</strong>";
  } else {
      modoAtual = 'dificil';
      maxTentativas = 5;
      document.getElementById("modoSelecionado").innerHTML = "Modo atual: <strong>Difícil</strong>";
  }
}
