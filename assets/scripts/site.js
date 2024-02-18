// Draw header
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const header = document.getElementById('header');
const SEMESTER = '202401';
let weekday = (new Date(Date.now())).getDay() - 1;
weekday = weekday <= 4 && weekday >= 0 ? weekday : 0;
let colorPalette = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#FAEC54', '#b15928', '#999999'];
let numberOfHrs = 14;
let startHr = 8; // starts at 8am, few classes start before then

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
const schedule = document.getElementById('schedule');
const legend = document.getElementById('scheduleLegend');

if (schedule) {
    // Draw hour lines
    for (let i = 1; i < numberOfHrs; i++) {
        let hourLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        drawHorizLine(hourLine, 100 / numberOfHrs * i, '#bbb', '0.5');
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
    for (let i = 1; i <= numberOfHrs; i++) {
        let hourLabelL = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        drawHourLabel(hourLabelL, (i - 1) + startHr, 3, 100 / numberOfHrs * i - 4, '#000', true);
        schedule.appendChild(hourLabelL);
        let hourLabelR = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        drawHourLabel(hourLabelR, (i - 1) + startHr, 3, 100 / numberOfHrs * i - 4, '#000', false);
        schedule.appendChild(hourLabelR);
    }
    let verticalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    drawVertLine(verticalLine, 10, '#bbb', '0.5');
    schedule.prepend(verticalLine);
    let verticalLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    drawVertLine(verticalLine2, 190, '#bbb', '0.5');
    schedule.prepend(verticalLine2);

    // Establish allPeople & draw courses
    const courses = document.querySelector("#courses");
    if (courses) {
        // Establishing allPeople & courseLists
        let allPeople = new Array();
        let peopleToDraw = new Set();
        let courseLists = new Array();
        allPeople.push(new Person('Ryan'), new Person('Keys'), new Person('Willa'),
            new Person('Alphonse'), new Person('Kristin'), new Person('Ian'),
            new Person('Adib'), new Person('Eitan'), new Person('Jack'),
            new Person('Jacob'), new Person('Bryan'), new Person('Louisa'),
            new Person('Zach'));
        courseLists.push([ /* Ryan */['ENGL101', '1002'], ['THET285', '0102'], ['ECON230', '0101'], ['ECON306', '0202'], ['PLCY213', '0201']],
            /* Keys */[['CMSC132', '0202'], ['BSCI103', '1107'], ['MATH141', '0523'], ['COMM107', '9920']],
            /* Willa */[['CMSC132', '0202'], ['ARHU275', '0101'], ['MATH240', '0122'], ['ENGL101', '1101'], ['JOUR284', '0101']],
            /* Alphonse */[['CHEM237', '5355'], ['PHYS161', '0306'], ['BSCI223', '2401'], ['ENGL272', '0201'], ['BSCI223', '2401'], ['CHEM237', '5355'], ['MUSC229U', '0101']],
            /* Kristin */[['PHYS265', '0101'], ['CHEM135', '3127'], ['ENCE100', '0101'], ['ENGL272', '0201'], ['GEMS104', '0111'], ['GEMS102', '0101']],
            /* Ian */[['BIOE121', '0103'], ['MATH246H', '0201'], ['BIOE120', '0102'], ['BIOE241', '0102'], ['ENES100', '0402'], ['GEMS104', '0101'], ['GEMS102', '0101']],
            /* Adib */[['BIOE121', '0102'], ['MATH461', '0112'], ['PHYS161', '0303'], ['BIOE241', '0102'], ['ENES100', '0402'], ['BIOE120', '0102'], ['MUSC229U', '0101']],
            /* Eitan */[['HIST289A', '0103'], ['ENGL265', '0201'], ['COMM107', '6801'], ['JWST231', '0101'], ['JOUR284', '0101']],
            /* Jack */[['BMGT110S', '0101'], ['THET110', '0107'], ['CMSC132', '0205'], ['THET380', '5501'], ['ENGL101S', '1309']],
            /* Jacob */[['STAT100', '0131'], ['ENGL265', '0201'], ['ARTT110', '0401'], ['ENGL272', '0201'], ['BSCI103', '1109']],
            /* Bryan */[['CMSC132', '0201'], ['MATH241', '0312'], ['MATH240', '0123'], ['NFSC220', '0101'], ['MUSC229U', '0101']],
            /* Louisa */[['CMSC132', '0105'], ['COMM107', '6801'], ['MATH461', '0133'], ['PSYC100', '0503'], ['THET377', '5501']],
            /* Zach */ [['MATH141', '0222'], ['ENGL101', '0503'], ['PHYS161', '0308'], ['FIRE198', '0116'], ['ENME272', '0501']]);

        // Loading in courseLists to allPeople objects
        loadAllCourseLists(courseLists).then(results => {
            // Pushes courses onto allPeople
            results.map((courseList, index) => {
                courseList.map((courseObj) => {
                    allPeople[index].courses.push(courseObj);
                });
            });
            // Sort allPeople array by name
            allPeople.sort((a, b) => a.name.localeCompare(b.name));

            // Add allPeople to legend
            drawLegend(allPeople);

            // Drawing courses when done with all people selected by default
            allPeople.map((p) => peopleToDraw.add(p.name));
            drawCourses(courses, allPeople, peopleToDraw);
        });

        // Button event listeners
        document.getElementById('previousDayButton').addEventListener("click", function () { previousDay(courses, allPeople, peopleToDraw) });
        document.getElementById('nextDayButton').addEventListener("click", function () { nextDay(courses, allPeople, peopleToDraw) });

        // Courses event listener, prints course info to console
        courses.addEventListener("click", function (event) {
            let target = event.target;
            console.log(`${target.getAttribute('data-person')}: ${target.getAttribute('data-course')}`);
        });

        // Legend event listener, adds/removes people from peopleToDraw set
        legend.addEventListener("click", function (event) {
            let target = event.target;
            let targetContainer = target.classList.contains("scheduleLegendRow") ? target : target.parentNode;
            if (targetContainer.classList.contains("scheduleLegendRow")) {
                let setItemState = targetContainer.classList.contains("grayout");
                legendSetItem(targetContainer, peopleToDraw, setItemState);
                drawCourses(courses, allPeople, peopleToDraw);
            }
         });

        // Legend selector event listeners
        // Select all people
        document.getElementById('selectAllButton').addEventListener("click", function () {
            for (legendItem of legend.children) {
                legendSetItem(legendItem, peopleToDraw, true);
            }
            drawCourses(courses, allPeople, peopleToDraw);
        });
        // Deselect all people
        document.getElementById('deselectAllButton').addEventListener("click", function () {
            for (legendItem of legend.children) {
                legendSetItem(legendItem, peopleToDraw, false);
            }
            drawCourses(courses, allPeople, peopleToDraw);
        });

    } // end if courses

} // end if schedule

function legendSetItem(targetContainer, peopleToDraw, setItemOnOff) {
    let name = targetContainer.children[1];
    if (name.innerText) { // checks if selected element has text
        name = name.innerText;
        if (setItemOnOff){ // set to On
            if (targetContainer.classList.contains("grayout")) { targetContainer.classList.remove("grayout") }
            if (!peopleToDraw.has(name)) { peopleToDraw.add(name) }
        } else { // set to Off
            if (!targetContainer.classList.contains("grayout")) { targetContainer.classList.add("grayout") }
            if (peopleToDraw.has(name)) { peopleToDraw.delete(name) }
        }
    }
}

function loadAllCourseLists(courseListsArr) {
    let allPeoplePromises = courseListsArr.map(courseList => loadCourseList(courseList));
    let allPromises = Promise.all(allPeoplePromises);
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
        drawHorizLine(line, (100 / (numberOfHrs * 60)) * (currentTime - 480), '#f00', '0.5', opacity);
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

function drawHourLabel(label, hour, size, y, color, isLeft) {
    if (hour <= 12) { // converts 24hr clock -> 12hr clock
        textNode = document.createTextNode(`${hour}:00`);
    } else {
        textNode = document.createTextNode(`${hour - 12}:00`);
    }
    label.appendChild(textNode);
    label.classList.add('hourLabel');
    label.setAttribute('font-size', size);
    label.setAttribute('font-family', 'helvetica');
    if (isLeft){
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('x', size * 3);
    } else {   
        label.setAttribute('text-anchor', 'start');
        label.setAttribute('x', 200 - size * 3);
    }
    label.setAttribute('y', `${y}%`);
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

function drawMeeting(rect, label, col, totalCols, person, meeting, course, personIndex) {
    let start = meeting.start;
    let end = meeting.end;

    // Square
    rect.setAttribute('x', `${100 / totalCols * col}%`);
    rect.setAttribute('y', `${(100 / (numberOfHrs * 60)) * (start - 480)}%`);
    rect.setAttribute('width', `${100 / totalCols}%`);
    rect.setAttribute('height', `${(100 / (numberOfHrs * 60)) * (end - start)}%`);
    rect.setAttribute('fill', colorPalette[personIndex % colorPalette.length]);
    rect.setAttribute('rx', 2); // rounded corners
    rect.classList.add('meeting');
    rect.setAttribute('data-person', person.name);
    rect.setAttribute('data-course', course.name);
    rect.setAttribute('data-section', course.section);

    // // Label
    // label.appendChild(document.createTextNode(course.name + ' (' + course.section + ')'));
    // label.setAttribute('x', `${100 / totalCols * col + 0.25}%`);
    // label.setAttribute('y', `${(100 / (numberOfHrs * 60)) * (start - 480) + 2}%`);
    // label.classList.add('meetingLabel');
}

function drawCourses(courses, allPeople, peopleToDraw) {
    let cols = peopleToDraw.size;
    // If courses already exist, remove them
    while (courses.firstChild) { courses.removeChild(courses.lastChild); }

    if (cols > 0) {
        // Draw courses if person is in peopleToDraw set
        let col = 0;
        allPeople.forEach((person, index) => {
            if (peopleToDraw.has(person.name)) {
                person.courses.forEach((course) => {
                    drawOneCourse(courses, course, person, col, cols, index);
                });
                col++;
            }
        });
    }
}

function drawOneCourse(courses, course, person, col, totalCols, personIndex) {
    course.meetings.forEach((meeting) => {
        if (weekday == meeting.weekday) {
            let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            let label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            drawMeeting(rect, label, col, totalCols, person, meeting, course, personIndex);
            courses.appendChild(rect);
            courses.appendChild(label);
        }
    });
}

function previousDay(courses, allPeople, peopleToDraw) {
    if (weekday > 0) {
        weekday--;
        drawCourses(courses, allPeople, peopleToDraw);
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

function nextDay(courses, allPeople, peopleToDraw) {
    if (weekday < 4) {
        weekday++;
        drawCourses(courses, allPeople, peopleToDraw);
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

function drawLegend(allPeople) {
    // If legend entries already exist, remove them
    while (legend.firstChild) { legend.removeChild(legend.lastChild); }

    allPeople.forEach((person, index) => {
        let color = colorPalette[index % colorPalette.length];
        // Create item
        let legendEntry = document.createElement('li');
        legendEntry.classList.add('scheduleLegendRow');
        // Create colored square
        let colorSquare = document.createElement('span');
        colorSquare.classList.add('colorSquare');
        colorSquare.setAttribute('style', `display: inline-block; background: ${color}`);
        legendEntry.append(colorSquare);
        // Create text
        let legendEntryText = document.createElement('p');
        legendEntryText.innerText = person.name;
        legendEntry.append(legendEntryText);
        legend.append(legendEntry);
    });
}