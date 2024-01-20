// Draw header
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const header = document.getElementById('header');
const SEMESTER = '202401';
let weekday = (new Date(Date.now())).getDay() - 1;

if (header) {
    // Weekday label
    const weekdayLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    drawWeekdayLabel(weekdayLabel, daysOfWeek[weekday], 10, '#000');
    header.appendChild(weekdayLabel);

    // Disables arrows if needed
    if (weekday == 0) {
        // Disable left arrow button
        document.getElementById('previousDayButton').classList.add('grayout');
    } else if (weekday == 4) {
        // Disable right arrow button
        document.getElementById('nextDayButton').classList.add('grayout');

    }
}

// Draw schedule
const period = 12;
const schedule = document.getElementById('schedule');

if (schedule) {
    // Draw hour lines
    for (let i = 1; i < period; i++) {
        let hourLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        drawHorizLine(hourLine, 100 / period * i, '#bbb', '0.5');
        schedule.prepend(hourLine);
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
    schedule.prepend(verticalLine);

    // Establish people & draw courses
    const courses = document.querySelector("#courses");
    if (courses) {
        // Establishing people & courseLists
        let people = new Array();
        let courseLists = new Array();
        people.push(new Person('Ryan', '#9b59b6'), new Person('Keys', '#388fc7'), new Person('Willa', '#8FAE53'),
            new Person('Alphonse', '#2ECC71'), new Person('Kristin', 'BA88F8'), new Person('Ian', '#37DFBE'));
        courseLists.push([['ENGL101', '1002'], ['THET285', '0102'], ['ECON230', '0101'], ['ECON306', '0202'], ['PLCY213', '0201']],
            [['CMSC132', '0202'], ['BSCI103', '1107'], ['MATH141', '0523'], ['COMM107', '9920']],
            [['CMSC132', '0202'], ['ARHU275', '0101'], ['MATH240', '0122'], ['ENGL101', '1101'], ['JOUR284', '0101']],
            [['CHEM237', '5355'], ['PHYS161', '0306'], ['BSCI223', '2401'], ['ENGL272', '0201'], ['BSCI223', '2401'], ['CHEM237', '5355']],
            [['PHYS265', '0101'], ['PHYS274', '0101'], ['PHYS275', '0201'], ['ENGL272', '0201'], ['GEMS104', '0111'], ['GEMS102', '0101']],
            [['BIOE121', '0104'], ['MATH246H', '0201'], ['BIOE120', '0201'], ['BIOE241', '0102'], ['ENES100', '0401'], ['GEMS104', '0101'], ['GEMS102', '0101']]);

        // Loading in courseLists to people objects
        loadAllCourseLists(courseLists).then(results => {
            // Pushes courses onto people
            results.map((courseList, index) => {
                courseList.map((courseObj) => {
                    people[index].courses.push(courseObj);
                });
            });
            // Sort people array by name
            people.sort((a, b) => a.name.localeCompare(b.name));
            // Drawing courses when done
            drawCourses(courses, people);
        });

        // Button event listeners
        document.getElementById('previousDayButton').addEventListener("click", function () { previousDay(courses, people) });
        document.getElementById('nextDayButton').addEventListener("click", function () { nextDay(courses, people) });

        // Courses event listener, prints course info to console
        courses.addEventListener("click", function (event) {
            let target = event.target;
            console.log(`${target.getAttribute('data-person')}: ${target.getAttribute('data-course')}`);
        });
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
    let opacity = currentTime.getDay() - 1 == weekday ? 1 : 0.4; // less opacity when it's not today
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

function drawMeeting(rect, col, totalCols, person, meeting, courseName, autoColor) {
    let start = meeting.start;
    let end = meeting.end;
    let color;

    if (autoColor) {
        color = 'hsl(0, 100%, 50%)';
    } else {
        color = person.color;
    }

    rect.setAttribute('x', `${100 / totalCols * col}%`);
    rect.setAttribute('y', `${(100 / 720) * (start - 480)}%`);
    rect.setAttribute('width', `${100 / totalCols}%`);
    rect.setAttribute('height', `${(100 / 720) * (end - start)}%`);
    rect.setAttribute('fill', color);
    rect.setAttribute('rx', 2); // rounded corners
    rect.classList.add('meeting');
    rect.setAttribute('data-person', person.name);
    rect.setAttribute('data-course', courseName);
}

function drawCourses(courses, people) {
    let cols = people.length;
    if (cols > 0) {
        // If courses already exist, remove them
        while (courses.firstChild) { courses.removeChild(courses.lastChild); }

        // Draw courses
        people.forEach((person, i) => {
            person.courses.forEach((course) => {
                drawOneCourse(courses, course, person, i, cols);
            });
        });
    }
}

function drawOneCourse(courses, course, person, col, totalCols) {
    course.meetings.forEach((meeting) => {
        if (weekday == meeting.weekday) {
            let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            drawMeeting(rect, col, totalCols, person, meeting, course.name);
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

        // Updating arrows to be grayed out or not
        let previousDay = document.getElementById('previousDayButton');
        let nextDay = document.getElementById('nextDayButton');
        if (nextDay.classList.contains('grayout')) {
            nextDay.classList.remove('grayout');
        } else if (weekday == 0) {
            previousDay.classList.add('grayout');
        }
    }
}

function nextDay(courses, people) {
    if (weekday < 4) {
        weekday++;
        drawCourses(courses, people);
        document.getElementById('weekdayLabel').firstChild.nodeValue = daysOfWeek[weekday];
        updateCurrentTime();

        // Updating arrows to be grayed out or not
        let previousDay = document.getElementById('previousDayButton');
        let nextDay = document.getElementById('nextDayButton');
        if (previousDay.classList.contains('grayout')) {
            previousDay.classList.remove('grayout');
        } else if (weekday == 4) {
            nextDay.classList.add('grayout');
        }
    }
}