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
