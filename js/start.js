window.addEventListener("DOMContentLoaded", () => {
    //ゲーム開始ボタン
    const gameStartBtn = document.getElementById("gamestart-btn");
    if (gameStartBtn) {
        gameStartBtn.addEventListener("click", () => {
            location.href = "./game.html";
        });
    }

    //遊び方の説明ボタン
    const howtoBtn = document.getElementById("howto-btn");
    if (howtoBtn) {
        howtoBtn.addEventListener("click", () => {
            location.href = "./howto-play.html";
        });
    }

});