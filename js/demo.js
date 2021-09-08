var listCoursesBlock = document.getElementById("list-courses")

var coursesApi = 'http://localhost:3000/courses'


function start() {
    getCourses(function(courses) {
        console.log(courses)
    })
}

start();


//Functions
function getCourses(callback) {
    fetch(coursesApi)
        .then(function (respone) {
            return respone.json();
        })
        .then(callback)
}