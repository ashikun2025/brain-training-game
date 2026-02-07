window.addEventListener("DOMContentLoaded", () => {
    //ゲーム開始ボタン
    const selectBtn = document.getElementById("select-btn");
    if (selectBtn) {
        selectBtn.addEventListener("click", () => {
            location.href = "./select-difficult.html";
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