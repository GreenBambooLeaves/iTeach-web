var question_amount;
var student_amount;
var comment_amount;

var question_title; //问卷标题

var questionClassifications = new Array(); //题型
var questionContents = new Array(); //题干
var questionOptions = new Array(); //选项
var questionTrueAnswers = new Array(); //正确答案
var questionAnswers = new Array(); //你的答案
var questionTrueOrFalses = new Array(); //是否正确
var studentNames = new Array(); //正确率降序排列学生名字
var studentRates = new Array(); //正确率降序排列正确率
var commentClassifications = new Array(); //评论人类型
var commentNames = new Array(); //评论人昵称
var commentContents = new Array(); //评论内容
/*
questionClassifications[0] = "single_choice";
questionClassifications[1] = "multiple_choice";
questionClassifications[2] = "answer";

questionContents[0] = "3+4=?";
questionContents[1] = "以下字母是大写字母的是";
questionContents[2] = "写出6-5的答案";

questionOptions[0] = "5,6,7,8";
questionOptions[1] = "A,B,c,D";
questionOptions[2] = "NULL";

questionTrueAnswers[0] = "7";
questionTrueAnswers[1] = "A,B,D";
questionTrueAnswers[2] = "1";

questionAnswers[0] = "7";
questionAnswers[1] = "B,c";
questionAnswers[2] = "1";

questionTrueOrFalses[0] = true;
questionTrueOrFalses[1] = false;
questionTrueOrFalses[2] = true;

studentNames[0] = "Student A";
studentNames[1] = "Student B";
studentNames[2] = "Student C";

studentRates[0] = "0.8";
studentRates[1] = "0.5";
studentRates[2] = "0.4";

commentClassifications[0] = "teacher";
commentClassifications[1] = "student";

commentNames[0] = "TeacherA";
commentNames[1] = "StudentA";

commentContents[0] = "同学们回答的不错";
commentContents[1] = "老师题出的不错";
*/



