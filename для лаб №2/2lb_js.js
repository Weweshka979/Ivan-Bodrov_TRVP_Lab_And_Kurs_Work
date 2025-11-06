// для 2й лб
function func_alert(text){
    alert(`Раздел \"${text}\" недоступен`);
}

document.getElementById("planet1").onclick =() => {func_alert(document.getElementById("planet1").textContent);}
document.getElementById("planet2").onclick =() => {func_alert(document.getElementById("planet2").textContent);}
document.getElementById("planet3").onclick =() => {func_alert(document.getElementById("planet3").textContent);}
document.getElementById("planet4").onclick =() => {func_alert(document.getElementById("planet4").textContent);}
document.getElementById("planet5").onclick =() => {func_alert(document.getElementById("planet5").textContent);}
document.getElementById("news").onclick =() => {func_alert(document.getElementById("news").textContent);}
document.getElementById("party").onclick =() => {func_alert(document.getElementById("party").textContent);}
document.getElementById("modes").onclick =() => {func_alert(document.getElementById("modes").textContent);}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // отмена отправки формы
    alert("Функция поиска на данный момент недоступна");
    document.querySelector("form").reset();
});