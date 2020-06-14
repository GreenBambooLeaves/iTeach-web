function btn_onclick_login_student() {
    var email = document.getElementById("login_student_email").value;
    var password = document.getElementById("login_student_password").value;
    var v = email + "\n" + password;
    alert(v);


    axios.post("http://localhost:52433/api/users/login", {
            email: email,
            password: password
        })
        //{key:email,key2:name})
        .then(function (response) {
            if (response.data.status == "success") {
                window.localStorage.setItem("studentusertoken", JSON.stringify(response.data.token)); //永久存储
                //window.sessionStorage.setItem("usertoken",JSON.stringify(data));//页面内存储

                window.localStorage.setItem("studentid", JSON.stringify(response.data.id)); //存储id
                window.localStorage.setItem("studentname", JSON.stringify(response.data.name)); //存储id
                alert("登陆成功");
                window.location.href = "home_student.html";; //切换页面
            } else {
                alert("密码错误");
            }

        }, function (err) {
            var loginerr = "失去服务器响应";
            alert(loginerr);
        })
}