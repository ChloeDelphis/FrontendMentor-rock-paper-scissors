const game = {
  init: function () {
    const paperElmt = document.querySelector("#blue");
    const scissorsElmt = document.querySelector("#yellow");
    const rockElmt = document.querySelector("#red");

    paperElmt.addEventListener("click", game.playGame);
    scissorsElmt.addEventListener("click", game.playGame);
    rockElmt.addEventListener("click", game.playGame);

    // sessionStorage.setItem("score", "0");
  },

  playGame(event) {
    // Gets the choice picked by user
    let = userChoice = event.currentTarget.getAttribute("id");
    console.log("user picked : " + userChoice);

    // Computer picks a choice
    let computerPick = game.computerPicks();
    console.log("computer picked : " + computerPick);

    // Display choices
    game.displayChoices(userChoice, computerPick);

    // Compares choices and designates winner calls function to update score
    if (userChoice === computerPick) {
      console.log("Draw");
      //   game.draw();
    } else if (
      (userChoice === "blue" && computerPick === "yellow") ||
      (userChoice === "red" && computerPick === blue) ||
      (userChoice === "yellow" && computerPick === "red")
    ) {
      console.log("You lose");
      //   game.userLoses();

      return "You lose";
    } else {
      console.log("You win");
      //   game.updateScore(1);
      //   game.userWins();
      return "You win";
    }
  },

  //   draw() {
  //     game.updateScore(0);
  //   },

  //   userWins() {
  //     game.updateScore(1);
  //   },

  //   userLoses() {
  //     game.updateScore(-1);
  //   },

  // Makes computer pick a color
  computerPicks() {
    const choices = ["blue", "yellow", "red"];
    let computerPick = Math.floor(Math.random() * choices.length);
    // console.log("computer picks : " + choices[computerPick]);
    return choices[computerPick];
  },

  // Updates score
  //   updateScore(a) {
  //     let score = score + a;
  //   },

  displayChoices(userChoice, computerPick) {
    console.log("display choices est appelé");

    // hides game area
    gameElmt = document.querySelector(".container");
    gameElmt.classList.toggle("hidden");

    // displays results area
    resultsElmt = document.querySelector(".results");
    resultsElmt.classList.toggle("hidden");

    // displays user's choice
  },
};
