(function(){
  var TTRL = {
    CURRENT: 0,
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

          TTRL.logger(progress, true);

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
          TTRL.logger("Not quite");
        }

        if (correct) {
          // turn on buttons
          TTRL.logger("SUCCESS");
        }

      },
    },
    current: function (current) {
      TTRL.CURRENT = current || 0;
    },
    listen: function () {
      document.querySelector("#console").addEventListener("blur", TTRL.validate.console);
    },
    logger: function (message, clear) {
      clear && console.clear();
      message && console.log(message);
    },
    quiz: function (tag) {
      // receive a ?string or #tag, eventually
      var current = tag || TTRL.CURRENT;
      TTRL.QUESTION = QUIZ[current][0];
      TTRL.ANSWER = QUIZ[current][1];
    },
    search: function () {
      if (window.location.search) {
        var query = window.location.search .substring(1);
        query = query.replace("\&amp;\gi", "&");




      }
      // set the question we're at by reading a ? or # value from the URL
    },
    loaded: function () {
      if (window.asyncLoaded) {
        TTRL.listen();
        TTRL.search();
        TTRL.quiz();
        TTRL.logger("", true),
        console.timeEnd('loaded()');
      } else {
        setTimeout(TTRL.loaded,100);
      }
    },
    init: function () {
      console.time('loaded()');
      document.addEventListener('DOMContentLoaded', TTRL.loaded, false);
    }
  };

  window.TTRL = TTRL;
  TTRL.init();

}());
