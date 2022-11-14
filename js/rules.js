const rules = {
  init: function () {
    const rulesBtn = document.querySelector(".seerules");
    const rulesCross = document.querySelector(".rules__cross");
    rulesBtn.addEventListener("click", rules.displayRules);
    rulesCross.addEventListener("click", rules.displayRules);
  },

  displayRules: function () {
    const rulesElmnt = document.querySelector(".rules");
    rulesElmnt.classList.toggle("hidden");
  },
};
