const config = {
  gridSize: 5, // grid size = n x n
  numberOfFiles: 15, // number of different shapes
};

const resize = () => {
  let vh = window.innerHeight * 0.01;
  console.log(vh);
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

$(document).ready(() => {
  resize();
  $("#game").addClass("d-none");
  $("#timer").hide();
  sessionStorage.clear();
  sessionStorage.setItem("flip", false);
  document.body.style.justifyContent = "center";
});

document.addEventListener("resize", () => {
  resize();
});

var count = 0;

const flip = (index) => {
  if (sessionStorage.getItem("flip") === "false") {
    if (
      !document.getElementById(`card${index}`).classList.contains("is-flipped")
    ) {
      document.getElementById(`card${index}`).classList.add("is-flipped");
      if (sessionStorage.getItem("card") === null) {
        sessionStorage.setItem("card", 1);
        sessionStorage.setItem("flip", false);
      } else {
        sessionStorage.setItem(
          "card",
          parseInt(sessionStorage.getItem("card")) + 1
        );
        if (sessionStorage.getItem("card") !== "1") {
          sessionStorage.clear();
          sessionStorage.setItem("flip", true);
          var cardArr = [];
          var indexArr = [];
          for (
            var i = 0;
            i < document.getElementById("grid").children.length;
            i++
          ) {
            if (
              document
                .getElementById("grid")
                .children[i].getElementsByClassName("tile__inner")[0]
                .classList.contains("is-flipped")
            ) {
              cardArr.push(
                document
                  .getElementById("grid")
                  .children[i].getElementsByClassName("tile__inner")[0]
                  .getElementsByClassName("tile__face--back")[0]
                  .getElementsByTagName("img")[0]
                  .src.split("cards/")[1]
                  .split(".")[0]
              );
              indexArr.push(i);
            }
          }
          if (new Set(cardArr).size != cardArr.length) {
            for (var i of indexArr) {
              document
                .getElementById("grid")
                .children[i].getElementsByClassName("tile__inner")[0]
                .classList.remove("is-flipped");
              document
                .getElementById("grid")
                .children[i].getElementsByClassName("tile__inner")[0]
                .classList.add("flipped_perm");
              count++;
            }
            setTimeout(() => {
              if (count >= config.numberOfFiles * 2) {
                stopTimer();
              }
            }, 1000);
          }
          setTimeout(() => {
            for (
              var i = 0;
              i < document.getElementById("grid").children.length;
              i++
            ) {
              if (
                document
                  .getElementById("grid")
                  .children[i].getElementsByClassName("tile__inner")[0]
                  .classList.contains("is-flipped")
              ) {
                document
                  .getElementById("grid")
                  .children[i].getElementsByClassName("tile__inner")[0]
                  .classList.remove("is-flipped");
              }
            }
            sessionStorage.setItem("flip", false);
          }, 1000);
        }
      }
    }
  }
};

const start = () => {
  setInterval(startTimer, 10);
  document.body.style.justifyContent = "space-between";
  $("#timer").show();
  $("#start").addClass("d-none");
  $("#start").removeClass("d-flex");
  $("#game").removeClass("d-none");
  $("#game").addClass("d-flex");
  document.getElementById("grid").style.gridTemplateColumns = `repeat(${
    (config.numberOfFiles * 2) / config.gridSize
  }, 1fr)`;
  document.getElementById(
    "grid"
  ).style.gridTemplateRows = `repeat(${config.gridSize}, 1fr)`;
  var array = [];
  for (var j = 0; j < 2; j++) {
    for (var i = 1; i <= config.numberOfFiles; i++) {
      array.push(i);
    }
  }
  array = shuffleArray(array);
  for (var i = 0; i < config.numberOfFiles * 2; i++) {
    document.getElementById("grid").innerHTML += `
    <div class="tile">
      <div class="tile__inner"  id="card${i}" onClick="flip(${i})">
        <div class="tile__face tile__face--front">
          <h2>${i + 1}</h2>
        </div>
        <div class="tile__face tile__face--back">
          <img src="./src/cards/${array[i]}.png" />
        </div>
      </div>
    </div>`;
  }
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
let minutes = 00;
let seconds = 58;
let tens = 00;
const Minutes = document.querySelector(".mins");
const Seconds = document.querySelector(".seconds");
const Tens = document.querySelector(".tens");

function startTimer() {
  tens++;
  if (tens <= 9) {
    Tens.innerHTML = "0" + tens;
  }
  if (tens > 9) {
    Tens.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    Seconds.innerHTML = "0" + seconds;
    tens = 0;
    Tens.innerHTML = "0" + 0;
  }
  if (seconds > 9) {
    Seconds.innerHTML = seconds;
  }
  if (seconds > 59) {
    minutes++;
    Minutes.innerHTML = "0" + minutes;
    seconds = 0;
    Seconds.innerHTML = "0" + 0;
  }
  if (minutes > 9) {
    Minutes.innerHTML = minutes;
  }
}
