function btn_onclick_register_student() {
    var email = document.getElementById("register_student_email").value;
    var password = document.getElementById("register_student_password").value;
    var password1 = document.getElementById("register_student_passwordRepeat").value;
    var name = document.getElementById("register_student_name").value;
    var v = email + "\n" + password + "\n" + name;
    alert(v);
    if (password == password1) { //密码判断

        axios.post("http://localhost:52433/api/users/register", {
                email: email,
                name: name,
                password: password,
                classification: "student"
            })
            //{key:email,key2:name})
            .then(function (response) {
                if (response.data.status == "success") {
                    alert("注册成功");
                    window.location.href = "login_student.html";
                } else {
                    alert("已注册");
                }
            }, function (err) {
                var loginerr = "连接失败";
                alert(loginerr);
            })
    } else {
        alert("密码不一致");
    }

}