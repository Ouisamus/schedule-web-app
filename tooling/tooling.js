const functionList = ["list_funcs()", "list_people()", "person(name - optional)", "add(course, section)", "load()", "exp()"];
const SEM_ID = prompt("Input semester ID for session");
let selectedPerson;
let people = new Map(); // maps names to Person objects

console.log("Welcome to the internal tooling for creating JSON files of people's schedules.");
list_funcs();

function list_funcs(){
    console.log("These are the functions you can call from the console:")
    functionList.forEach(function(fnName){
        console.log(fnName);
    });
}

function list_people(){
    console.log(people);
}

function person(name){
    if (name) {
        selectedPerson = name;
        if (!people.has(name)){
            people.set(name, new Person(name));
        }
        console.log("Changed person to");
    } else {
        console.log("Current person is");
    }
    console.log(selectedPerson);
}

function add(course, section){
    // Formats input
    course = course.toUpperCase()
    
    const c = getCourseObj(course, section, SEM_ID).then((c) => {
        people.get(selectedPerson).courses.push(c);
        console.log(`Added ${course}-${section} to ${selectedPerson}'s course list`)
    });
}

function exp(){
    console.log(Array.from(people.values()));
    console.log(JSON.stringify(Array.from(people.values())));
}