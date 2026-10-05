
//traduction
let traduction = $('.questTrad div');
function traduire(id) {
  $(traduction[0])[0].innerHTML = $('#' + id)[0].innerHTML;
}

// var compteur

let correctAnswers = sessionStorage.getItem('CA');
let wrongAnswers = sessionStorage.getItem('WA');
let CA = correctAnswers;
let WA = wrongAnswers;
let currentScreen = 93;

console.log('screen:',currentScreen);
console.log( 'correct:',CA);
console.log('Wrong:',WA);

//son
let s1 = document.getElementById("s1");
let audio1 = document.getElementById("audio1");

audio1.addEventListener('click', function () {
  s1.play();

});

let tabrep = [];
let vraireps = ['a1', 'a10', 'a25', 'a2'];
let box = $('.ltt');
let compt = 0;
let s = 0
let pageCompt = 0;
let vraiEx = 0;
var userAnswer = document.getElementById('ltt');


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
/*fonction cliquer*/

//fonction cliquer
function cliquer(id) {

  if (index < vraireps.length) {
      document.getElementById(id).style.color = "black";

      let word = userAnswer.innerText;
      word = word.replaceAt(index++, document.getElementById(id).innerText);
      console.log(word);
      userAnswer.innerText = word;
      tabrep.push(id);
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

function showCorrection() {
  for (let j = 0; j <= vraireps.length; j++) {
    if (tabrep.includes(vraireps[j]) && tabrep.indexOf(vraireps[j]) === vraireps.indexOf(vraireps[j])) {
        s++;
        console.log(s);
    }
}
if (s == 4 && tabrep.length == 4) {
  vraiEx++;
  console.log('bravo');
  CA++;
  sessionStorage.setItem('CA',CA);
}
else {
  console.log('faux');
  WA++;
  sessionStorage.setItem('WA',WA);   

}

}

function verification() {
  if (pageCompt % 2 == 0) {
    showCorrection();
}
    props = {
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      cron: cron,
    }
    sessionStorage.setItem("timer-props", JSON.stringify(props));

    window.location.href = "index94.html";
    window.parent.checkResults({
      currentScreen: currentScreen,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
    });

  console.log("currentScreen :", currentScreen);
  console.log("Correct :", correctAnswers);
  console.log("Wrong :", wrongAnswers);
}
