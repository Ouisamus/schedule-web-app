const dayNums = new Map([['M', 0], ['Tu', 1], ['W', 2], ['Th', 3], ['F', 4]]);

function getCourseObj(course, section, semester) { // return type Course object or return false
    let courseURL = `https://app.testudo.umd.edu/soc/${semester}/sections?courseIds=${course}`;

    // Retrieve URL data using axios
    axios
        .get(courseURL)
        .then((response) => {
            let courseObj = new Course(course); // Creates course object
            response.data = response.data.replaceAll(/<img src=.*?>/g, ""); // removes all <img> tags to prevent missing file errors
            const coursePage = document.createElement('coursePage');
            coursePage.innerHTML = response.data.trim();
            let sectionInfo = coursePage.querySelector(`input[value="${section}"]`).parentNode // finds specific section from list
            let sectionTimes = sectionInfo
                .querySelector('.class-days-container')
                .querySelectorAll('.section-day-time-group');
            sectionTimes.forEach((row) => {
                if (row.querySelector('.section-days')) { // "See details on ELMS" and similar msgs are ignored

                    let dayString = row.querySelector('.section-days').innerText;
                    let startTime = row.querySelector('.class-start-time').innerText;
                    startTime = convertClockTimeToMins(startTime);
                    let endTime = row.querySelector('.class-end-time').innerText;
                    endTime = convertClockTimeToMins(endTime);

                    let days = new Array();
                    for (const char of dayString) {
                        if (char == char.toUpperCase()) {
                            days.push(char);
                        } else {
                            days[days.length - 1] += char;
                        }
                    }
                    for (const day of days) {
                        let m = new Meeting(startTime, endTime, dayNums.get(day));
                        courseObj.meetings.push(m);
                    }

                } // end if row has days
            }); // end for each row
            console.log(courseObj);
            return courseObj;
        })
        .catch((error) => {
            console.error(error);
            return false;
        });
}

let m1 = getCourseObj('ENES220', '0103', '202401')
console.log(m1);
// let m2 = getCourseObj('MATH007', '1201', '202401');

function convertClockTimeToMins(clockTime) { // converts clock time to minutes, 8:00am -> 480
    let arr = [...clockTime.matchAll(/(\d{1,2}):(\d{2})([ap]m)/gm)][0]; // arr[1] is hour, arr[2] is minute, arr[3] is am/pm
    arr[1] = Number.parseInt(arr[1]);
    arr[2] = Number.parseInt(arr[2]);
    let hour, ampm = arr[3];

    if (ampm == 'pm') {
        hour = arr[1] + 12;
    } else {
        hour = arr[1] == 12 ? 0 : arr[1];
    }
    let minute = arr[2];

    return hour * 60 + minute;
}

function convertMinsToClockTime(mins) { // converts minutes to clock time, 480 -> 8:00am
    if (mins >= 0 && mins <= 1439) {
        let ampm = mins < 720 ? 'am' : 'pm';

        let hour, minute = (mins % 60);
        if (mins - minute == 0) {
            hour = 12;
        } else {
            hour = (mins - minute) / 60;
            if (hour > 12) { hour -= 12; }
        }

        return `${hour}:${minute.toString().padStart(2, '0')}${ampm}`;
    }
}