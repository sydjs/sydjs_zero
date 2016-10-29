(function(){
  var TTRL = {
    valdate: {
      console: function (element) {
        alert(element.innerHTML);
      }
    },
    listen: function () {
      document.querySelector("#console").addEventListener("blur", this.validate.console);
    },
    init: function () {
      this.listen();
    }
  };

  window.TTRL = TTRL;
  TTRL.init();

}());
