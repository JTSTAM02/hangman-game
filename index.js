
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");
const categorySelect = document.getElementById("categorySelect");

categorySelect.addEventListener("change", function () {
  const selectedCategoryIndex = parseInt(categorySelect.value);
  setAnswer(selectedCategoryIndex);
});

//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

const question = [
  "The Category Is NBA Teams",
  "The Category Is Films",
  "The Category Is Cities",
  "The Category Is Historical Figures"
];

const categories = [
  [
    "celtics",
    "lakers",
    "grizzlies",
    "mavericks",
    "warriors",
    "cavaliers",
    "magic"
  ],
  ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws", "forrest-gump", 'inception'],
  ["manchester", "milan", "madrid", "amsterdam", "prague", "louisville", 'lexington', 'frankfort', 'versailles', 'san-diego', 'sacremento', 'omaha', 'los-angeles'],
  ['abraham-lincoln', 'george-washington', 'harry-truman', 'joan-of-arc', 'jesus']
];

const hints = [
  [
    "Based in Boston",
    "Based in Los Angeles",
    "Underrated squad in the Western Conference",
    "Luke Magic",
    "Splash Brothers",
    "Have a love/hate relationship with LeBron James",
    "Star player recently won Rookie of the Year"
  ],
  [
    "Science-Fiction horror film",
    "1971 American action film",
    "Historical drama",
    "Animated Fish",
    "Giant great white shark",
    "Classic film involving comedy, drama, history, and running",
    "Modern hit with Leonardo DiCaprio"
  ],
  [
    "Northern city in the UK",
    "Home of AC and Inter",
    "Spanish capital",
    "Netherlands capital",
    "Czech Republic capital",
    "Hometown of Muhammad Ali",
    "Horse Capital of the World",
    "Capital of Kentucky",
    "Small town named after French city",
    "Beautiful weather year round",
    "Known for the Gold Rush",
    "Peyton Manning's favorite word",
    "One of the largest cities in the entire United States"
  ],
  ["Great American Leaderr during the Civil War",
"Great military leader and President",
"Led the United States after World War Two",
"Great military leader with major historical significance",
"Founder of largest religion on Earth"]
];


function setAnswer(selectedCategoryIndex) {
  const chosenCategory = categories[selectedCategoryIndex];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[selectedCategoryIndex];

  answer = chosenWord;
  hint = hints[selectedCategoryIndex][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord); // Update the display
}


function generateAnswerDisplay(word) {
  wordDisplay = []; // Clear the previous word display
  var wordArray = word.split("");
  for (var i = 0; i < word.length; i++) { // Use word.length instead of answer.length
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}


function showHint() {
  containerHint.innerHTML = `Clue - ${hint}`;
}

buttonHint.addEventListener("click", showHint);
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Clue -`;
  livesDisplay.innerHTML = `You have ${life} lives!`;
  setAnswer(0);
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  categorySelect.value="0";
}


window.onload = init();

buttonReset.addEventListener("click", init);

function guess(event) {
  const guessWord = event.target.id;
  const buttonId = document.getElementById(guessWord); // Get the button element
  if (buttonId.disabled) {
    return
  };
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `YOU WIN!`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `You have ${life} lives!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `You have ${life} life!`;
      } else {
        livesDisplay.innerHTML = `GAME OVER!`;
      }
      buttonId.disabled = true;

      if (answer === winningCheck) {
        livesDisplay.innerHTML = `YOU WIN!`;
        return;
      }
    } else {
      return;
    }
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `YOU WIN!`;
      return;
    }
  }
}


container.addEventListener("click", guess);

// Hangman
function animate() {
  drawArray[life]();
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];