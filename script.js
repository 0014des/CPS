const timerEl = document.getElementById('timer');
const countEl = document.getElementById('count');
const clickBtn = document.getElementById('click-btn');
const resultEl = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

let count = 0;
let timeLeft = 1.0;
let intervalId = null;
let gameActive = false;

function updateTimerDisplay() {
  timerEl.textContent = `残り時間: ${timeLeft.toFixed(2)}秒`;
}

function updateCountDisplay() {
  countEl.textContent = `クリック数: ${count}`;
}

function startGame() {
  count = 0;
  timeLeft = 1.0;
  gameActive = true;
  resultEl.classList.add('hidden');
  restartBtn.classList.add('hidden');
  clickBtn.disabled = false;
  updateCountDisplay();
  updateTimerDisplay();

  intervalId = setInterval(() => {
    timeLeft -= 0.01;
    if (timeLeft <= 0) {
      timeLeft = 0;
      endGame();
    }
    updateTimerDisplay();
  }, 10);
}

function endGame() {
  clearInterval(intervalId);
  gameActive = false;
  clickBtn.disabled = true;
  resultEl.textContent = `終了！あなたのスコア: ${count}回`;
  resultEl.classList.remove('hidden');
  restartBtn.classList.remove('hidden');
  timerEl.textContent = `残り時間: 0.00秒`;
}

// 最初はゲーム開始していない状態にする
gameActive = false;
updateTimerDisplay();
updateCountDisplay();

clickBtn.addEventListener('click', () => {
  if (!gameActive) {
    // 最初のクリックでゲームスタート
    startGame();
  }
  if (gameActive) {
    count++;
    updateCountDisplay();
  }
});

restartBtn.addEventListener('click', () => {
  // リセット表示状態に戻す
  count = 0;
  timeLeft = 1.0;
  updateCountDisplay();
  updateTimerDisplay();
  resultEl.classList.add('hidden');
  restartBtn.classList.add('hidden');
  clickBtn.disabled = false;
  gameActive = false;
});
