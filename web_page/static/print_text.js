const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.font="40px Georgia";
//debugger;

canvas.style.width ='100%';
canvas.style.height='100%';
//canvas.width  = canvas.offsetWidth;
//canvas.height = canvas.offsetHeight;

var cw = canvas.width;
var ch = canvas.height;
var text = document.currentScript.getAttribute('one');
var counter = 0;
var interval = 50;
        
function print_text(){
    ctx.fillText(text.charAt(counter),0.1*cw+counter*30,0.2*ch );
    if (counter < text.length){
        counter++;
        sleep(interval);
        requestAnimationFrame(print_text);
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
        break;
        }
    }
}

requestAnimationFrame(print_text);
