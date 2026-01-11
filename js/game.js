const isTest = typeof window === "undefined";

/* ゲーム状態 */
let score = 0;
let correctCount = 0;
let missCount = 0;
let combo = 0;
let maxCombo = 0;
let timeLeft = 60;
let timerId = null;

let cardTimer = null;
let activeCards = [];
let selectedCard = null;

let gameEnded = false;

/* ページ読み込み → ゲーム開始 */
if (!isTest) {
  window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded"); //確認用
    resetGame();
    startCountdown();
    
    //回答を送信する際に、Enterキーを打つ
    const input = document.getElementById("answer-input");
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          checkAnswer();
        }
      });
    }

  });
}



/* 開始前のカウントダウン処理 */
function startCountdown(){
  const overlay = document.getElementById("countdown-overlay");

  if (!overlay) {
    console.error("countdown-overlay が見つかりません");
    return;
  }

  let count = 3;

  // 3 → 2 → 1のアニメーションを追加
  function animateText(text){
    overlay.textContent = text;

    anime.remove(overlay); //前のアニメを止める

    anime({
      targets: overlay,
      scale: [0.3, 1.2],
      opacity: [0, 1],
      duration: 600,
      easing: "easeOutBack"
    });
  }

  animateText(count);

  const timer = setInterval(() => {
    count--;

    if(count > 0) {
      animateText(count);
    } else {
      clearInterval(timer);
      startGame();
      // START! 表示
      animateText("START!");

      setTimeout(() => {
        overlay.remove();
        //startGame();
      }, 700);
    }
  }, 1000);
}

/* ゲームスタート */
let gameStarted = false;

function startGame(){
  if (gameStarted) return;
  gameStarted = true;

  startTimer();
  startCardGeneration();
}

/* ゲームフィニッシュ */
function endGame(){
  if(gameEnded) return;
  gameEnded = true;

  stopCardGeneration();
  clearInterval(timerId);

  //anime.remove(".calc-card");

  activeCards.forEach(card => {
    if(card && card.parentNode){
      card.remove();
    }
  });
  activeCards = [];
  selectedCard = null;

  //結果を保存
  localStorage.setItem("finalScore", score);
  localStorage.setItem("correctCount", correctCount);
  localStorage.setItem("missCount", missCount);
  localStorage.setItem("maxCombo", maxCombo);

  //結果画面に遷移
  setTimeout(() => {
    location.href = "./result.html";
  }, 300);
}

/* ゲームリセット */
function resetGame(){
  score = 0;
  correctCount = 0;
  missCount = 0;
  combo = 0;
  maxCombo = 0;
  timeLeft = 60;

  updateScoreUI();

  const timerEl = document.getElementById("timer");
  timerEl.textContent = `制限時間: ${timeLeft}`;
}


/* カードデータ生成 */
function createCalcCardData(){
  const operactors = ["+", "-", "×", "÷"];
  const operator = operactors[Math.floor(Math.random() * operactors.length)];

  let a, b, answer;

  switch(operator) {
    case "+":
      a = _.random(1, 100);
      b = _.random(1, 100);
      answer = a + b;
      break;
    
    case "-":
      a = _.random(1, 100);
      b = _.random(1, a);
      answer = a - b;
      break;

    case "×":
      a = _.random(1, 50);
      b = _.random(1, 30);
      answer = a * b;
      break;

    case "÷":
      b = _.random(1, 20);
      answer = _.random(1, 20)
      a = b * answer;
      break;
  }

  return {
    text: `${a} ${operator} ${b}`,
    answer
  };
}


/* カードDOM生成 */
function createCardElement(cardData){
  const gameScreen = document.getElementById("game-screen");
  const card = document.createElement("div");
  card.className = "calc-card";

  card.innerHTML = `
    <div class="calc-text">${cardData.text} ＝</div>
    <input
      type="number"
      class="card-input"
      autocomplete="off"
    >
  `;

  card.dataset.answer = cardData.answer;

  // 画面上部のランダム位置
  const cardWidth = 180;
  const maxX = gameScreen.clientWidth -cardWidth;
  const ramdomX = Math.random() * maxX;
  card.style.left = `${ramdomX}px`;

  //Yは必ず画面上から
  card.style.top = "-150px";

  // クリックで選択
  card.addEventListener("click", () => {
    selectCard(card);
  });

  gameScreen.appendChild(card);
  activeCards.push(card);

  dropCard(card);
}


