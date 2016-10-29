(function(){
  var TTRL = {
    ANSWER: null,
    QUESTION: null,
    validate: {
      console: function (event) {
        console.log(TTRL.validate.removeHighlight(event.target.innerHTML));
      },
      removeHighlight: function (innerHTML) {
        return innerHTML.replace(/<[^>]*>/g, '')
               .replace(/\s{2,}/g, ' ')
               .trim();
      },
      validate: function (answer) {
        var correct = false;

        if (answer === TTRL.ANSWER) {
          // turn on buttons
          console.log("SUCCESS");
        } else {
          console.log("Not quite");
        }
      },
    },
    listen: function () {
      document.querySelector("#console").addEventListener("blur", TTRL.validate.console);
    },
    quiz: function (tag) {
      // receive a ?string or #tag, eventually

      TTRL.QUESTION = QUIZ[tag][0];
      TTRL.ANSWER = QUIZ[tag][1];

      console.log(TTRL.ANSWER);
    },
    search: function () {
      // set the question we're at by reading a ? or # value from the URL
    },
    init: function () {
      function loaded() {
        TTRL.listen();
        TTRL.search();
        TTRL.quiz("q0");
      }

      console.time('loaded()');
      document.addEventListener('DOMContentLoaded', loaded, false);
    }
  };

  window.TTRL = TTRL;
  TTRL.init();

}());
