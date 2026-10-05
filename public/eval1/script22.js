
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
let currentScreen = 23;

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
let vraireps = ["alph2"];
let box = $('.ltt');
let compt = 0;
let s = 0
let vraiEx = 0;
let pageCompt = 0;
let iEx = 0;
let selectedId = "";

const options = document.querySelector('.exercice');
const option = options.querySelectorAll(".alphabet");

for (let i = 0; i < option.length; i++) {
  $(option[i]).data('indice', i);
  option[i].setAttribute("onclick", "optionSelected(this)");

}

function optionSelected(answer) {
  console.log(answer);

  if (tabrep.indexOf(answer.id) == -1) {
    if (answer.id !== selectedId) {
      tabrep.push(answer.id)
      document.getElementById(answer.id).style.color = 'red';
      $($('.ltt')[compt]).text($('#' + answer.id).text());
      if (selectedId !== "") {
        document.getElementById(selectedId).style.color = '';
        deleteElement(tabrep.indexOf(selectedId))
      }
      selectedId = answer.id;
    }
    else {
      document.getElementById(selectedId).style.color = '';
      deleteElement(tabrep.indexOf(selectedId));
      selectedId = '';
      $($('.ltt')[compt]).text('.');
    }
  } else {
    document.getElementById(answer.id).style.color = '';
    deleteElement(tabrep.indexOf(answer.id))
    selectedId = '';
    $($('.ltt')[compt]).text('.');
  }
  console.log(tabrep);
}

const deleteElement = (index) => {
  let arr = []
  tabrep.forEach((el) => {
    if (el !== tabrep[index]) {
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

    window.location.href = "index23.html";
    window.parent.checkResults({
      currentScreen: currentScreen,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
    });

  console.log("currentScreen :", currentScreen);
  console.log("Correct :", correctAnswers);
  console.log("Wrong :", wrongAnswers);
}
