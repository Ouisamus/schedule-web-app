class Meeting {
    constructor(start, end, weekday) {
        this.start = start;
        this.end = end;
        this.weekday = weekday; //0-4 corresponding to M-F
    }
}

class Course {
    constructor(name) {
        this.name = name;
        this.meetings = new Array();
    }
}

class Person {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.courses = new Array();
    }
}

// Draw header
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const header = document.querySelector('#header');
let weekday = (new Date(Date.now())).getDay() - 1;

if (header) {
    // Weekday label
    const weekdayLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    drawWeekdayLabel(weekdayLabel, daysOfWeek[weekday], 10, '#000');
    header.appendChild(weekdayLabel);
}

// Draw schedule
const period = 12;
const schedule = document.querySelector('#schedule');

if (schedule) {
    // Draw hour lines
    for (let i = 1; i < period; i++) {
        let hourLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        drawHorizLine(hourLine, 100 / period * i, '#bbb', '0.5');
        schedule.appendChild(hourLine);
    }

    // Create current time line
    const nowLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    updateCurrentTime(nowLine);
    schedule.appendChild(nowLine);

    // Update time line
    const intervalID = setInterval(updateCurrentTime, 2000, nowLine);

    // Draw hour labels
    for (let i = 1; i <= period; i++) {
        let hourLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        drawHourLabel(hourLabel, i + 8, 3, 100 / period * i - 1, '#000');
        schedule.appendChild(hourLabel);
    }
    let verticalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    drawVertLine(verticalLine, 10, '#bbb', '0.5');
    schedule.appendChild(verticalLine);

    // Draw weekday label

    // Establishing people and classes
    let people = new Array();

    // Ryan
    let ryan = new Person('Ryan', '#9b59b6');
    let course1 = new Course('ENGL101-1002');
    course1.meetings.push(new Meeting(480, 555, 1), new Meeting(480, 555, 3));
    let course2 = new Course('THET285-0102');
    course2.meetings.push(new Meeting(720, 830, 0), new Meeting(720, 830, 2));
    let course3 = new Course('ECON230-0101');
    course3.meetings.push(new Meeting(840, 915, 0), new Meeting(840, 915, 2));
    let course4 = new Course('ECON306-0202');
    course4.meetings.push(new Meeting(930, 1005, 0), new Meeting(930, 1005, 2), new Meeting(720, 770, 4));
    let course5 = new Course('PLCY213-0201');
    course5.meetings.push(new Meeting(930, 1005, 1), new Meeting(900, 1005, 3))
    ryan.courses.push(course1, course2, course3, course4, course5);
    people.push(ryan);

    // Keys
    let keys = new Person('Keys', '#388fc7');
    course1 = new Course('CMSC132-0202');
    course1.meetings.push(new Meeting(540, 590, 0), new Meeting(540, 590, 2), new Meeting(780, 830, 0), new Meeting(780, 830, 2), new Meeting(780, 830, 4));
    course2 = new Course('BSCI103-1107');
    course2.meetings.push(new Meeting(480, 650, 1), new Meeting(750, 825, 1), new Meeting(750, 825, 3));
    course3 = new Course('MATH141-0523');
    course3.meetings.push(new Meeting(840, 890, 0), new Meeting(840, 920, 1), new Meeting(840, 890, 2), new Meeting(840, 920, 3), new Meeting(840, 890, 4));
    course4 = new Course('COMM107-9920');
    course4.meetings.push(new Meeting(1020, 1095, 1), new Meeting(1020, 1095, 3));
    keys.courses.push(course1, course2, course3, course4, course5);
    people.push(keys);

    // Draw courses
    const courses = document.querySelector("#courses");
    drawCourses(courses, people, people.length);

    // Button event listeners
    document.getElementById('previousDayButton').addEventListener("click", function () { previousDay(courses, people) });
    document.getElementById('nextDayButton').addEventListener("click", function () { nextDay(courses, people) });

}

function updateCurrentTime(line) {
    let currentTime = new Date(Date.now());
    let opacity = currentTime.getDay() - 1 == weekday ? 1 : 0.3; // less opacity when it's not today"
    currentTime = currentTime.getHours() * 60 + currentTime.getMinutes();
    if (currentTime >= 480 && currentTime <= 1200) { // between 8am and 8pm?
        drawHorizLine(line, (100 / 720) * (currentTime - 480), '#f00', '0.5', opacity);
    }
}

function drawHorizLine(line, y, color, size, opacity) {
    line.setAttribute('x1', '0');
    line.setAttribute('x2', '100%');
    line.setAttribute('y1', `${y}%`);
    line.setAttribute('y2', `${y}%`);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', size);
    if (opacity) line.setAttribute('stroke-opacity', opacity);
}

function drawVertLine(line, x, color, size) {
    line.setAttribute('x1', x);
    line.setAttribute('x2', x);
    line.setAttribute('y1', '0');
    line.setAttribute('y2', '100%');
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', size);
}

function drawHourLabel(label, hour, size, y, color) {
    if (hour <= 12) { // converts 24hr clock -> 12hr clock
        textNode = document.createTextNode(`${hour}:00`);
    } else {
        textNode = document.createTextNode(`${hour - 12}:00`);
    }
    label.appendChild(textNode);
    label.setAttribute('font-size', size);
    label.setAttribute('font-family', 'helvetica');
    label.setAttribute('text-anchor', 'end');
    label.setAttribute('x', size * 3);
    label.setAttribute('y', `${y}%`);
    label.setAttribute('fill', color);
}

function drawWeekdayLabel(label, weekday, size, color) {
    textNode = document.createTextNode(weekday);
    label.appendChild(textNode);
    label.setAttribute('font-size', size);
    label.setAttribute('font-family', 'helvetica');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'central');
    label.setAttribute('x', '50%');
    label.setAttribute('y', '50%');
    label.setAttribute('fill', color);
    label.setAttribute('id', 'weekdayLabel');
}

function drawMeeting(rect, col, totalCols, start, end, color) {
    rect.setAttribute('x', `${100 / totalCols * col}%`);
    rect.setAttribute('y', `${(100 / 720) * (start - 480)}%`);
    rect.setAttribute('width', `${100 / totalCols}%`);
    rect.setAttribute('height', `${(100 / 720) * (end - start)}%`);
    rect.setAttribute('fill', color);
    rect.setAttribute('rx', 2); // rounded corners
}

function drawCourses(courses, people, cols) {;
    if (cols > 0) {
        // If courses already exist, remove them
        while(courses.firstChild){
            courses.removeChild(courses.lastChild);
        }

        // Draw courses
        people.forEach((person, i) => {
            person.courses.forEach((course) => {
                course.meetings.forEach((meeting) => {
                    if (weekday == meeting.weekday) {
                        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        drawMeeting(rect, i, cols, meeting.start, meeting.end, person.color);
                        courses.appendChild(rect);
                    }
                });
            });
        });
    }
}

function clearCourses(){

}

function previousDay(courses, people) {
    if (weekday > 0) {
        weekday--;
        drawCourses(courses, people, people.length);
    }
}

function nextDay(courses, people) {
    if (weekday < 4) {
        weekday++;
        drawCourses(courses, people, people.length);
    }
}