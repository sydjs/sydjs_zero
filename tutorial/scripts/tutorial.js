(function(){
  var TTRL = {
    ANSWER: null,
    QUESTION: null,
    RESPONSE: null,
    PROCESSING: 0,
    validate: {
      console: function (event) {
        // console.log(TTRL.validate.removeHighlight(event.target.innerHTML));
        TTRL.RESPONSE = TTRL.validate.removeHighlight(event.target.innerHTML);

        TTRL.validate.processing();
      },
      processing: function (innerHTML) {
        if (TTRL.PROCESSING < 3) {
          TTRL.PROCESSING += 1;
          var ellipsis = "...";
          var progress = "validating" + ellipsis.substring(0, TTRL.PROCESSING);

          TTL.logger(progress, true);

          setTimeout(TTRL.validate.processing, 500);

        } else {
          TTRL.PROCESSING = 0;
          TTRL.validate.validation(TTRL.RESPONSE);
        }
      },
      removeHighlight: function (innerHTML) {
        return innerHTML.replace(/<[^>]*>/g, '')
          .replace(/\s{2,}/g, ' ')
          .trim();
      },
      validation: function (answer) {
        var correct = false;

        if (answer === TTRL.ANSWER) {
          correct = true;
        } else {
          console.log("Not quite");
        }

        if (correct) {
          // turn on buttons
          console.log("SUCCESS");
        }

      },
    },
    listen: function () {
      document.querySelector("#console").addEventListener("blur", TTRL.validate.console);
    },
    loaded: function () {
      if (window.asyncLoaded) {
        TTRL.listen();
        TTRL.search();
        TTRL.quiz("q0");
        TTL.logger(true, true),
        console.timeEnd('loaded()');
      } else {
        console.timeEnd('still loading');
        setTimeout(TTRL.loaded,100);
      }
    },
    logger: function (message, clear) {
      clear && console.clear();

      console.log(message);
    },
    quiz: function (tag) {
      // receive a ?string or #tag, eventually

      TTRL.QUESTION = QUIZ[tag][0];
      TTRL.ANSWER = QUIZ[tag][1];
    },
    search: function () {
      // set the question we're at by reading a ? or # value from the URL
    },
    init: function () {
      console.time('loaded()');
      document.addEventListener('DOMContentLoaded', TTRL.loaded, false);
    }
  };

  window.TTRL = TTRL;
  TTRL.init();

}());
