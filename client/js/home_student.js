var studentName1 = localStorage.getItem("studentname");
var studentName = JSON.parse(studentName1);

$(document).ready(function (e) {

    var html = "欢迎回来，" + window.studentName;

    document.getElementById("welcome").innerHTML = html;

    var imgNum = Math.floor(Math.random() * 5) + 1;

    var html = '<img src="images/img-' + imgNum + '.jpg" class="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co">';

    document.getElementById("joinImg").innerHTML = html;

    imgNum = imgNum % 6 + 1;

    var html = '<img src="images/img-' + imgNum + '.jpg" class="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co">';

    document.getElementById("checkImg").innerHTML = html;
});

function btn_onclick_logout_student() {
    window.location.href = "index.html";
}

function student_solve() {
    window.location.href = "join_student.html";
}

function student_check() {
    window.location.href = "view_student.html";
}