/* カード落下アニメーション */
function dropCard(card) {
  const gameScreen = document.getElementById("game-screen");

  anime({
    targets: card,
    translateY: gameScreen.clientHeight + 200,
    duration: 12000, //落下速度
    easing: "linear",
    complete: () => { 
      removeCard(card);  //画面外に落ちたカードを削除
    }
  });

  //anime.remove(".calc-card");
}


/* カード落下のタイミング */
function startCardGeneration() {
  if (cardTimer !== null) return;

  cardTimer = setInterval(() => {
      const data = createCalcCardData();
      createCardElement(data);
  }, 3000);
}

function stopCardGeneration() {
  clearInterval(cardTimer);
  cardTimer = null;
}

/* 計算カードの解答入力 */
function selectCard(card) {
  //既に選択されているカードの強調を解除
  activeCards.forEach(c => {
    c.classList.remove("selected");
  });

  //新しく選択
  selectedCard = card;
  card.classList.add("selected");

  const input = card.querySelector(".card-input");
  input.focus();
}


/* 正誤判定 */
function checkAnswer(){
  if(!selectedCard) return;

  const input = selectedCard.querySelector(".card-input");
  const userAnswer = Number(input.value);
  const correctAnswer = Number(selectedCard.dataset.answer);
  
  if (userAnswer == correctAnswer) {
    //正解時
    combo++;
    const baseScore = 10;
    const comboBonus = (combo - 1) * 10;
    maxCombo = Math.max(maxCombo, combo);
    score += baseScore + comboBonus;
    correctCount++
    showResultMark(selectedCard, true);

    //少し待ってから削除
    setTimeout(() => {
      removeCard(selectedCard);
    }, 500);
    
  } else {
    //不正解時
    combo = 0;
    missCount++
    showResultMark(selectedCard, false);

    //ハイライト解除のみ
    selectedCard.classList.remove("selected");
  }

  selectedCard = null;
  updateScoreUI();
}

/* Enterキーイベント登録 */
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});


/* 〇 / × 表示 */
function showResultMark(card, isCorrect) {
  const mark = document.createElement("div");
  mark.className = "result-mark" + (isCorrect ? "correct" : "wrong");
  mark.textContent = isCorrect ? "〇" : "×";

  card.appendChild(mark);

  anime({
    targets: mark,
    scale: [0.5, 1.2],
    opacity: [1, 0],
    duration: 1000, //アニメーション速度
    easing: "easeOutQuad",
    complete: () => {
      mark.remove();
    }
  });
}


/* 画面外カードの削除 */
function removeCard(card) {
  if (!card) return;

  if (selectedCard === card) {
    selectedCard = null;
  }

  if (card.classList) {
    card.classList.remove("selected");
  }

  if (card.parentNode) {
    card.remove();
  }

  activeCards = activeCards.filter(c => c !== card);
}



/* タイマー管理 */
function startTimer() {
  const timeEl = document.getElementById("timer");

  if (timerId) clearInterval(timerId);

  timerId = setInterval(() => {
    timeLeft --;
    timeEl.textContent = `制限時間: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      endGame();
    }
  }, 1000);
}


/* スコア表示更新 */
function updateScoreUI() {
  document.getElementById("score").textContent = `score: ${score}`;
}

/* ===== テスト用に公開 ===== */
/*window.startGame = startGame;
window.resetGame = resetGame;
window.endGame = endGame;*/

//window.createCalcCardData = createCalcCardData;
//window.createCardElement = createCardElement;
//window.activeCards = activeCards;

// ===== Node.js テスト用エクスポート =====
/*module.exports = {
  createCalcCardData,
  createCardElement,
  removeCard,
  activeCards
};*/

