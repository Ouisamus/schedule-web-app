const period = 12;
var screen;
screen = document.querySelector("#screen");

if (screen) {
    console.log(screen.height);
    // Draw hour lines
    for (let i = 1; i < period; i++) {
        let hourLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        drawLine(hourLine, 100 / period * i, '#bbb', '0.5');
        screen.appendChild(hourLine);
    }
    // Create current time line
    var nowLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    updateCurrentTime();
    screen.appendChild(nowLine);

    // Update time line
    const intervalID = setInterval(updateCurrentTime, 2000);

} // close if (screen)

function updateCurrentTime(){
    let currentTime = new Date(Date.now());
    currentTime = currentTime.getHours() * 60 + currentTime.getMinutes();
    if (currentTime >= 480 && currentTime <= 1200) { // between 8am and 8pm?
        drawLine(nowLine, (100/720)*(currentTime-480), '#f00', '0.5');
    }
}

function drawLine(line, y, color, size) {
    line.setAttribute('x1', '0');
    line.setAttribute('x2', '100');
    line.setAttribute('y1', y);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', size);
}