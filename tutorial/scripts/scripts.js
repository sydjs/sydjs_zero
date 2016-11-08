(function(){
    console.time('loaded()');

    var resources = [
      "vendor/prismjs/prism.min.js",
      "vendor/micro/micro.min.js",
      "scripts/quiz.js",
    ];

    var initialise = "scripts/tutorial.js";

    var sources = function () {
      var uris = {
        file: "file:///Users/HOME/Development/projects/sydjs_zero/tutorial/",
        http: "https://sydjs.github.io/sydjs_zero/tutorial/"
      }

      return uris[window.location.protocol.substring(0, 4)];
    }

    var onload = function () {
      var source = sources();
      var loaded = function () {
        append(initialise);
      };

      var registered = 0;
      var register = function () {
        registered += 1;

        if (registered === resources.length) {
          loaded();
        }
      };

      var append = function (src) {
        var element = document.createElement("script");
        element.src = source + src;
        element.onload = register;
        body.appendChild(element);
      }

      for (var resource in resources) {
        append(resources[resource]);
      }
    }

    var body = null;
    var deferring = null;
    var defer = function () {
      if (document && document.body) {
        body = document.body;
        onload();
      } else {
        console.log("deferring -> ", deferring);
        deferring = setTimeout(defer, 250);
      }
    }

    defer();

}());
