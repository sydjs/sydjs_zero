(function(){
    var resources = [
      "vendor/prismjs/prism.min.js",
      "vendor/micro/micro.min.js",
      "scripts/quiz.js",
      "scripts/tutorial.js",
    ];
    var head = document.head;
    var source = "https://sydjs.github.io/sydjs_zero/tutorial/"

    for (var resource in resources) {
      var element = document.createElement("script");
      element.src = source + resources[resource];
      head.appendChild(element);
    }
}());
