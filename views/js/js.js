var modal = document.getElementById('id01');
var modall = document.getElementById('id02');

window.onclick = function(event) {
    if (event.target == modal || event.target == modall) {
        modal.style.display = "none";
        modall.style.display = "none";
    }
}
