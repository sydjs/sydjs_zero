(function(){
    var resources = [
      "vendor/prismjs/prism.min.js",
    ];
    var head = document.head;
    var source = "https://sydjs.github.io/sydjs_zero/tutorial/"

    for (var resource in resources) {
      var element = document.createElement("script");
      script.href = source + resources[resource];
      head.appendChild(script);
    }
}());
