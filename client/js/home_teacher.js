var teacherName1 = localStorage.getItem("teachername");
var teacherName = JSON.parse(teacherName1);

$(document).ready(function(e) {

    var html = "欢迎回来，" + window.teacherName;

    document.getElementById("welcome").innerHTML  =  html;

    var imgNum = Math.floor(Math.random() * 5) + 1;

    var html = '<img src="images/img-' + imgNum + '.jpg" class="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co">';

    document.getElementById("createImg").innerHTML  =  html;

    imgNum = imgNum % 6 + 1;

    var html = '<img src="images/img-' + imgNum + '.jpg" class="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co">';

    document.getElementById("checkImg").innerHTML  =  html;

});

function btn_onclick_logout_teacher() {
    window.location.href = "index.html";
}

function teacher_create() {
    window.location.href = "create_teacher.html";
}
/*
function teacher_check() {
    window.location.href = "view_teacher.html";
}
*/