$(document).ready(function (e) {
    var question_Amount = localStorage.getItem("squestion_amount");
    var question_amount = JSON.parse(question_Amount);
    var student_Amount = localStorage.getItem("sstudent_amount");
    var student_amount = JSON.parse(student_Amount);
    var comment_Amount = localStorage.getItem("scomment_amount");
    var comment_amount = JSON.parse(comment_Amount);
    var question_Title = localStorage.getItem("squestion_title");
    var question_title = JSON.parse(question_Title);
    var _questionClassifications = localStorage.getItem("squestionClassifications");
    var questionClassifications = JSON.parse(_questionClassifications);
    var _questionContents = localStorage.getItem("squestionContents");
    var questionContents = JSON.parse(_questionContents);
    var _tquestionOptions = localStorage.getItem("squestionOptions");
    var questionOptions = JSON.parse(_tquestionOptions);
    var _studentNames = localStorage.getItem("sstudentNames");
    var studentNames = JSON.parse(_studentNames);
    var _studentRates = localStorage.getItem("sstudentRates");
    var studentRates = JSON.parse(_studentRates);
    var _commentClassifications = localStorage.getItem("scommentClassifications");
    var commentClassifications = JSON.parse(_commentClassifications);
    var _commentNames = localStorage.getItem("scommentNames");
    var commentNames = JSON.parse(_commentNames);
    var _commentContents = localStorage.getItem("scommentContents");
    var commentContents = JSON.parse(_commentContents);

    var _questionTrueAnswers = localStorage.getItem("squestionTrueAnswers");
    var questionTrueAnswers = JSON.parse(_questionTrueAnswers);
    var _questionAnswers = localStorage.getItem("squestionAnswers");
    var questionAnswers = JSON.parse(_questionAnswers);
    var _questionTrueOrFalses = localStorage.getItem("squestionTrueOrFalses");
    var questionTrueOrFalses = JSON.parse(_questionTrueOrFalses);


    var text = "&nbsp&nbsp" + question_title;

    document.getElementById('titledisplay').innerHTML = text;

    var html = "";

    for (var i = 0; i < question_amount; i++) {
        html += '<div id=Q_' + i + '></div>'
    }

    document.getElementById('placeQ').innerHTML = html;

    for (var index = 0; index < question_amount; index++) {
        switch (questionClassifications[index]) {
            case "single_choice":

                var option = questionOptions[index].split(",");
                var optiondiv = "";

                for (var i = 0; i < option.length; i++) {
                    optiondiv += '<div class="kzjxx_iteam">\
                    <input disabled="1" type="radio" class="dxk">\
                    <div>' + option[i] + '</div>\
                    </div>'
                }

                var CorrectDisplay = "<i style='font-size:20px;color:red;' class = 'icon-cross2'></i>";

                if (questionTrueOrFalses[index] == true) {
                    CorrectDisplay = "<i style='font-size:20px;color:green;' class = 'icon-check'></i>";
                }

                optiondiv += '<div class="kzjxx_iteam">\
                <div>正确答案:' + questionTrueAnswers[index] + '&nbsp&nbsp&nbsp&nbsp你的选择:' + questionAnswers[index] + '&nbsp&nbsp&nbsp&nbsp' + CorrectDisplay + '</div>\
                </div>'

                var html = '<div>\
                            <div>' + (index + 1) + "." + "【单选题】" + questionContents[index] + '</div><br>\
                            <div class="title_itram">' + optiondiv + '</div> </div><br>'

                document.getElementById("Q_" + index).innerHTML = html;

                break;

            case "multiple_choice":

                var option = questionOptions[index].split(",");
                var optiondiv = "";

                for (var i = 0; i < option.length; i++) {
                    optiondiv += '<div class="kzjxx_iteam">\
                    <input disabled="1" type="checkbox" class="dxk">\
                    <div>' + option[i] + '</div>\
                    </div>'
                }

                var CorrectDisplay = "<i style='font-size:20px;color:red;' class = 'icon-cross2'></i>";

                if (questionTrueOrFalses[index] == true) {
                    CorrectDisplay = "<i style='font-size:20px;color:green;' class = 'icon-check'></i>";
                }

                optiondiv += '<div class="kzjxx_iteam">\
                <div>正确答案:' + questionTrueAnswers[index] + '&nbsp&nbsp&nbsp&nbsp你的选择:' + questionAnswers[index] + '&nbsp&nbsp&nbsp&nbsp' + CorrectDisplay + '</div>\
                </div>'

                var html = '<div>\
                            <div>' + (index + 1) + "." + "【多选题】" + questionContents[index] + '</div><br>\
                            <div class="title_itram">' + optiondiv + '</div> </div><br>'

                document.getElementById("Q_" + index).innerHTML = html;

                break;

            case "answer":

                var CorrectDisplay = "<i style='font-size:20px;color:red;' class = 'icon-cross2'></i>";

                if (questionTrueOrFalses[index] == true) {
                    CorrectDisplay = "<i style='font-size:20px;color:green;' class = 'icon-check'></i>";
                }

                var html = '<div>\
                <div>' + (index + 1) + "." + "【简答题】" + questionContents[index] + '</div><br>\
                <div class="title_itram">\
                <div class="kzjxx_iteam">\
                <div>正确答案:' + questionTrueAnswers[index] + '&nbsp&nbsp&nbsp&nbsp你的回答:' + questionAnswers[index] + '&nbsp&nbsp&nbsp&nbsp' + CorrectDisplay + '</div>\
                </div>'

                document.getElementById("Q_" + index).innerHTML = html;

                break;
        }
    }

    var html = "";

    for (var i = 0; i < student_amount; i++) {
        html += '<div id=R_' + i + '></div>'
    }

    document.getElementById('placeR').innerHTML = html;

    for (var index = 0; index < student_amount; index++) {

        var html = '<div class="xxk_xzqh_box tktm">\
                <div class="title_itram">\
                <div class="kzjxx_iteam">\
                <div>' + (index + 1) + '. 昵称 : ' + studentNames[index] + '&nbsp&nbsp&nbsp&nbsp正确率:' + studentRates[index] + '</div>\
                </div>'

        document.getElementById("R_" + index).innerHTML = html;
    }

    var html = "";

    for (var i = 0; i < comment_amount; i++) {
        html += '<div id=C_' + i + '></div>'
    }

    document.getElementById('placeC').innerHTML = html;

    for (var index = 0; index < comment_amount; index++) {
        var classification = "";

        if (commentClassifications[index] == "teacher") {
            classification = "教师";
        } else {
            classification = "学生";
        }

        var html = '<div class="xxk_xzqh_box tktm">\
                <div class="title_itram">\
                <div class="kzjxx_iteam">\
                <div>' + classification + '-' + commentNames[index] + ' : ' + commentContents[index] + '</div>\
                </div>'

        document.getElementById("C_" + index).innerHTML = html;
    }


});

