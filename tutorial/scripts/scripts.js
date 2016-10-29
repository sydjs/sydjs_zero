(function(){
    var resources = [
      "vendor/prismjs/prism.min.js",
    ];
    var head = document.head;

    for (var resource in resources) {
      var element = document.createElement("script");
      script.href = resources[resource];
      head.appendChild(script);
    }
}());
