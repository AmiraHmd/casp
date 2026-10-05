
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
let currentScreen = 39;

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
let vraireps = ["a13","a18"];
let box = $('.lettre');
let compt = 0;
let s = 0
let vraiEx = 0;
let pageCompt = 0;
let iEx = 0;



/*fonction cliquer*/

function cliquer(id)
 {
    console.log(compt);
    if (compt < 2) {
        //document.getElementById(id).style.color = "rgb(55,255,139)";
        tabrep.push(id);
        $($('.lettre')[compt]).text($('#' + id).text());
        compt++;
    }
    console.log(tabrep);
}
/*supprimer la lettre ajoutée à la case*/
function remove() {
    $(box[compt - 1]).text('');
    $('#' + tabrep[tabrep.length - 1]).css('color', 'black');
    tabrep.pop();
    if (compt > 0){
        compt--;
    console.log(tabrep);
}
}
function showCorrection() {
 for (let j = 0; j <= vraireps.length; j++) {
     if (tabrep.includes(vraireps[j]) && tabrep.indexOf(vraireps[j]) === vraireps.indexOf(vraireps[j])) {
         s++;
         console.log(s);
     }
 }
 if (s == 2 && tabrep.length == 2) {
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

    window.location.href = "index39.html";
    window.parent.checkResults({
      currentScreen: currentScreen,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
    });

  console.log("currentScreen :", currentScreen);
  console.log("Correct :", correctAnswers);
  console.log("Wrong :", wrongAnswers);
}
