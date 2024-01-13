const period = 5;
var screen;
screen = document.querySelector("#screen");

if (screen) {
   console.log(screen.height);
   for(let i=1; i<period; i++){
        var division = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        division.setAttribute('x1','0');
        division.setAttribute('x2','100');
        division.setAttribute('y1',100/period*i);
        division.setAttribute('y2',100/period*i);
        division.setAttribute('stroke','red');
        screen.appendChild(division);
    }
} // if (screen)

