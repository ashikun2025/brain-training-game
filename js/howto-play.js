window.addEventListener("DOMContentLoaded", () => {
    //スタート画面に戻る
    const gotoStartBtn = document.getElementById("back-start-btn");
    if (gotoStartBtn) {
        gotoStartBtn.addEventListener("click", () => {
            location.href = "./index.html";
        });
    }

});