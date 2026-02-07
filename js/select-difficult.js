window.addEventListener("DOMContentLoaded", () => {

  // スタートに戻るボタン
  const backStartBtn = document.querySelector(".back-btn");
  if (backStartBtn) {
    backStartBtn.addEventListener("click", () => {
      location.href = "./index.html";
    });
  }

  // ゲーム開始ボタン
  const gamestartBtn = document.querySelector(".gamestart-btn");
  if (gamestartBtn) {
    gamestartBtn.addEventListener("click", () => {
      location.href = "./game.html";
    });
  }

  const buttons = document.querySelectorAll("button[data-level]");
  let selectedLevel = null;

  // 初期状態：ゲーム開始ボタンを無効化
  gamestartBtn.disabled = true;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {

      // 選択解除
      buttons.forEach((btn) => btn.classList.remove("selected"));

      // 選択状態
      button.classList.add("selected");

      // 難易度取得
      selectedLevel = button.dataset.level;

      // localStorageに保存
      localStorage.setItem("difficulty", selectedLevel);

      // ゲーム開始ボタンを有効化
      gamestartBtn.disabled = false;
    });
  });

});
