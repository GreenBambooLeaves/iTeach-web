var questionnaire_amount;

var sessionIds = new Array(); //id
var sessionNums = new Array(); //题数
var sessionNames = new Array(); //问卷名
var sessionRemarks = new Array(); //问卷备注
var sessionMasterNames = new Array(); //创建人
/*
var questionnaire_amount = 4;
sessionIds[0] = "qwer";
sessionNums[0] = 7;
//sessionNames[0] = "幼儿园复习题";
sessionRemarks[0] = "很简单";
sessionMasterNames[0] = "TeacherA";
sessionIds[1] = "sdfc";
sessionNums[1] = 11;
//sessionNames[1] = "小学复习题";
sessionRemarks[1] = "不简单";
sessionMasterNames[1] = "TeacherA";
sessionIds[2] = "sdwe";
sessionNums[2] = 35;
//sessionNames[2] = "中学复习题";
sessionRemarks[2] = "不难";
sessionMasterNames[2] = "TeacherA";
sessionIds[3] = "yrtj";
sessionNums[3] = 5;
//sessionNames[3] = "大学复习题";
sessionRemarks[3] = "很难";
sessionMasterNames[3] = "TeacherA";
*/


$(document).ready(function (e) {
    var questionnaire_Amount = localStorage.getItem("tquestionnaire_amount");
    var questionnaireamount = JSON.parse(questionnaire_Amount);
    var session_name = localStorage.getItem("tsession_names");
    var session_names = JSON.parse(session_name);
    var session_num = localStorage.getItem("tsession_nums");
    var session_nums = JSON.parse(session_num);
    var session_remark = localStorage.getItem("tsession_remarks");
    var session_remarks = JSON.parse(session_remark);
    var session_id = localStorage.getItem("tsession_ids");
    var session_ids = JSON.parse(session_id);
    var html = "";

    var imgNum = Math.floor(Math.random() * 5) + 1;

    for (var i = 0; i < questionnaireamount; i++) {
        html += '<div class="col-md-3 col-sm-6 col-padding text-center">\
                 <a onclick="savei(' + i + ');btn_onclick_view_teacher()" class="work image-popup" style="background-image: url(images/img-' + imgNum + '.jpg);">\
                 <div class="desc">\
                 <h3>' + session_names[i] + '</h3>\
                 <span>问答号码:' + session_ids[i] + '</span>\
                 <span>题目总数:' + session_nums[i] + '</span>\
                 <span>问答备注:' + session_remarks[i] + '</span>\
                 </div>\
                 </a>\
                 </div>'

        imgNum = imgNum % 6 + 1;
    }

    document.getElementById("place").innerHTML = html;

});

function teacher_check() { //查看问卷

    let jsonusertoken = localStorage.getItem("teacherusertoken");
    let usertoken = JSON.parse(jsonusertoken);
    axios.defaults.headers.common['Authorization'] = usertoken;

    let jsonuserid = window.localStorage.getItem("teacherid");
    let userid = JSON.parse(jsonuserid);
    URL_viewSession = "http://localhost:52433/api/statistics/teacher/" + userid;
    axios.get(URL_viewSession, {
            params: {
                userId: userid
            }
        })
        .then(function (response) {
                if (response.data.status == "success") {
                    sessions = response.data.sessions;
                    questionnaire_amount = sessions.length;
                    for (let i = 0; i < questionnaire_amount; i++) {

                        sessionIds[i] = sessions[i]._id;
                        sessionNames[i] = sessions[i].name;
                        sessionNums[i] = sessions[i].numOfQuestion;
                        sessionRemarks[i] = sessions[i].remark;
                        sessionMasterNames[i] = sessions[i].masterId;

                    }
                    var questionnaire_amount = JSON.stringify(questionnaire_amount);
                    localStorage.setItem("tquestionnaire_amount", questionnaire_amount);
                    var session_names = JSON.stringify(sessionNames);
                    localStorage.setItem("tsession_names", session_names);
                    var session_nums = JSON.stringify(sessionNums);
                    localStorage.setItem("tsession_nums", session_nums);
                    var session_remarks = JSON.stringify(sessionRemarks);
                    localStorage.setItem("tsession_remarks", session_remarks);
                    var session_ids = JSON.stringify(sessionIds);
                    localStorage.setItem("tsession_ids", session_ids);
                    window.location.href = "view_teacher.html"; //切换窗口

                } else {
                    alert("错误");
                }
            },
            function (err) {
                alert("err");
            })
}
/*
function GX(){
    var html = "";

    var imgNum = Math.floor(Math.random() * 5) + 1;
    alert(window.questionnaire_amount);
    for (var i = 0; i < window.questionnaire_amount; i++) {
        html += '<div class="col-md-3 col-sm-6 col-padding text-center">\
                 <a onclick="btn_onclick_view_teacher(' + i + ')" class="work image-popup" style="background-image: url(images/img-' + imgNum + '.jpg);">\
                 <div class="desc">\
                 <h3>' + sessionNames[i] + '</h3>\
                 <span>问答号码:' + sessionIds[i] + '</span>\
                 <span>题目总数:' + sessionNums[i] + '</span>\
                 <span>问答备注:' + sessionRemarks[i] + '</span>\
                 </div>\
                 </a>\
                 </div>'

        imgNum = imgNum % 6 + 1;
    }
    
    document.getElementById("place").innerHTML  =  html;
    alert("gx111");
    window.location.href = "view_teacher.html";    //切换窗口
}
*/
function savei(i) {
    var session_id = localStorage.getItem("tsession_ids");
    var session_ids = JSON.parse(session_id);
    var q_sessionid = JSON.stringify(session_ids[i]);
    localStorage.setItem("teachersessionid", q_sessionid);
    var q_index = JSON.stringify(i);
    localStorage.setItem("teacherindex", q_index);
}
/*
function btn_onclick_view_teacher(index) {
    alert(sessionIds[index]);

    window.location.href = "check_teacher.html";
}
*/