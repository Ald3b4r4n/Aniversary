// Música chiptune
const music = new Howl({
  src: ['assets/chiptune.mp3'],
  loop: true,
  volume: 0.5
});
music.play();

// Referências
const bolo = document.getElementById('bolo');
const cakeMsg = document.getElementById('cake-message');
const seqDiv = document.getElementById('sequential-messages');
const casalImg = document.getElementById('casal-img');
const finalMsg = document.getElementById('final-message');

// Criar div para extra message
const extraMsg = document.createElement('div');
extraMsg.id = 'extra-message';
extraMsg.classList.add('pixel-font');
document.body.appendChild(extraMsg);

// Anima bolo e mensagem inicial
gsap.to(bolo, { opacity: 1, duration: 1.5, delay: 0.5 });
cakeMsg.textContent = 'feliz aniversário de casamento meu amor';
gsap.to(cakeMsg, { opacity: 1, duration: 1, delay: 1.2 });

setTimeout(() => {
  gsap.to(cakeMsg, { opacity: 0, duration: 0.7 });
  showSequentialMessages();
}, 3200);

function showSequentialMessages() {
  const seq = [
    { text: 'atrasado 🫠', delay: 0 },
    { text: '20 de junho', delay: 1500 },
    { text: '5 anos do sim, e que seja para sempre!', delay: 3200 }
  ];
  let i = 0;
  function nextMsg() {
    if (i < seq.length) {
      seqDiv.textContent = seq[i].text;
      gsap.fromTo(seqDiv, { opacity: 0 }, { opacity: 1, duration: 0.7 });
      setTimeout(() => {
        gsap.to(seqDiv, { opacity: 0, duration: 0.5, onComplete: nextMsg });
        i++;
      }, 1200 + seq[i].delay);
    } else {
      seqDiv.textContent = '';
      showCasal();
    }
  }
  nextMsg();
}

function showCasal() {
  gsap.to(casalImg, {
    bottom: '22vh',
    opacity: 1,
    duration: 1.5,
    ease: "power2.out",
    onStart: () => {
      gsap.to(bolo, { opacity: 0, duration: 1 });
    },
    onComplete: () => {
      animateCoraAndFireworks();
    }
  });
}

function animateCoraAndFireworks() {
  for (let i = 0; i < 12; i++) {
    setTimeout(() => createCoracao(Math.random() * window.innerWidth, window.innerHeight * 0.6), i * 150);
  }
  for (let i = 0; i < 4; i++) {
    setTimeout(() => createFogo(window.innerWidth / 2 + (i - 1.5) * 120, window.innerHeight * 0.2), i * 600);
  }
  setTimeout(showFinalMessage, 3500);
}

function createCoracao(x, y) {
  const cora = document.createElement('img');
  cora.src = 'assets/coracao.png';
  cora.style.position = 'absolute';
  cora.style.left = `${x}px`;
  cora.style.top = `${y}px`;
  cora.style.width = '48px';
  cora.style.pointerEvents = 'none';
  cora.style.opacity = 0.85;
  document.body.appendChild(cora);
  gsap.to(cora, {
    y: y - 120 - Math.random() * 60,
    opacity: 0,
    duration: 2.2 + Math.random(),
    ease: "power1.in",
    onComplete: () => cora.remove()
  });
}

function createFogo(x, y) {
  const fogo = document.createElement('img');
  fogo.src = 'assets/fogo.png';
  fogo.style.position = 'absolute';
  fogo.style.left = `${x}px`;
  fogo.style.top = `${y}px`;
  fogo.style.width = '64px';
  fogo.style.pointerEvents = 'none';
  fogo.style.opacity = 1;
  document.body.appendChild(fogo);
  gsap.to(fogo, {
    scale: 2.5,
    opacity: 0,
    duration: 1.2,
    ease: "power1.in",
    onComplete: () => fogo.remove()
  });
}

function showFinalMessage() {
  finalMsg.textContent = '';
  finalMsg.style.opacity = 1;
  const texto = 'Antônio Rafael e Raylane';
  let i = 0;
  function typeLetter() {
    if (i <= texto.length) {
      finalMsg.textContent = texto.slice(0, i);
      i++;
      setTimeout(typeLetter, 120);
    } else {
      showExtraMessage();
    }
  }
  typeLetter();
  for (let j = 0; j < texto.length; j++) {
    setTimeout(() => {
      createFogo(window.innerWidth * 0.15 + j * 32, window.innerHeight * 0.13 + Math.random() * 20);
    }, 120 * j + 300);
  }
}

function showExtraMessage() {
  extraMsg.textContent = 'te amo pra sempre';
  gsap.to(extraMsg, { opacity: 1, duration: 1.5 });
}

document.body.addEventListener('click', (e) => {
  if (e.target.tagName !== 'IMG') {
    createCoracao(e.clientX, e.clientY);
  }
});