(function(){
    var resources = [
      "vendor/prismjs/prism.min.js",
      "vendor/micro/micro.min.js",
      "scripts/quiz.js",
      "scripts/tutorial.js",
    ];

    var head = document.head;
    var source = "https://sydjs.github.io/sydjs_zero/tutorial/";
    var registered = 0;
    var loaded = function () {
      registered += 1;

      if (registered === resources.length) {
        window.asyncLoaded = true;
      }
    };

    for (var resource in resources) {
      var element = document.createElement("script");
      element.src = source + resources[resource];
      element.onload = loaded;
      head.appendChild(element);
    }
}());
