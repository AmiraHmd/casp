let props = {}
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let cron = 0;
let score = 0;
let questions = 1;

if(sessionStorage.getItem("timer-props") !== null){
    props = JSON.parse(sessionStorage.getItem("timer-props"));
    hour = props.hour;
    minute = props.minute;
    second = props.second;
    millisecond = props.millisecond;
    cron = props.cron;
    score = props.score;
    questions = props.questions;

    $("#recVrai").text(score);
    $('#rec').text(questions);
    
}


// commencer le compte
function start() {
    pause();
    cron = setInterval(() => { timer(); }, 1000);
}

// mettre en pause le compteur
function pause() {
    clearInterval(cron);
}

// remettre le compteur à 0
function reset() {
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    document.getElementById('hour').innerText = '00';
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
}

// definir le compteur
function timer() {

    //Ajoute la valeur de droite à la valeur de la variable de gauche, puis renvoie la nouvelle valeur de la variable
    if ((second += 1) == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
}

// retourne la donnée deja présente
function returnData(input) {
    return input >= 10 ? input : `0${input}`
}

start();