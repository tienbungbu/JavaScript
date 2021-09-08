
var coursesApi = 'http://localhost:3000/courses'


function start() {
    getCourses(renderCourses);

    handleCreateForm();
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

//THEM MOI

function createCourse(data,callback) {
    var options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body : JSON.stringify(data)
    }
    fetch(coursesApi,options)
            .then(function(respone){
                return respone.json();
            })
            .then(callback)
}

function handleCreateForm() {
    var createBtn = document.getElementById("createCourse")
    var nameCourse = document.getElementById('nameCourse')
    var descriptionCourse = document.getElementById('descriptionCourse')
    createBtn.onclick = function(){
        
        var formData ={
            name : nameCourse.value,
            description : descriptionCourse.value
        }
        createCourse(formData, function(){
            getCourses(renderCourses);
        });
    }
}
//Update
function updateCourse(id, data) {
    var options = {
     method: "PUT",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify(data)
    }

    fetch(coursesApi + "/" + id, options)
     .then(function (response) {
      return response.json();
     })
     .then(getCourses(renderCourses))
   }

   function handleUpdateCourse(id) {
    var createBtn = document.getElementById("createCourse")
    createBtn.innerHTML = 'Update'
    var name = document.getElementById('nameCourse')
    var description = document.getElementById('descriptionCourse')


    var nameCourseItem = document.getElementById('course-item-name-'+id).textContent
    var descriptionCourseItem = document.getElementById('course-item-description-'+id).textContent
    
    name.value = nameCourseItem
    description.value = descriptionCourseItem
     
    createBtn.onclick = function(){
        
        var data ={
            name : name.value,
            description : description.value
        }
        
        updateCourse(id,data)
    }
   }

//DELETE
function deleteCourse(id) {
    var options = {
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          }
    }
    fetch(coursesApi + '/' + id,options)
            .then(function(respone){
                return respone.json();
            })
            .then(function(){
                // getCourses(renderCourses);
              var courseItem =  document.getElementById('course-item-'+id)
              if(courseItem){
                courseItem.remove();
              }
            })
}


//RENDER
function renderCourses(courses) {
    var listCoursesBlock = document.getElementById("list-courses")

    var htmls = courses.map(function(course) {
        return `
        <li id="course-item-${course.id}"> 
            <h2 id= "course-item-name-${course.id}"> ${course.name} </h2>
            <p id= "course-item-description-${course.id}"> ${course.description} </p>
            <button onclick="deleteCourse(${course.id})" >Xóa</button>
            <button onclick="handleUpdateCourse(${course.id})" >Update</button>
        </li>
            `
    })

    listCoursesBlock.innerHTML = htmls.join('')
}

