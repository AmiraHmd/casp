//sweet alert
$('.alertText').click(function () {
  swal({
    text: "الحياة من دون أصدقاء حقيقيِين لا تُطاق، فما أعظم الصّداقة الحقيقيّة! لذلك يسعى كلّ فرد إلى أن يكون لديه صديق مخلص، ومن لا يرى في صديقه الوفاء لن يرى فيه تتمة لذاته وصفاته، ولن يكون مصدرًا لسعادته وبهجته، الّتي تحقق الألفة، وتوجد المحبة، ويقويهما الإيمان.  إنّ صدق العاطفة تتقاسم مع الصّديق أعباء الحياة والتّعاون على التّخلص من متاعبها ومصاعبها، وبذلك يصبح كلّ منهما مرآة لأخيه يرى فيها نفسه على حقيقتها. فهل الصّداقة حينئذ تحقق السّعادة؟",
    button: 'حسنا',
  });
});

//var
let tabrep = [];
let corrAns = ["rep2"];
let pageCompt=0;

//traduction
let traduction = $('.questTrad div');
function traduire(id) {
  $(traduction[0])[0].innerHTML = $('#' + id)[0].innerHTML;
}

// var compteur
let correctAnswers = sessionStorage.getItem('CA');
let wrongAnswers=sessionStorage.getItem('WA');
let currentScreen = 3;
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

    window.location.href = "index3.html";
    window.parent.checkResults({
      currentScreen: currentScreen,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
    });

  console.log("currentScreen :", currentScreen);
  console.log("Correct :", correctAnswers);
  console.log("Wrong :", wrongAnswers);
}
