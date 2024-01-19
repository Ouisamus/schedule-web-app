// Draw header
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const header = document.querySelector('#header');
const SEMESTER = '202401';
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
    nowLine.setAttribute('id', 'nowLine')
    schedule.appendChild(nowLine);
    updateCurrentTime();

    // Update time line
    const intervalID = setInterval(updateCurrentTime, 2000);

    // Draw hour labels
    for (let i = 1; i <= period; i++) {
        let hourLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        drawHourLabel(hourLabel, i + 8, 3, 100 / period * i - 1, '#000');
        schedule.appendChild(hourLabel);
    }
    let verticalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    drawVertLine(verticalLine, 10, '#bbb', '0.5');
    schedule.appendChild(verticalLine);

    // Establish people & draw courses
    const courses = document.querySelector("#courses");
    if (courses) {
        // Establishing people & courseLists
        let people = new Array();
        let courseLists = new Array();
        people.push(new Person('Ryan', '#9b59b6'), new Person('Keys', '#388fc7'));
        courseLists.push([['ENGL101', '1002'], ['THET285', '0102'], ['ECON230', '0101'], ['ECON306', '0202'], ['PLCY213', '0201']]);
        courseLists.push([['CMSC132', '0202'], ['BSCI103', '1107'], ['MATH141', '0523'], ['COMM107', '9920']]);

        // Loading in courseLists to people objects
        loadAllCourseLists(courseLists).then(results => {
            // Pushes courses onto people
            results.map((courseList, index) => {
                courseList.map((courseObj) => {
                    people[index].courses.push(courseObj);
                });
            });
            // Drawing courses when done
            drawCourses(courses, people);
        });

        // Button event listeners
        document.getElementById('previousDayButton').addEventListener("click", function () { previousDay(courses, people) });
        document.getElementById('nextDayButton').addEventListener("click", function () { nextDay(courses, people) });
    }

}

function loadAllCourseLists(courseListsArr) {
    let peoplePromises = courseListsArr.map(courseList => loadCourseList(courseList));
    let allPromises = Promise.all(peoplePromises);
    return allPromises;
}

function loadCourseList(courseList) {
    let courseObjPromises = courseList.map(course => getCourseObj(course[0], course[1], '202401'));
    let allPromises = Promise.all(courseObjPromises);
    return allPromises;
}

function updateCurrentTime() {
    const line = document.getElementById('nowLine')
    let currentTime = new Date(Date.now());
    let opacity = currentTime.getDay() - 1 == weekday ? 1 : 0.3; // less opacity when it's not today
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

function drawCourses(courses, people) {
    let cols = people.length;
    if (cols > 0) {
        // If courses already exist, remove them
        while (courses.firstChild) { courses.removeChild(courses.lastChild); }

        // Draw courses
        people.forEach((person, i) => {
            person.courses.forEach((course) => {
                drawOneCourse(courses, course, i, cols, person.color);
            });
        });
    }
}

function drawOneCourse(courses, courseObj, col, totalCols, color) {
    courseObj.meetings.forEach((meeting) => {
        if (weekday == meeting.weekday) {
            let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            drawMeeting(rect, col, totalCols, meeting.start, meeting.end, color);
            courses.appendChild(rect);
        }
    });
}

function previousDay(courses, people) {
    if (weekday > 0) {
        weekday--;
        drawCourses(courses, people);
        document.getElementById('weekdayLabel').firstChild.nodeValue = daysOfWeek[weekday];
        updateCurrentTime();
    }
}

function nextDay(courses, people) {
    if (weekday < 4) {
        weekday++;
        drawCourses(courses, people);
        document.getElementById('weekdayLabel').firstChild.nodeValue = daysOfWeek[weekday];
        updateCurrentTime();
    }
}