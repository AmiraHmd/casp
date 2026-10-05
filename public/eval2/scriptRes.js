// var compteur
let correctAnswers = sessionStorage.getItem('CA');
let wrongAnswers = sessionStorage.getItem('WA');
let currentScreen = 100;
let nom = sessionStorage.getItem('nom');
console.log("currentScreen :", currentScreen);
console.log("Correct :", correctAnswers);
console.log("Wrong :", wrongAnswers);
$("#name").text(nom);

/*if (correctAnswers = 'Null') {
    alert("لم تَقُم بالإختبار.");
}
else*/
if (correctAnswers <= 25) {
    $("#correctAns").text(correctAnswers);
    $("#level").text("3");
}
else if (correctAnswers <= 50) {
    $("#correctAns").text(correctAnswers);
    $("#level").text("4");
}
else if (correctAnswers <= 70) {
    $("#correctAns").text(correctAnswers);
    $("#level").text("5");
}
else {
    $("#correctAns").text(correctAnswers);
    $("#level").text("6");
}