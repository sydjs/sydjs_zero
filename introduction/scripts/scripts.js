"use strict";

(function(){
	const NTR = {
		STATE: {
			active: 0,
			instructions: null
		},
		animate: {
			back: function () {
				NTR.animate.cycle("<");
				NTR.animate.step();
			},
			cycle: function (direction) {
				if (direction === "<") {
					if (NTR.STATE.active === 0) {
						NTR.STATE.active = NTR.STATE.instructions - 1;
					} else {
						NTR.STATE.active -= 1;
					}
				} else if (direction === ">") {
					if (NTR.STATE.active + 1 === NTR.STATE.instructions) {
						NTR.STATE.active = 0;
					} else {
						NTR.STATE.active += 1;
					}
				}
			},
			key: function (key) {
				if (key === "ArrowRight") {
					NTR.animate.next();
				} else if (key === "ArrowLeft") {
					NTR.animate.back();
				}
			},
			next: function () {
				NTR.animate.cycle(">");
				NTR.animate.step();
			},
			step: function () {
				const element = document.querySelectorAll("nav li")[NTR.STATE.active];

				NTR.navigate(element);
			}
		},
		enhance: function () {
			document.querySelectorAll("a[rel='external']").forEach(function(element){
				element.setAttribute("target", "_blank");
			});

			NTR.STATE.instructions = document.querySelectorAll("section").length;
		},
		listen: function () {
			document.querySelectorAll("nav li").forEach(function(element){
				element.addEventListener("click", function(event){
					event.preventDefault();
					NTR.navigate(element)
				});
			});

			document.querySelectorAll("button").forEach(function(element){
				element.addEventListener("click", function(event){
					event.preventDefault();
					NTR.animate.back();
				});
			});

			document.querySelectorAll("input[type='button']").forEach(function(element){
				element.addEventListener("click", function(event){
					event.preventDefault();
					NTR.animate.next();
				});
			});

			document.querySelector("body").addEventListener("keyup", function(event){
				event.preventDefault();

				NTR.animate.key(event.key);
			});
		},
		navigate: function (element) {
			const items = document.querySelectorAll("nav li");
			const sections = document.querySelectorAll("section");
			const index = items.indexOf(element);

			items.forEach(function(element){
				element.classList.remove("active");
			});

			sections.forEach(function(element){
				element.classList.remove("active");
			});

			items[index].classList.add("active");
			sections[index].classList.add("active");
		},
		init: function () {
			this.enhance();
			this.listen();
		}
	}

	window.NTR = NTR;
	NTR.init();
}());
