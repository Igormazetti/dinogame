const dino = document.querySelector(".dino");
const background = document.querySelector(".background");

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  // event é enviado para a função quando apertar a tecla
  if (event.keyCode === 32) {
    // keyCode 32 = espaço
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Parar de subir
      clearInterval(upInterval);

      // Descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          // Quando chega na posição 0, para de descer
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add("cactus");
  cactus.style.left = cactusPosition + "px";
  background.appendChild(cactus);

  let leftTimer = setInterval(() => {
    // Saiu da tela
    if (cactusPosition < -60) {
      clearInterval(leftTimer);
      background.removeChild(cactus);
      // Condição de game over se o cactus e o dinossauro chegarem na mesma posição
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      // vai levando o cactus para a esquerda
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  setTimeout(createCactus, randomTime);
  // Novo cactus será criado após o randomTime
}

createCactus();
document.addEventListener("keyup", handleKeyUp);
