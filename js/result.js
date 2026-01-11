window.addEventListener("DOMContentLoaded", () => {
    //結果データ取得
    const finalScore = localStorage.getItem("finalScore") ?? 0;
    const correct = localStorage.getItem("correctCount") ?? 0;
    const miss = localStorage.getItem("missCount") ?? 0;
    const maxCombo = localStorage.getItem("maxCombo") ?? 0;

    //画面に反映
    const scoreEl = document.getElementById("final-score-value");
    const correctEl = document.getElementById("correct-count");
    const missEl = document.getElementById("miss-count");
    const comboEl = document.getElementById("max-combo");

    if (scoreEl)    scoreEl.textContent = finalScore;
    if (correctEl)  correctEl.textContent = correct;
    if (missEl)     missEl.textContent = miss;
    if (comboEl)    comboEl.textContent = maxCombo;

    //リトライボタン
    const retryBtn = document.getElementById("retry-btn");
    if (retryBtn) {
        retryBtn.addEventListener("click", () => {
            location.href = "./game.html";
        });
    }

    //スタート画面に戻る
    const backStartBtn = document.getElementById("back-start-btn");
    if (backStartBtn) {
        backStartBtn.addEventListener("click", () => {
            location.href = "./index.html";
        });
    }

});