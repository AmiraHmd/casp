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
    $("#level").text("Kg2");

}
else if (correctAnswers <= 70) {
    $("#correctAns").text(correctAnswers);
    $("#level").text("1");
}
else {
    $("#correctAns").text(correctAnswers);
    $("#level").text("2");
}