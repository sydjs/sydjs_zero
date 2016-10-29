(function(){
  var TTRL = {
    validate: {
      console: function (event) {
        console.log(TTRL.validate.removeHighlight(event.target.innerHTML));
      },
      removeHighlight: function (innerHTML) {
        return innerHTML.replace(/<[^>]*>/g, '')
               .replace(/\s{2,}/g, ' ')
               .trim();
      }
    },
    listen: function () {
      document.querySelector("#console").addEventListener("blur", TTRL.validate.console);
    },
    init: function () {
      function loaded() {
        TTRL.listen();
        console.timeEnd('loaded()');
      }

      console.time('loaded()');
      document.addEventListener('DOMContentLoaded', loaded, false);
    }
  };

  window.TTRL = TTRL;
  TTRL.init();

}());
