(function(){
  var TTRL = {
    validate: {
      console: function (element) {
        alert(element.innerHTML);
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