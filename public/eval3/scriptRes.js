// var compteur
let correctAnswers = sessionStorage.getItem('CA');
let wrongAnswers = sessionStorage.getItem('WA');
let currentScreen = 100;
let nom = sessionStorage.getItem('nom');
console.log("currentScreen :", currentScreen);
console.log("Correct :", correctAnswers);
console.log("Wrong :", wrongAnswers);
$("#name").text(nom);

if (correctAnswers <= 25) {
    $("#correctAns").text(correctAnswers);
    $("#level").text("7");
    
}
else if (correctAnswers <= 45) {
    $("#correctAns").text(correctAnswers);
    $("#level").text("8");
}
else if (correctAnswers <= 70) {
    $("#correctAns").text(correctAnswers);
    $("#level").text("9");
}
else {
    $("#correctAns").text(correctAnswers);
    $("#level").text("10");
}