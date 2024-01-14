const period = 12;
var screen;
screen = document.querySelector("#screen");

if (screen) {
   console.log(screen.height);
   for(let i=1; i<period; i++){
        let division = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        createLine(division,100/period*i,'#bbb','0.5');
        screen.appendChild(division);
    } // for
    
} // if (screen)


function createLine(shape,y,color,size){
    shape.setAttribute('x1','0');
    shape.setAttribute('x2','100');
    shape.setAttribute('y1',y);
    shape.setAttribute('y2',y);
    shape.setAttribute('stroke',color);
    shape.setAttribute('stroke-width',size);
}