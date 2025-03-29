const gridSize = 25; // 5x5 grid
let giftsFound = 0;
let triesLeft = 15;
let gameStarted = false;
const giftPositions = [];

const gameGrid = document.getElementById('gameGrid');
const giftCountDisplay = document.getElementById('giftCount');
const triesLeftDisplay = document.getElementById('triesLeft');
const resultDisplay = document.getElementById('result');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', startGame);

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        giftsFound = 0;
        triesLeft = 15;
        giftCountDisplay.textContent = giftsFound;
        triesLeftDisplay.textContent = triesLeft;
        resultDisplay.textContent = '';
        gameGrid.innerHTML = '';
        giftPositions.length = 0;
        startButton.disabled = true;

        // Generate random gift positions (5 gifts)
        while (giftPositions.length < 5) {
            const pos = Math.floor(Math.random() * gridSize);
            if (!giftPositions.includes(pos)) giftPositions.push(pos);
        }

        // Create the grid
        for (let i = 0; i < gridSize; i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.addEventListener('click', () => revealBox(i, box));
            gameGrid.appendChild(box);
        }
    }
}

function revealBox(index, box) {
    if (!gameStarted || box.classList.contains('revealed')) return;

    triesLeft--;
    box.classList.add('revealed');
    triesLeftDisplay.textContent = triesLeft;

    if (giftPositions.includes(index)) {
        giftsFound++;
        box.textContent = '🎁';
        giftCountDisplay.textContent = giftsFound;
    } else {
        box.textContent = Math.random() > 0.5 ? '🎉' : '✨'; // Random surprise
    }

    if (giftsFound >= 5) {
        endGame(true);
    } else if (triesLeft <= 0) {
        endGame(false);
    }
}

function endGame(won) {
    gameStarted = false;
    startButton.disabled = false;
    if (won) {
        resultDisplay.textContent = 'كل سنة وإنتِ طيبة يا روان! 🎂🎁';
        resultDisplay.style.color = '#ff1493';
        celebrate();
    } else {
        resultDisplay.textContent = 'للأسف، المحاولات خلّصت! جربي تاني!';
        resultDisplay.style.color = '#ff0000';
    }
}

function celebrate() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = '🎉';
            confetti.style.position = 'absolute';
            confetti.style.fontSize = '20px';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.animation = 'fall 2s linear';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }, i * 200);
    }
}

// Add falling animation for confetti
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fall {
        0% { transform: translateY(0); }
        100% { transform: translateY(100vh); }
    }
`;
document.head.appendChild(styleSheet);