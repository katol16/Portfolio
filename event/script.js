// event delegation
var container = document.querySelector("#container");
var asides = document.querySelectorAll(".first");
console.log(asides);

container.addEventListener("click", showPopup);

function showPopup(event) {
	var number = parseInt(event.target.dataset.number);
	asides[number].style.display = "block";
}

// drugi sposób
var btn2 = document.querySelectorAll(".btn2");
var asides2 = document.querySelectorAll(".second"); 

for ( var i=0; i<btn2.length; i++) {
	btn2[i].addEventListener("click", show(i));
}

function show(i) {
	return function() {
		asides2[i].style.display = "block";
	}
}