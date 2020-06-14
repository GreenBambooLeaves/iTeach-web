function btn_onclick_login_teacher() {
    //   window.location.href = "home_teacher.html";
    var email = document.getElementById("login_teacher_email").value;
    var password = document.getElementById("login_teacher_password").value;
    var v = email + "\n" + password;
    
   
   axios.post("http://localhost:52433/api/users/login",
    {email:email,password:password})
    //{key:email,key2:name})
    .then(function (response){
        if (response.data.status=="success") {
            window.localStorage.setItem("teacherusertoken",JSON.stringify(response.data.token));//永久存储
            //window.sessionStorage.setItem("usertoken",JSON.stringify(data));//页面内存储

            window.localStorage.setItem("teacherid",JSON.stringify(response.data.id));//存储id
            window.localStorage.setItem("teachername",JSON.stringify(response.data.name));//存储id
            alert("登陆成功");
            window.location.href = "home_teacher.html";//切换页面
        }
        else{
            alert("密码错误");
        }
   
    },function(err){
        var loginerr = "失去服务器响应";
        alert(loginerr);
    })
    //alert("sdjfoiwehhfidhsfu");
}