
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
let currentScreen = 92;

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
let vraireps = ["num2"];
let box = $('.numero');
let compt = 0;
let s = 0
let vraiEx = 0;
let pageCompt = 0;
let iEx = 0;


//fonction on click 
function cliquer(id) {
  document.getElementById(id).style.border = 'red 2px solid';
  if (tabrep.indexOf(id) === -1) {
    tabrep.push(id);
    console.log(tabrep);
  }
  else {
    document.getElementById(id).style.border = '';
    deleteElement(id);
    console.log(tabrep);
  }

}

const deleteElement = (id) => {
    let arr = []
    tabrep.forEach((el) => {
        if (el !== id) {
            arr.push(el);
        }
    });

    tabrep = arr;
}
function showCorrection() {
 for (let j = 0; j <= vraireps.length; j++) {
     if (tabrep.includes(vraireps[j]) && tabrep.indexOf(vraireps[j]) === vraireps.indexOf(vraireps[j])) {
         s++;
         console.log(s);
     }
 }
 if (s == 1 && tabrep.length == 1) {
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

    window.location.href = "index93.html";
    window.parent.checkResults({
      currentScreen: currentScreen,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
    });

  console.log("currentScreen :", currentScreen);
  console.log("Correct :", correctAnswers);
  console.log("Wrong :", wrongAnswers);
}
