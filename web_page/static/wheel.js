var circle = document.getElementById("circle");

//mouse live coordinates
document.onmousemove = function(e){
document.getElementById("x").innerHTML = "x: "+e.clientX;
document.getElementById("y").innerHTML = "y: "+e.clientY;

//circle center coordinates
var r = circle.offsetWidth/2;
var x_circle = circle.getBoundingClientRect().left + r;
var y_circle = circle.getBoundingClientRect().top + r;

//calculation of rotation angle
var x = e.clientX - x_circle;
var y = e.clientY - y_circle;
deg = Math.atan(-x/y);
console.log(deg*180/Math.PI);

//rotate_wheel(deg);
document.getElementById("circle").style.transform = "rotate("+deg*180/Math.PI+"deg)";
};
