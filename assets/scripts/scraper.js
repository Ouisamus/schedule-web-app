const dayNums = new Map([['M', 0], ['Tu', 1], ['W', 2], ['Th', 3], ['F', 4]]);

function getCourseObj(course, section, semester) { // return type Course object or return false
    const dept = course.substring(0,4);
    return new Promise((resolve, reject) => {
        const deptURL = `https://waitlist-watcher.uk.r.appspot.com/raw/${semester}/${dept}/snapshots`;

        // Retrieve URL data using axios
        axios
            .get(deptURL)
            .then((response) => {
                const latestSnapshotURL = response.data.snapshots[response.data.snapshots.length-1].url;
                axios.get(latestSnapshotURL)
                .then((response) => {
                    let courseObj = new Course(`${course}-${section}`); // Creates course object
                    const sectionTimes = response.data[course].sections[section].meetings;
                    console.log(courseObj);
                    sectionTimes.forEach((row) => {
                        if (row.days && row.start && row.end){
                            let dayString = row.days;
                            let startTime = convertClockTimeToMins(row.start);
                            let endTime = convertClockTimeToMins(row.end);

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
                        }
                    }); // end for each row
                    resolve(courseObj);
                })
                .catch((error) => {
                    console.log(`error getting latest snapshot page for ${course} in ${dept}`);
                    reject(error);
             });
            })
            .catch((error) => {
                console.log(`error getting snapshots for ${course} in ${dept}`);
                reject(error);
            });
    });
}
function convertClockTimeToMins(clockTime) { // converts clock time to minutes, 8:00am -> 480
    let arr = [...clockTime.matchAll(/(\d{1,2}):(\d{2})([ap]m)/gm)][0]; // arr[1] is hour, arr[2] is minute, arr[3] is am/pm
    arr[1] = Number.parseInt(arr[1]);
    arr[2] = Number.parseInt(arr[2]);
    let hour, ampm = arr[3];

    if (ampm == 'pm') {
        hour = arr[1] == 12 ? 12 : arr[1] + 12;
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