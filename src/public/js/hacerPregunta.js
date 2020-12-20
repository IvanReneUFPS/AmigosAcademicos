document.querySelector("#textarea").addEventListener("keyup", autosize);
function autosize() {
    var el = this;
    el.style.height = `${el.scrollHeight}px`;
    if (
        el.value.length > 0 &&
        el.value.length <= 1 &&
        el.value[0] != "¿" &&
        el.value[el.value.length - 1] != "?"
    ) {
        if (!(el.value[0] === "¿" && el.value[el.value.length - 1] === "?")) {
            el.value = `¿${el.value}?`;
            el.selectionStart = el.value.length - 1;
            el.selectionEnd = el.value.length - 1;
            el.focus();
        }
    }
}
$("#exampleModal").on("show.bs.modal", function (e) {
    document.getElementById("textarea").focus();
    document.querySelector("#textarea").value = "";
});
$("#exampleModal").on("shown.bs.modal	", function (e) {
    document.getElementById("textarea").focus();
});
