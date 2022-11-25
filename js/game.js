//! vérifier les let et const partout (dans les fonctions)

const game = {
  init: function () {
    // console.log("init // calls playGame and showScore");

    // For each choice listens to the click and launches the game
    let choicesElmts = document.querySelectorAll(".container__game");
    for (choice of choicesElmts) {
      choice.addEventListener("click", game.playGame);
    }

    // Listens to the click on "play again" button and displays the board game
    const playAgainElmt = document.querySelector(
      ".results__result__play-again"
    );
    playAgainElmt.addEventListener("click", () => {
      game.switchBoards();
      game.reinitializeResultsBoard();
      // console.log("on appelle switchBoards pour passer");
    });

    // Initializes score
    game.showScore();
  },

  /* Gets the choices picked by the user and the computer */
  async playGame(event) {
    // console.log(
    //   "playGame // calls computerPicks / SwitchBOards / DisplayUserChoice / after timer displayComputerChoice et CompareChoice"
    // );

    // Gets the choice picked by the user: color + shape
    let userColor = event.currentTarget.getAttribute("id");
    let userShape = event.currentTarget.dataset.shape;
    // console.log("user color : " + userColor);
    // console.log("user shape : " + userShape);

    // Gets the choice picked by the computer: color + shape
    let computerColor = game.computerPicks();
    let computerShape = document.querySelector("#" + computerColor).dataset
      .shape;
    // console.log("computer color : " + computerColor);
    // console.log("computer shape : " + computerShape);

    // Calls switchBoards
    game.switchBoards();

    // Calls displayUserChoice
    game.displayUserChoice(userColor, userShape);

    // After a little time (2 reps of the dark-blue circle pulse animation)
    // Calls displayComputerChoice
    // console.log("start timer");

    await game.delay(3000);
    // console.log("délai de 3.6 secondes, j'appelle displayComputerChoice");
    game.displayComputerChoice(computerColor, computerShape);

    // Calls compareChoices
    // console.log("délai de 3.6 secondes, j'appelle compareChoices");
    game.compareChoices(userShape, computerShape);
  },

  /* Compares choices and designates winner
   Calls function to update score*/
  compareChoices(userShape, computerShape) {
    // console.log("Compare Choices // calls displayResult + upsateScore");
    if (userShape === computerShape) {
      game.displayResult("Draw");
      // console.log("Draw");
    } else if (
      (userShape === "paper" && computerShape === "scissors") ||
      (userShape === "rock" && computerShape === "paper") ||
      (userShape === "scissors" && computerShape === "rock")
    ) {
      game.displayResult("You lose");
      game.updateScore(-1);
      game.winnerHalo("comp");

      // console.log("You lose");
    } else {
      game.displayResult("You win");
      game.updateScore(1);
      game.winnerHalo("user");

      // console.log("You win");
    }
  },

  winnerHalo(winner) {
    let spanWinner = document.querySelector(".img-" + winner);
    spanWinner.classList.add("winner-halo");
    spanWinner.classList.add("animate");
  },

  /* Makes computer pick a color */
  computerPicks() {
    // console.log("computerPicks returns computerPick");
    const choices = ["blue", "yellow", "red"];
    let computerPick = Math.floor(Math.random() * choices.length);
    // console.log("computer picks : " + choices[computerPick]);
    return choices[computerPick];
  },

  /* Initializes score*/
  showScore() {
    // console.log("showScore");

    if (sessionStorage.getItem("score") == null) {
      sessionStorage.setItem("score", 0);
    }
    let score = parseInt(sessionStorage.getItem("score"));
    game.displayScore(score);
  },

  /* Updates score*/
  updateScore(a) {
    // console.log("updateScore // calls displayScore");

    // Gets score for session storage
    let score = parseInt(sessionStorage.getItem("score"));
    // console.log("score before = " + score);
    // console.log("typeof = " + typeof score);

    // Updates score
    score += a;
    // console.log("score after = " + score);

    // console.log("score = " + score);

    // Log updated score into session storage
    sessionStorage.setItem("score", score);

    // Calls displayscore
    game.displayScore(score);
  },

  /* Displays score*/
  displayScore(score) {
    // console.log("displayScore");
    scoreElmt = document.querySelector(".header__score__points");
    scoreElmt.innerText = score;
  },

  displayUserChoice(userColor, userShape) {
    // console.log(
    //   "displayUserChoice // calls waiting for Comp to remove dark-blue class"
    // );
    // user's choice: image + shape
    userCircleElmt = document.querySelector(".user .results__choice__logo");
    userCircleElmt.classList.remove("red", "yellow", "blue");
    userCircleElmt.classList.add(userColor);

    userImgElmt = userCircleElmt.querySelector("img");
    userImgElmt.src = "images/icon-" + userShape + ".svg";
    userImgElmt.alt = userShape + " logo";

    // On retire la classe dark-blue
    game.waitingForComp();
  },

  waitingForComp() {
    // console.log("waitingForComp adds/remove dark-blue class");
    // Add / Remove class dark-blue
    wrapperElmt = document.querySelector(
      ".results__choice__logo__wrapper-comp"
    );
    wrapperElmt.classList.toggle("dark-blue");
  },

  /* Returns a promise when timeout is done */
  delay(time) {
    // console.log("delay");
    return new Promise((resolve) => setTimeout(resolve, time));
  },

  displayComputerChoice(computerColor, computerShape) {
    // console.log("displayComputerChoice // calls waitingForComp");

    // Removes "dark-blue"
    game.waitingForComp();

    // Displays computer's choice: color + shadow + shape

    // Color + shadow
    const computerCircleElmt = document.querySelector(
      ".computer .results__choice__logo"
    );
    // console.log(computerCircleElmt);
    computerCircleElmt.classList.add(computerColor);
    computerCircleElmt.classList.add("shadow");

    // Image
    computerImgElmt = computerCircleElmt.querySelector("img");
    computerImgElmt.src = "images/icon-" + computerShape + ".svg";
    computerImgElmt.alt = computerShape + " logo";
  },

  /* Shows / hides the element for text result */
  resultShowHide() {
    // console.log("resultsShowHide toggle opaque and appear on results__result");
    // Remove / add class opaque
    // Remove / add class appear
    resultElmt = document.querySelector(".results__result");
    resultElmt.classList.toggle("opaque");
    resultElmt.classList.toggle("appear");
  },

  /* Writes down whether the user won */
  displayResult(result) {
    // Calls resultsShowHide to show results
    game.resultShowHide();

    // Writes the result
    const resultTxtElmt = document.querySelector(".results__result__text");
    resultTxtElmt.innerText = result;
  },

  reinitializeResultsBoard() {
    console.log(
      "reinitializeResultsBoard // calls resultShowHide (pour cacher : class opaque) + retire les classes couleur et ombres sur le logo computer"
    );

    game.resultShowHide();

    const computerCircleElmt = document.querySelector(
      ".computer .results__choice__logo"
    );
    computerCircleElmt.classList.remove("red", "yellow", "blue");
    computerCircleElmt.classList.remove("shadow");
    computerImgElmt = computerCircleElmt.querySelector("img");
    computerImgElmt.src = "";
    computerImgElmt.alt = "";

    const wrappers = document.querySelectorAll(
      ".results__choice__logo__wrapper-user, .results__choice__logo__wrapper-comp "
    );
    wrappers.forEach((element) => {
      element.classList.remove("winner-halo");
      element.classList.remove("animate");
    });
  },

  /* Switches between game board and results area */
  switchBoards() {
    // Hides / shows game area
    console.log("switchBoards // toggle hidden sur container + results");
    gameElmt = document.querySelector(".container");
    gameElmt.classList.toggle("hidden");

    // Hides / shows results area
    resultsElmt = document.querySelector(".results");
    resultsElmt.classList.toggle("hidden");
  },
};
