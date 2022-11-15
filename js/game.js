//! vérifier les let et const partout (dans les fonctions)

const game = {
  init: function () {
    // sessionStorage.setItem("score", this.score);
    // condition ? exprSiVrai : exprSiFaux

    game.showScore(),
      (choicesElmts = document.querySelectorAll(".container__game__circle"));

    for (choice of choicesElmts) {
      choice.addEventListener("click", game.playGame);
    }

    playAgainElmt = document.querySelector(".results__result__play-again");
    playAgainElmt.addEventListener("click", game.displayGame);
  },

  playGame(event) {
    gameElmt = document.querySelector(".container");
    console.log(gameElmt);
    gameElmt.classList.remove("hidden");

    resultsElmt = document.querySelector(".results");
    resultsElmt.classList.add("hidden");

    // Gets the choice picked by the user: color + shape
    let userColor = event.currentTarget.getAttribute("id");
    let userShape = event.currentTarget.dataset.shape;
    console.log("user color : " + userColor);
    console.log("user shape : " + userShape);

    // Gets the choice picked by the computer: color + shape
    let computerColor = game.computerPicks();
    let computerShape = document.querySelector("#" + computerColor).dataset
      .shape;
    console.log("computer color : " + computerColor);
    console.log("computer shape : " + computerShape);

    // Display choices
    game.displayChoices(userColor, userShape, computerColor, computerShape);

    // Compares choices and designates winner calls function to update score
    if (userShape === computerShape) {
      game.displayResult("Draw");
      console.log("Draw");
    } else if (
      (userShape === "paper" && computerShape === "scissors") ||
      (userShape === "rock" && computerShape === "paper") ||
      (userShape === "scissors" && computerShape === "rock")
    ) {
      game.displayResult("You lose");
      game.updateScore(-1);

      console.log("You lose");
    } else {
      game.displayResult("You win");

      game.updateScore(1);

      console.log("You win");
    }
  },

  // Makes computer pick a color
  computerPicks() {
    const choices = ["blue", "yellow", "red"];
    let computerPick = Math.floor(Math.random() * choices.length);
    // console.log("computer picks : " + choices[computerPick]);
    return choices[computerPick];
  },

  //! Initializes score
  showScore() {
    if (sessionStorage.getItem("score") == null) {
      sessionStorage.setItem("score", 0);
    }
    let score = parseInt(sessionStorage.getItem("score"));
    this.displayScore(score);
  },

  //! Updates score
  updateScore(a) {
    score = parseInt(sessionStorage.getItem("score"));
    console.log("score before = " + score);
    console.log("typeof = " + typeof score);

    score += a;
    console.log("score after = " + score);

    console.log("score = " + score);
    sessionStorage.setItem("score", score);
    this.displayScore(score);
  },

  //! Displays score
  displayScore(score) {
    scoreElmt = document.querySelector(".header__score__points");
    scoreElmt.innerText = score;
  },

  displayChoices(userColor, userShape, computerColor, computerShape) {
    // console.log("display choices est appelé");

    // hides game area
    gameElmt = document.querySelector(".container");
    gameElmt.classList.toggle("hidden");

    // displays results area
    resultsElmt = document.querySelector(".results");
    resultsElmt.classList.toggle("hidden");

    // user's choice: image + shape
    userCircleElmt = document.querySelector(
      ".results__choice__singular.user div"
    );
    userCircleElmt.classList.remove("red", "yellow", "blue");
    userCircleElmt.classList.add(userColor);

    userImgElmt = userCircleElmt.querySelector("img");
    userImgElmt.src = "images/icon-" + userShape + ".svg";

    // displays computer's choice: image + shape
    computerCircleElmt = document.querySelector(
      ".results__choice__singular.computer div"
    );
    console.log(computerCircleElmt);
    computerCircleElmt.classList.remove("red", "yellow", "blue");
    computerCircleElmt.classList.add(computerColor);
    computerImgElmt = computerCircleElmt.querySelector("img");
    computerImgElmt.src = "images/icon-" + computerShape + ".svg";
  },

  displayResult(result) {
    const resultElmt = document.querySelector(".results__result__text");
    resultElmt.innerText = result;
  },

  displayGame() {
    // displays game area
    gameElmt = document.querySelector(".container");
    gameElmt.classList.toggle("hidden");

    // hides results area
    resultsElmt = document.querySelector(".results");
    resultsElmt.classList.toggle("hidden");
  },
};
