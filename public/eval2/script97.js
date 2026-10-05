
let tabrep = [];
let vraireps = ["a20","a36","a1","a33","a40","a14","a36","a44","a38","space",
"a7","a36","a35","a14","a38","space",
"a25","a36","a12","a40","a35","a28","a36","a44","a39"
];
 let long= vraireps.length;
 console.log(long)
let box = $('.ltt');
let compt = 0;
let s = 0
let pageCompt = 0;
let vraiEx = 0;
var userAnswer = document.getElementById('ltt');

//traduction
let traduction = $('.questTrad div');
function traduire(id) {
  $(traduction[0])[0].innerHTML = $('#' + id)[0].innerHTML;
}

// var compteur
let correctAnswers = sessionStorage.getItem('CA');
let wrongAnswers=sessionStorage.getItem('WA');
let currentScreen = 98;
console.log("currentScreen :", currentScreen);
console.log("Correct :", correctAnswers);
console.log("Wrong :", wrongAnswers);


//mettre des points dans la case reponse vide
function init() {
    const l =vraireps.length;
    let points = "";
    for (let i = 0; i < l; i++) {
        points = points + ".";
    }
    box.text(points);
}

var index = 0;

//fonction cliquer
function cliquer(id) {

    if (index < vraireps.length) {
        let word = userAnswer.innerText;
       word = id === 'space' ? word.replaceAt(index++, " ")  : word.replaceAt(index++, document.getElementById(id).innerText);
        console.log(word);
        userAnswer.innerText = word;
        tabrep.push(id);
        console.log(tabrep);
    }
}
//fonction qui permet de placer une lettre dans l'indice choisie
String.prototype.replaceAt = function (index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
    return this.substring(0, index) + replacement + this.substring(index + 1);

}
//fonction supprimer
function remove() {
    if(index>=0){
        let word=userAnswer.innerText;
        word= word.replaceAt(--index,".");
        userAnswer.innerText=word;
        let deleted= tabrep.pop();
        if(!tabrep.includes(deleted))
       document.getElementById(deleted).style.color = "black";
    }
}

/*émettre un son*/
let s1 = document.getElementById("s1");
let audio98 = document.getElementById("audio98");


/*fonction son*/
s1.addEventListener('click', function () {
    audio98.play();
});
  
function showCorrection() {

    console.log(tabrep);
    // Mot avec accent
    for (let j = 0; j <= vraireps.length; j++) {
        if ((tabrep.includes(vraireps[j]) && tabrep.indexOf(vraireps[j]) === vraireps.indexOf(vraireps[j]))) {
            s++;
            console.log(s);
        }

    }

    if (s === 29) {
        console.log('bravo')
        correctAnswers++;
        sessionStorage.setItem('CA', correctAnswers);
    }
    else {
        console.log('faux')
        wrongAnswers++;
        sessionStorage.setItem('WA', wrongAnswers);
    }
}

function verification() {
  showCorrection();
  props = {
    hour: hour,
    minute: minute,
    second: second,
    millisecond: millisecond,
    cron: cron,
  }
  sessionStorage.setItem("timer-props", JSON.stringify(props));
  window.location.href = "index98.html";
  window.parent.checkResults({
    currentScreen: currentScreen,
    correctAnswers: correctAnswers,
    wrongAnswers: wrongAnswers,
  });
console.log("currentScreen :", currentScreen);
console.log("Correct :", correctAnswers);
console.log("Wrong :", wrongAnswers);
pageCompt++;
}
