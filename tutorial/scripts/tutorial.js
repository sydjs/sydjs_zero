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

        document.querySelector("#message").innerHTML = TTRL.ANSWER;
      },
    },
    console: {
      keyup: function (event) {
        var console = document.querySelector("#console");
        var input = console.innerHTML;

        console.innerHTML = TTRL.console.removeHighlight(input);
        // TTRL.console.prism(console);
      },
      prism: function (element) {
        Prism.highlightElement(element);
      },
      removeHighlight: function (innerHTML) {
        return innerHTML.replace(/<[^>]*>/g, '')
          .replace(/\s{2,}/g, ' ')
          .trim();
      },
    },
    validate: {
      processing: function (innerHTML) {
        if (TTRL.PROCESSING < 3) {
          TTRL.PROCESSING += 1;
          var ellipsis = "...";
          var progress = "validating" + ellipsis.substring(0, TTRL.PROCESSING);

          TTRL.logger(progress, true);

          setTimeout(TTRL.validate.processing, 250);

        } else {
          TTRL.PROCESSING = 0;
          TTRL.validate.validation();
        }
      },
      success: function () {
        TTRL.console.prism(document.querySelector("#console"));
      },
      test: function (event) {
        var answer = document.querySelector("#console").innerHTML;
        TTRL.RESPONSE = TTRL.console.removeHighlight(answer);
        TTRL.validate.processing();
      },
      validation: function (answer) {
        var correct = false;

        if (TTRL.RESPONSE === TTRL.ANSWER) {
          correct = true;
        } else {
          TTRL.logger("Not quite");
        }

        if (correct) {
          TTRL.console.prism(document.querySelector("#console"));
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
      // document.querySelector("#console").addEventListener("blur", TTRL.validate.input);
      // document.querySelector("#console").addEventListener("keyup", TTRL.console.keyup);
      document.querySelector("#test").addEventListener("click", TTRL.validate.test);
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
