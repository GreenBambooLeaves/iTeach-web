var question_amount = 3;
var student_amount = 3;
var comment_amount = 2;

var question_title = "小学复习题"; //问卷标题

var questionClassifications = new Array(); //题型
var questionContents = new Array(); //题干
var questionOptions = new Array(); //选项
var questionTrueAnswers = new Array(); //正确答案
var questionTrueRate = new Array(); //题目正确率
var questionCorrectNames = new Array(); //每道题做对学生的名字,逗号分割
var questionWrongNamesAnswer = new Array(); //每道题做错学生的名字和答案,注意格式
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

questionTrueRate[0] = "0.4";
questionTrueRate[1] = "0.7";
questionTrueRate[2] = "0.6";

questionCorrectNames[0] = "Student A,Student B,Student C";
questionCorrectNames[1] = "Student B";
questionCorrectNames[2] = "Student B,Student C";

questionWrongNamesAnswer[0] = "";
questionWrongNamesAnswer[1] = "Student A(A,c),Student C(B,c,D)";
questionWrongNamesAnswer[2] = "Student A(2)";

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

$(document).ready(function(e) {
    var question_Amount = localStorage.getItem("tquestion_amount");
    var question_amount = JSON.parse(question_Amount);
    var student_Amount = localStorage.getItem("tstudent_amount");
    var student_amount = JSON.parse(student_Amount);
    var comment_Amount = localStorage.getItem("tcomment_amount");
    var comment_amount = JSON.parse(comment_Amount);
    var question_Title = localStorage.getItem("tquestion_title");
    var question_title = JSON.parse(question_Title);
    var _questionClassifications = localStorage.getItem("tquestionClassifications");
    var questionClassifications = JSON.parse(_questionClassifications);
    var _questionContents = localStorage.getItem("tquestionContents");
    var questionContents = JSON.parse(_questionContents);
    var _tquestionOptions = localStorage.getItem("tquestionOptions");
    var questionOptions = JSON.parse(_tquestionOptions);
    var _questionTrueAnswers = localStorage.getItem("tquestionTrueAnswers");
    var questionTrueAnswers = JSON.parse(_questionTrueAnswers);
    var _questionTrueRate = localStorage.getItem("tquestionTrueRate");
    var questionTrueRate = JSON.parse(_questionTrueRate);
    var _studentNames = localStorage.getItem("tstudentNames");
    var studentNames = JSON.parse(_studentNames);
    var _studentRates = localStorage.getItem("tstudentRates");
    var studentRates = JSON.parse(_studentRates);
    var _commentClassifications = localStorage.getItem("tcommentClassifications");
    var commentClassifications = JSON.parse(_commentClassifications);
    var _commentNames = localStorage.getItem("tcommentNames");
    var commentNames = JSON.parse(_commentNames);
    var _commentContents = localStorage.getItem("tcommentContents");
    var commentContents = JSON.parse(_commentContents);
    //var _questionCorrectNames = localStorage.getItem("tquestionCorrectNames");
    // var questionCorrectNames = JSON.parse(_questionCorrectNames);
    // var _questionWrongNamesAnswer = localStorage.getItem("tquestionWrongNamesAnswer");
    //var questionWrongNamesAnswer = JSON.parse(_questionWrongNamesAnswer);





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

                optiondiv += '<div class="kzjxx_iteam">\
                <div>正确答案:' + questionTrueAnswers[index] + '&nbsp&nbsp&nbsp&nbsp正确率:' + questionTrueRate[index] + '</div>\
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

                optiondiv += '<div class="kzjxx_iteam">\
                <div>正确答案:' + questionTrueAnswers[index] + '&nbsp&nbsp&nbsp&nbsp正确率:' + questionTrueRate[index] + '</div>\
                </div>'


                var html = '<div>\
                            <div>' + (index + 1) + "." + "【多选题】" + questionContents[index] + '</div><br>\
                            <div class="title_itram">' + optiondiv + '</div> </div><br>'

                document.getElementById("Q_" + index).innerHTML = html;

                break;

            case "answer":

                var namesAnswer = "无";

                //if (questionWrongNamesAnswer[index] != "") {
                // namesAnswer = questionWrongNamesAnswer[index];
                //}


                /*
                var html = '<div>\
                <div>' + (index + 1) + "." + "【简答题】" + questionContents[index] + '</div><br>\
                <div class="title_itram">\
                <div class="kzjxx_iteam">\
                <div>正确答案:' + questionTrueAnswers[index] + '&nbsp&nbsp&nbsp&nbsp正确率:' + questionTrueRate[index] + '</div></div>\
                <div class="kzjxx_iteam">\
                <div>答对学生名单:' + questionCorrectNames[index] + '</div></div>\
                <div class="kzjxx_iteam">\
                <div>答错学生名单及答案:' + namesAnswer + '</div></div>'
                */
                var html = '<div>\
                <div>' + (index + 1) + "." + "【简答题】" + questionContents[index] + '</div><br>\
                <div class="title_itram">\
                <div class="kzjxx_iteam">\
                <div>正确答案:' + questionTrueAnswers[index] + '&nbsp&nbsp&nbsp&nbsp正确率:' + questionTrueRate[index] + '</div></div>'

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
    var comment_text = $("input[id='check_teacher_comment']").val();

    alert(comment_text);

    window.location.href = "view_teacher.html";
}

function btn_onclick_back() {
    window.location.href = "view_teacher.html";
}


function btn_onclick_view_teacher() { //查看题目
    var Index = localStorage.getItem("teacherindex");
    var index = JSON.parse(Index);
    var sessionid = localStorage.getItem("teachersessionid");
    var sessionId = JSON.parse(sessionid);

    let jsonusertoken = localStorage.getItem("teacherusertoken");
    let usertoken = JSON.parse(jsonusertoken);
    axios.defaults.headers.common['Authorization'] = usertoken;

    let jsonuserid = window.localStorage.getItem("teacherid");
    let userId = JSON.parse(jsonuserid);
    //student_amount = window.sessionstudentnumber[index]; //全局!!!!!!!!!
    var URL_checksession = "http://localhost:52433/api/statistics/teacher/detail/" + sessionId;
    var URL_getcomment = "http://localhost:52433/api/comments/current/" + sessionId;
    var URL_getrank = "http://localhost:52433/api/statistics/sort/" + sessionId;

    axios.get(URL_checksession, {
            params: {
                sessionId: sessionId
            }
        })
        .then(function(response) {
                if (response.data.status == "success") {
                    question_title = response.data.session.name; //问卷的名
                    questions = response.data.questions;
                    student_amount = response.data.session.numOfStudent;
                    question_amount = questions.length; //问卷中的题目数量
                    for (let i = 0; i < question_amount; i++) {
                        //answerTrueOrFalses[i] = questions.trueorfalse; //正误
                        //questionIds[i] = questions[i]._id; //id
                        questionContents[i] = questions[i].content; //内容
                        questionClassifications[i] = questions[i].classification; //类型
                        if (questionClassifications[i] == "one-choice") {
                            questionClassifications[i] = "single_choice";
                            //questionAnswers[i] = questions[i].answer[0]; //回答
                            questionTrueAnswers[i] = questions[i].trueAnswer[0]; //正确答案
                        } else if (questionClassifications[i] == "multi-choice") {
                            questionClassifications[i] = "multiple_choice";
                            //questionAnswers[i] = questions[i].answer[0]; //回答
                            questionTrueAnswers[i] = questions[i].trueAnswer[0]; //正确答案
                            for (let j = 1; j < questions[i].trueAnswer.length; j++) {
                                questionTrueAnswers[i] = questionTrueAnswers[i] + "," + questions[i].trueAnswer[j];
                                //questionAnswers[i] = questionAnswers[i] + "," + questions[i].answer[j];
                            }
                        } else {
                            questionClassifications[i] = "answer";
                            //questionAnswers[i] = questions[i].answer[0]; //回答
                            questionTrueAnswers[i] = questions[i].trueAnswer[0]; //正确答案
                        }
                        /*
                        for (let k = 0; k < questions[i].trueAnswers.length; k++) {
                            questionCorrectNames[i] += questions[i].trueAnswers[k].name + ",";
                        }
                        for (let k = 0; k < questions[i].falseAnswers.length; k++) {
                            questionWrongNamesAnswer[i] += questions[i].falseAnswers[k].name + "," + questions[i].falseAnswers[k].answer;
                        }
                        */
                        if (questionClassifications[i] == "single_choice" || questionClassifications[i] == "multiple_choice") { //选项
                            questionOptions[i] = questions[i].option[0];
                            for (let j = 1; j < questions[i].option.length; j++) {
                                questionOptions[i] = questionOptions[i] + "," + questions[i].option[j];
                            }
                        }
                        alert();
                        questionTrueRate[i] = (questions[i].trueAnswers.length) * 1.0 / (student_amount) * 1.0;
                    }

                    var questionamount = JSON.stringify(question_amount);
                    localStorage.setItem("tquestion_amount", questionamount);
                    var studentamount = JSON.stringify(student_amount);
                    localStorage.setItem("tstudent_amount", studentamount);
                    var questiontitle = JSON.stringify(question_title);
                    localStorage.setItem("tquestion_title", questiontitle);
                    var question_Classifications = JSON.stringify(questionClassifications);
                    localStorage.setItem("tquestionClassifications", question_Classifications);
                    var question_Contents = JSON.stringify(questionContents);
                    localStorage.setItem("tquestionContents", question_Contents);
                    var question_Options = JSON.stringify(questionOptions);
                    localStorage.setItem("tquestionOptions", question_Options);
                    var question_TrueAnswers = JSON.stringify(questionTrueAnswers);
                    localStorage.setItem("tquestionTrueAnswers", question_TrueAnswers);
                    var question_TrueRate = JSON.stringify(questionTrueRate);
                    localStorage.setItem("tquestionTrueRate", question_TrueRate);
                    //var question_CorrectNames = JSON.stringify(questionCorrectNames);
                    //localStorage.setItem("questionCorrectNames", question_CorrectNames);
                    //var question_WrongNamesAnswer = JSON.stringify(questionWrongNamesAnswer);
                    //localStorage.setItem("tquestionWrongNamesAnswer", question_WrongNamesAnswer);
                    //切换窗口
                    window.location.href = "check_teacher.html";
                } else {
                    alert("发送错误信息");
                }
            },
            function(err) {
                alert("err");
            })

    axios.get(URL_getcomment, { //获取评论信息
            params: {
                sessionId: sessionId //!!!!!!!!!!!
            }
        })
        .then(function(response) {
                if (response.data.status == "success") {

                    comment_amount = response.data.comments.length;
                    for (let i = 0; i < comment_amount; i++) {
                        commentNames[i] = response.data.comments[i].name;
                        commentContents[i] = response.data.comments[i].content;
                        commentClassifications[i] = response.data.comments[i].classification;
                    }
                    var commentamount = JSON.stringify(comment_amount);
                    localStorage.setItem("tcomment_amount", commentamount);
                    var comment_Names = JSON.stringify(commentNames);
                    localStorage.setItem("tcommentNames", comment_Names);
                    var comment_Contents = JSON.stringify(commentContents);
                    localStorage.setItem("tcommentContents", comment_Contents);
                    var comment_Classifications = JSON.stringify(commentClassifications);
                    localStorage.setItem("tcommentClassifications", comment_Classifications);

                } else {
                    alert("错误");
                }
            },
            function(err) {
                alert("err");
            })

    axios.get(URL_getrank, {
            params: {
                sessionId: sessionId //!!!!!!!!!!!!!!
            }
        })
        .then(function(response) {
                if (response.data.status == "success") {
                    var studentNum = response.data.statistics.length;
                    for (let i = 0; i < studentNum; i++) {
                        studentNames[i] = response.data.statistics[i].name;
                        studentRates[i] = response.data.statistics[i].trueRate;
                    }
                    var student_Names = JSON.stringify(studentNames);
                    localStorage.setItem("tstudentNames", student_Names);
                    var student_Rates = JSON.stringify(studentRates);
                    localStorage.setItem("tstudentRates", student_Rates);

                } else {
                    alert("错误");
                }
            },
            function(err) {
                alert("err");
            })
}

function btn_onclick_submit_comment() { //写评论
    var comment_text = $("input[id='check_teacher_comment']").val();
    var sessionid = localStorage.getItem("teachersessionid");
    var sessionId = JSON.parse(sessionid);
    let jsonuserid = window.localStorage.getItem("teacherid");
    let userId = JSON.parse(jsonuserid);
    let jsonusertoken = localStorage.getItem("teacherusertoken");
    let usertoken = JSON.parse(jsonusertoken);
    axios.defaults.headers.common['Authorization'] = usertoken;
    URL_handComment = "http://localhost:52433/api/comments/add/" + sessionId;
    axios.post(URL_handComment, {
            userId: userId,
            content: comment_text
        })
        .then(function(response) {
            if (response.data.status == "success") {
                alert("评论成功！");
                btn_onclick_view_teacher();
            } else {
                alert("评论失败！");
            }
        }, function(err) {
            alert("err");
        })

}