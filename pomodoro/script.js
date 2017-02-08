let isRunning;
let tick;
let clockStatus = "Session";
let runFlag;
let audio = new Audio("Alarm-clock-sound-short.mp3");

$(document).ready(function() {
  $("#break_val").html("5");
  $("#sess_val").html("4");
  $("#timermin").html("4");
  $("#timersec").html("0");
  $("#clock").on("click", timer_click);
  enableEvents();
});

function enableEvents() {
  $("#sess_inc").on("click", inc_sess);
  $("#sess_dec").on("click", dec_sess);
  $("#break_inc").on("click", inc_break);
  $("#break_dec").on("click", dec_break);
}

function disableEvents() {
  $("#sess_inc").off("click");
  $("#sess_dec").off("click");
  $("#break_inc").off("click");
  $("#break_dec").off("click");
}

function inc_sess() {
  let sess = $("#sess_val");
  if(parseInt(sess.html()) == 10){
    return;
  }
  sess.html(parseInt(sess.html()) + 1);
  $("#timermin").html(sess.html());
}

function dec_sess() {
  let sess = $("#sess_val");
  if(parseInt(sess.html()) == 1){
    return;
  }
  sess.html(parseInt(sess.html()) - 1);
  $("#timermin").html(sess.html());
}

function inc_break() {
  let brk = $("#break_val");
  if(parseInt(brk.html()) == 10){
    return;
  }
  brk.html(parseInt(brk.html()) + 1);
}

function dec_break() {
  let brk = $("#break_val");
  if(parseInt(brk.html()) == 1){
    return;
  }
  brk.html(parseInt(brk.html()) - 1);
}

function timer_click() {
  if (!isRunning) {
    disableEvents();
    runFlag = true;
    isRunning = true;
  } else {
    isRunning = false;
    runFlag = false;
    enableEvents();
    clearInterval(tick);
  }
  
  if(runFlag){
      startSessionClock(parseInt($("#sess_val").html()));
  }
}

let startSessionClock = (min) => {
  startClock(min, () => {
        clockStatus = "Break";
        clearInterval(tick);
        startBreakClock(parseInt($("#break_val").html()));
      });
}

let startBreakClock = (min) => {
  startClock(min, () => {
        clockStatus = "Session";
        clearInterval(tick);
        startBreakClock(parseInt($("#sess_val").html()));
      });
}

let startClock = (min, callback) => {
  $("#clocktext").html(clockStatus);
  let timermin = $("#timermin");
  let timersec = $("#timersec");
  timermin.html(min);
  timersec.html(0);
  tick = setInterval(() => {
    if(!runFlag){
      clearinterval(tick);
    }
    
    if(parseInt(timermin.html()) == 0 && parseInt(timersec.html()) == 0){
      audio.play();
      callback();
      return;
    }
    if(parseInt(timersec.html()) == 0){
      timersec.html(60);
      timermin.html(parseInt(timermin.html()) - 1);
    }
    timersec.html(parseInt(timersec.html()) - 1);
  }, 1000);
}