(function(){
  var TTRL = {
    validate: {
      console: function (event) {
        console.log(event.target.innerHTML);
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
