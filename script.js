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

        // Random gift positions
        while (giftPositions.length < 5) {
            const pos = Math.floor(Math.random() * gridSize);
            if (!giftPositions.includes(pos)) giftPositions.push(pos);
        }

        // Create grid
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
        box.innerHTML = '🎁';
        giftCountDisplay.textContent = giftsFound;
    } else {
        box.textContent = Math.random() > 0.5 ? '😜' : '😂'; // Random fun
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
        resultDisplay.textContent = 'كل سنة وانتي طيبة يا روان، عيد ميلادك يهبل! 🎉🎂';
        resultDisplay.style.color = '#ff1493';
        partyTime();
    } else {
        resultDisplay.textContent = 'ياااه، الكليكات خلّصت! جربي تاني يا ست الكل';
        resultDisplay.style.color = '#ff0000';
    }
}

function partyTime() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = Math.random() > 0.5 ? '🎉' : '✨';
            confetti.style.position = 'absolute';
            confetti.style.fontSize = '25px';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            confetti.style.animation = 'fall 3s linear';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 150);
    }
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);