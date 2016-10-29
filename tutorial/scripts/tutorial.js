(function(){
  var TTRL = {
    validate: {
      console: function (event) {
        alert(event.target.innerHTML);
      }
    },
    listen: function () {
      document.querySelector("#console").addEventListener("blur", TTRL.validate.console);
    },
    init: function () {
      this.listen();
    }
  };

  window.TTRL = TTRL;
  TTRL.init();

}());
