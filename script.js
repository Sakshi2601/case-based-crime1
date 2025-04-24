let questions = [
  {
    question: 'Have you worn gloves?',
    options: ['Yes, I am wearing gloves.', 'No, I haven\'t worn gloves.'],
    correct: 0
  },
  {
    question: 'Can these papers be thrown into a dustbin or used as evidence?',
    options: ['They should be used as evidence.', 'They can be thrown into a dustbin.'],
    correct: 0
  },
  {
    question: 'Should we touch anything at a crime scene?',
    options: ['No, we should avoid disturbing evidence.', 'Yes, to help investigation.'],
    correct: 0
  },
  {
    question: 'Is it okay to eat at a crime scene?',
    options: ['Yes, if hungry.', 'No, it contaminates the scene.'],
    correct: 1
  },
  {
    question: 'How should we document the scene?',
    options: ['Take photographs and notes.', 'Try to remember it.'],
    correct: 0
  }
];

let currentQIndex = null;
let score = 0;
let answered = 0;

const scene = document.getElementById('scene');
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

document.addEventListener('mousemove', e => {
  // Normalize mouse position (-1 to 1)
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Smooth animation
function animateScene() {
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  const translateX = targetX * 30;
  const translateY = targetY * 30;

  scene.style.transform = `scale(1.0) translate(${translateX}px, ${translateY}px)`;
  requestAnimationFrame(animateScene);
}

animateScene();


function triggerQuestion(index) {
  currentQIndex = index;
  const q = questions[index];
  document.getElementById('questionText').textContent = q.question;
  document.querySelectorAll('.option')[0].textContent = q.options[0];
  document.querySelectorAll('.option')[1].textContent = q.options[1];
  document.getElementById('questionModal').style.display = 'flex';
}

function submitAnswer(choice) {
  const correct = questions[currentQIndex].correct;
  if (choice === correct) score++;
  answered++;

  document.getElementById('questionModal').style.display = 'none';

  if (answered === questions.length) {
    document.getElementById('resultBox').style.display = 'block';
    document.getElementById('finalScore').textContent = `Score: ${score}/${questions.length}`;
  }
}

function playBackgroundMusic(src) {
  const bgMusic = new Audio(src);
  bgMusic.loop = true;
  bgMusic.volume = 0.5;
  bgMusic.play().catch(e => console.log('Autoplay failed:', e));
}

// Add click event to start music and game
document.getElementById('startGameBtn').addEventListener('click', () => {
  playBackgroundMusic('assets/sound.mp3');
  document.getElementById('startGameBtn').style.display = 'none';
  startGame(); // your game-starting logic
});


function nextLevel() {
  alert('Next level coming soon!');
}