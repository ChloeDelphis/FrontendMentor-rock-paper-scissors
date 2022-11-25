const rules = {
  init: function () {
    // Selects both button seerules and button cross
    const rulesBtnAndCross = document.querySelectorAll(
      ".seerules, .rules__cross"
    );
    for (btn of rulesBtnAndCross) {
      btn.addEventListener("click", () => {
        rules.displayRules();
        rules.darkenOthers();
      });
    }
  },

  /* Displays rules + Calls darkenOthers */
  displayRules: function () {
    const rulesElmnt = document.querySelector(".rules");
    rulesElmnt.classList.toggle("hidden");
  },

  /* Darkens others elements when rules is open */
  darkenOthers: function () {
    const everything = document.querySelectorAll("body > * :not(.rules *)");
    everything.forEach((element) => {
      element.classList.toggle("shaded");
    });
  },
};