function btn_onclick_submit_comment() {
    var comment_text = $("input[id='check_student_comment']").val();

    alert(comment_text);

    window.location.href = "view_student.html";
}

function btn_onclick_back() {
    window.location.href = "view_student.html";
}

function btn_onclick_view_student() { //查看单个问卷详细
    var Index = localStorage.getItem("studentindex");
    var index = JSON.parse(Index);
    var sessionid = localStorage.getItem("studentsessionid");
    var sessionId = JSON.parse(sessionid);

    let jsonusertoken = localStorage.getItem("studentusertoken");
    let usertoken = JSON.parse(jsonusertoken);
    axios.defaults.headers.common['Authorization'] = usertoken;

    let jsonuserid = window.localStorage.getItem("studentid");
    let userId = JSON.parse(jsonuserid);
    var URL_checkSession = "http://localhost:52433/api/statistics/student/" + userId + "/" + sessionId;
    var URL_checkComment = "http://localhost:52433/api/comments/current/" + sessionId;
    var URL_checkStudentRank = "http://localhost:52433/api/statistics/sort/" + sessionId;

    axios.get(URL_checkSession, { //获取题目信息
            params: {
                userId: userId,
                sessionId: sessionId
            }
        })
        .then(function (response) {
                if (response.data.status == "success") {
                    alert(response.data.status);
                    var question_title = response.data.session.name; //问卷的名
                    questions = response.data.questions;
                    var sessionlength = questions.length; //问卷中的题目数量
                    for (let i = 0; i < sessionlength; i++) {
                        questionTrueOrFalses[i] = questions.trueorfalse; //正误
                        questionContents[i] = questions[i].content; //内容
                        questionClassifications[i] = questions[i].classification; //类型
                        if (questionClassifications[i] == "one-choice") {
                            questionClassifications[i] = "single_choice";
                            questionAnswers[i] = questions[i].answer[0]; //回答
                            questionTrueAnswers[i] = questions[i].trueAnswer[0]; //正确答案
                        } else if (questionClassifications[i] == "multi-choice") {
                            questionClassifications[i] = "multiple_choice";
                            questionAnswers[i] = questions[i].answer[0]; //回答
                            questionTrueAnswers[i] = questions[i].trueAnswer[0]; //正确答案
                            for (let j = 1; j < questions[i].trueAnswer.length; j++) {
                                questionTrueAnswers[i] = questionTrueAnswers[i] + "," + questions[i].trueAnswer[j];
                                questionAnswers[i] = questionAnswers[i] + "," + questions[i].answer[j];
                            }
                        } else {
                            questionClassifications[i] = "answer";
                            questionAnswers[i] = questions[i].answer[0]; //回答
                            questionTrueAnswers[i] = questions[i].trueAnswer[0]; //正确答案
                        }
                        if (questionClassifications[i] == "single_choice" || questionClassifications[i] == "multiple_choice") { //选项
                            questionOptions[i] = questions[i].option[0];
                            for (let j = 1; j < questions[i].option.length; j++) {
                                questionOptions[i] = questionOptions[i] + "," + questions[i].option[j];
                            }
                        }
                    }
                    var questionamount = JSON.stringify(sessionlength);
                    localStorage.setItem("squestion_amount", questionamount);
                    var questiontitle = JSON.stringify(question_title);
                    localStorage.setItem("squestion_title", questiontitle);
                    var question_Classifications = JSON.stringify(questionClassifications);
                    localStorage.setItem("squestionClassifications", question_Classifications);
                    var question_Contents = JSON.stringify(questionContents);
                    localStorage.setItem("squestionContents", question_Contents);
                    var question_Options = JSON.stringify(questionOptions);
                    localStorage.setItem("squestionOptions", question_Options);
                    var question_TrueAnswers = JSON.stringify(questionTrueAnswers);
                    localStorage.setItem("squestionTrueAnswers", question_TrueAnswers);
                    var question_Answers = JSON.stringify(questionAnswers);
                    localStorage.setItem("squestionAnswers", question_Answers);
                    var question_TrueOrFalses = JSON.stringify(questionTrueOrFalses);
                    localStorage.setItem("squestionTrueOrFalses", question_TrueOrFalses);




                    window.location.href = "check_student.html";
                } else {
                    alert("错误");
                }
            },
            function (err) {
                alert("err");
            })
    axios.get(URL_checkComment, { //获取评论信息
            params: {
                sessionId: sessionId
            }
        })
        .then(function (response) {
                if (response.data.status == "success") {
                    commentlength = response.data.comments.length;
                    for (let i = 0; i < commentlength; i++) {
                        commentNames[i] = response.data.comments[i].name;
                        commentContents[i] = response.data.comments[i].content;
                        commentClassifications[i] = response.data.comments[i].classification;
                    }
                    var commentamount = JSON.stringify(commentlength);
                    localStorage.setItem("scomment_amount", commentamount);
                    var comment_Names = JSON.stringify(commentNames);
                    localStorage.setItem("scommentNames", comment_Names);
                    var comment_Contents = JSON.stringify(commentContents);
                    localStorage.setItem("scommentContents", comment_Contents);
                    var comment_Classifications = JSON.stringify(commentClassifications);
                    localStorage.setItem("scommentClassifications", comment_Classifications);
                } else {
                    alert("错误");
                }
            },
            function (err) {
                alert("err");
            })
    axios.get(URL_checkStudentRank, {
            params: {
                sessionId: sessionId
            }
        })
        .then(function (response) {
                if (response.data.status == "success") {
                    var studentNum = response.data.statistics.length;
                    for (let i = 0; i < studentNum; i++) {
                        studentNames[i] = response.data.statistics[i].name;
                        studentRates[i] = response.data.statistics[i].trueRate;
                    }
                    var student_Names = JSON.stringify(studentNames);
                    localStorage.setItem("sstudentNames", student_Names);
                    var student_Rates = JSON.stringify(studentRates);
                    localStorage.setItem("sstudentRates", student_Rates);
                    var studentamount = JSON.stringify(studentNum);
                    localStorage.setItem("sstudent_amount", studentamount);
                } else {
                    alert("错误");
                }
            },
            function (err) {
                alert("err");
            })

}

function btn_onclick_submit_comment() { //写评论
    var comment_text = $("input[id='check_student_comment']").val();
    var sessionid = localStorage.getItem("studentsessionid");
    var sessionId = JSON.parse(sessionid);
    let jsonuserid = window.localStorage.getItem("studentid");
    let userId = JSON.parse(jsonuserid);
    let jsonusertoken = localStorage.getItem("studentusertoken");
    let usertoken = JSON.parse(jsonusertoken);
    axios.defaults.headers.common['Authorization'] = usertoken;
    URL_handComment = "http://localhost:52433/api/comments/add/" + sessionId;
    axios.post(URL_handComment, {
            userId: userId,
            content: comment_text
        })
        .then(function (response) {
            if (response.data.status == "success") {
                alert("评论成功！");
                btn_onclick_view_student();
            } else {
                alert("评论失败！");
            }
        }, function (err) {
            alert("err");
        })

}