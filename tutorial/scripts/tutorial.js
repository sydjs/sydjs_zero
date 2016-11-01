// console.timeEnd('loaded()');

(function(){
  var TTRL = {
    CURRENT: 0,
    ANSWER: null,
    QUESTION: null,
    RESPONSE: null,
    PROCESSING: 0,
    build: {
      current: function (current) {
        TTRL.CURRENT = current || 0;
        return TTRL.CURRENT;
      },
      quiz: function (tag) {
        var current = TTRL.build.current(tag.substring(1));

        TTRL.QUESTION = TTRL.QUIZ[current][0];
        TTRL.ANSWER = TTRL.QUIZ[current][1];

        console.log(TTRL.ANSWER)

      },
    },
    validate: {
      console: function (event) {
        TTRL.RESPONSE = TTRL.validate.removeHighlight(event.target.innerHTML);

        console.log(event)

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
    set: function (question) {
      question = "q" + (question || 0);
      question = question.replace(/qq/i, "q");
      question = question.replace(/question/i, "");

      TTRL.build.quiz(question);
    },

    logger: function (message, clear) {
      clear && console.clear();
      message && console.log(message);
    },
    listen: function () {
      console.log("listening");
      document.querySelector("#console").addEventListener("blur", TTRL.validate.console);
    },
    search: function () {
      if (window.location.search) {
        var search = window.location.search.substring(1);
        search = search.replace("\&amp;\gi", "&");
        var queries = search.split("&");

        for (var query in queries) {
          var keyvalue = queries[query].split("=");
          var key = keyvalue[0];
          var value = keyvalue[1];

          if (TTRL[key] && value) {
            TTRL[key](value);
          } else if(TTRL[key]) {
            TTRL[key];
          }
        }
      } else {
        TTRL.set(0);
      }
    },
    loaded: function () {
      this.listen();
      this.search();
    },
    init: function () {
      this.QUIZ = window.QUIZ;
      this.loaded();
    }
  };

  window.TTRL = TTRL;
  TTRL.init();

}());
