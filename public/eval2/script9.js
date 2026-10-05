//sweet alert
$('.alertText').click(function () {
  swal({
    text: "أَرَادَ عَادِلُ الَّذِي يَعِيشُ فِي السُّعُودِيَّةِ أَنْ يَزُورَ كَنَدَا فِي الشِّتَاءِ، فَسَأَلَ صَدِيقَهُ فَرِيدٌ الَّذِي يَعِيشُ فِي مَدِينَةِ تُورُنْتُو الْكَنَدِيَّةِ عَنِ الطَّقْسِ فِي كَنَدَا، كَيْ يَسْتَمْتِعَ بِرُؤْيَةِ الشَّلَّالَاتِ وَتَسَاقُطِ الثُّلُوجِ، فَأَخْبَرَهُ بِأَنَّ الطَّقْسَ فِي الشِّتَاءِ بَارِدٌ جِدًّا، حَيْثُ تَتَسَاقَطُ الثُّلُوجُ بِكَثْرَةٍ، وَالْحَرَارَةُ تَتَفَاوَتُ بَيْنَ الْارْتِفَاعِ وَالرُّطُوبَةِ، أَمَّا مَسَاحَتُهَا فَهْيَ كَبِيرَةٌ جِدًّا.",
    button: 'حسنا',
  });
});

//var
let tabrep = [];
let corrAns = ["rep1"];
let pageCompt=0;

//traduction
let traduction = $('.questTrad div');
function traduire(id) {
  $(traduction[0])[0].innerHTML = $('#' + id)[0].innerHTML;
}

// var compteur
let correctAnswers = sessionStorage.getItem('CA');
let wrongAnswers=sessionStorage.getItem('WA');
let currentScreen = 10;
console.log("currentScreen :", currentScreen);
console.log("Correct :", correctAnswers);
console.log("Wrong :", wrongAnswers);


//cliquer
function cliquer(id) {
  document.getElementById(id).style.background = '#4fb946';
  document.getElementById(id).style.borderRadius = '6px';
  if (tabrep.indexOf(id) === -1) {
    tabrep.push(id);
    console.log(tabrep);
  }
  else {
    document.getElementById(id).style.background = '';
    document.getElementById(id).style.borderRadius = '';
    deleteElement(id);
    console.log(tabrep);
  }
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

/*émettre un son*/
let s2 = document.getElementById("s2");
let audio10 = document.getElementById("audio10");


/*fonction son*/
s2.addEventListener('click', function () {
    audio10.play();
});

//verification
function showCorrection() {
  let correct = false;
  tabrep.forEach((element) => {
    if (corrAns.includes(element)) {
      correct = true
    }

  });

  if (tabrep.length === 1 && correct) {
    console.log('bravo');
    correctAnswers++;
    sessionStorage.setItem('CA', correctAnswers);
  }
  else {
    console.log('faux');
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
    window.location.href = "index10.html";
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
