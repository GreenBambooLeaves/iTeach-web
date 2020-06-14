var question_amount;

var question_title;
var question_classification = new Array();
var question_content = new Array();
var question_option = new Array();
var question_Id = new Array(); 
var answer_answer = new Array();
/*
question_classification[0] = "single_choice";
question_classification[1] = "multiple_choice";
question_classification[2] = "answer";

question_content[0] = "3+4=?";
question_content[1] = "以下字母是大写字母的是";
question_content[2] = "写出6-5的答案";

question_option[0] = "5,6,7,8";
question_option[1] = "A,B,c,D";
question_option[2] = "NULL";

question_answer[0] = "7";
question_answer[1] = "A,B,D";
question_answer[2] = "1";
*/

$(document).ready(function (e) {
    var _question_amount = localStorage.getItem("squestion_amount");
    var question_amount = JSON.parse(_question_amount);
    var _question_title = localStorage.getItem("squestion_title");
    var question_title = JSON.parse(_question_title);
    var _question_classification = localStorage.getItem("squestion_classification");
    var question_classification = JSON.parse(_question_classification);
    var _question_content = localStorage.getItem("squestion_content");
    var question_content = JSON.parse(_question_content);
    var _question_option = localStorage.getItem("squestion_option");
    var question_option = JSON.parse(_question_option);

    var text = "&nbsp&nbsp" + question_title;

    document.getElementById('titledisplay').innerHTML = text;

    var html = "";

    for (var i = 0; i < question_amount; i++) {
        html += '<div id=' + i + '></div>'
    }

    document.getElementById('place').innerHTML = html;

    for (var index = 0; index < question_amount; index++) {
        switch (question_classification[index]) {
            case "single_choice":

                var option = question_option[index].split(",");
                var optiondiv = "";

                for (var i = 0; i < option.length; i++) {
                    optiondiv += '<div class="kzjxx_iteam">\
                    <input name="radio_' + index + '" type="radio" value="" class="dxk">\
                    <div>' + option[i] + '</div>\
                    </div>'
                }

                var html = '<div><div>' + (index + 1) + "." + "【单选题】" + question_content[index] + '</div><br>\
                            <div class="title_itram">' + optiondiv + '</div></div><br>'

                document.getElementById(index).innerHTML = html;

                break;

            case "multiple_choice":
                var option = question_option[index].split(",");
                var optiondiv = "";

                for (var i = 0; i < option.length; i++) {
                    optiondiv += '<div class="kzjxx_iteam">\
                    <input name="checkbox_' + index + '" type="checkbox" value="" class="dxk">\
                    <div>' + option[i] + '</div>\
                    </div>'
                }

                var html = '<div><div>' + (index + 1) + "." + "【多选题】" + question_content[index] + '</div><br>\
                            <div class="title_itram">' + optiondiv + '</div></div><br>'

                document.getElementById(index).innerHTML = html;

                break;

            case "answer":
                var html = '<div><div>' + (index + 1) + "." + "【简答题】" + question_content[index] + '</div><br>\
                <div class="title_itram">\
                <div class="kzjxx_iteam">\
                <input name="text_' + index + '" type="text" class="input_wenbk" placeholder="在此处填写答案"></div></div></div><br>'

                document.getElementById(index).innerHTML = html;

                break;
        }
    }
});

function btn_onclick_submit_questionnaire() {
    var _question_amount = localStorage.getItem("squestion_amount");
    var question_amount = JSON.parse(_question_amount);
    var _question_classification = localStorage.getItem("squestion_classification");
    var question_classification = JSON.parse(_question_classification);
    var _question_option = localStorage.getItem("squestion_option");
    var question_option = JSON.parse(_question_option);
    for (var index = 0; index < question_amount; index++) {
        switch (question_classification[index]) {
            case "single_choice":
                var option = question_option[index].split(",");
                var inputs = document.getElementsByName("radio_" + String(index));
                for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].checked) {
                        answer_answer[index] = option[i];
                    }
                }
                break;

            case "multiple_choice":
                var option = question_option[index].split(",");
                var answer = "";

                var inputs = document.getElementsByName("checkbox_" + String(index));
                for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].checked) {
                        answer += option[i] + ",";
                    }
                }

                answer = answer.substring(0, answer.length - 1);
                answer_answer[index] = answer;
                break;

            case "answer":
                var answer = $("input[name='text_" + index + "']").val();
                answer_answer[index] = answer;
                break;
        }
    }
    onclick_submit_session();
}

function btn_onclick_join() { //加入问卷
    var sessionId = document.getElementById("join_student_code").value;
    window.localStorage.setItem("sessionId", JSON.stringify(sessionId));
    var jstoken = localStorage.getItem("studentusertoken");
    var token = JSON.parse(jstoken);
    var jsstudentId = localStorage.getItem("studentid");
    var studentId = JSON.parse(jsstudentId);
    axios.defaults.headers.common['Authorization'] = token;
    URL_joinSession = "http://localhost:52433/api/sessions/join/" + sessionId;
    axios.get(URL_joinSession, {
            params: {
                userId: studentId,
                sessionId: sessionId
            }
        })
        .then(function (response) {
                if (response.data.status == "success") {
                    var questions = response.data.questions;
                    var question_title = response.data.session.name;
                    //var session_remark = response.data.remark;
                    //var time = response.data.time;
                    var sessionlength = questions.length;
                    for (let i = 0; i < sessionlength; i++) {
                        question_content[i] = questions[i].content;
                        question_Id[i] = questions[i]._id;
                        question_classification[i] = questions[i].classification;
                        if (question_classification[i] == "one-choice") {
                            question_classification[i] = "single_choice";
                        } else if (question_classification[i] == "multi-choice") {
                            question_classification[i] = "multiple_choice";
                        } else {
                            question_classification[i] = "answer";
                        }
                        if (question_classification[i] == "single_choice" || question_classification[i] == "multiple_choice") {
                            question_option[i] = questions[i].option[0];
                            for (let j = 1; j < questions[i].option.length; j++) {
                                question_option[i] = question_option[i] + "," + questions[i].option[j];
                            }
                        }
                    }
                    var questionId = JSON.stringify(question_Id);
                    localStorage.setItem("squestion_Id", questionId);
                    var questionamount = JSON.stringify(sessionlength);
                    localStorage.setItem("squestion_amount", questionamount);
                    var questionclassification = JSON.stringify(question_classification);
                    localStorage.setItem("squestion_classification", questionclassification);
                    var questioncontent = JSON.stringify(question_content);
                    localStorage.setItem("squestion_content", questioncontent);
                    var questionoption = JSON.stringify(question_option);
                    localStorage.setItem("squestion_option", questionoption);
                    var questiontitle = JSON.stringify(question_title);
                    localStorage.setItem("squestion_title", questiontitle);
                    window.location.href = "solve_student.html";
                } else {
                    alert("问卷ID不存在，请重新输入！");
                }
            },
            function (err) {
                alert("问卷ID不存在，请重新输入！");
            })
}

function onclick_submit_session() {//提交问卷
    var _question_amount = localStorage.getItem("squestion_amount");
    var question_amount = JSON.parse(_question_amount);
    var _question_Id = localStorage.getItem("squestion_Id");
    var question_Id = JSON.parse(_question_Id);
    var jssessionId = localStorage.getItem("sessionId");
    var sessionId = JSON.parse(jssessionId);
    var jsstudentId = localStorage.getItem("studentid");
    var studentId = JSON.parse(jsstudentId);
    var answers = new Array();
    for (let i = 0; i < question_amount; i++) {       
        let content = answer_answer[i].split(",");
        answer = {
            questionId: question_Id[i],
            content: content
        }
        answers.push(answer);
    }
    var jstoken = localStorage.getItem("studentusertoken");
    var token = JSON.parse(jstoken);
    axios.defaults.headers.common['Authorization'] = token;
    URL_submitSession = "http://localhost:52433/api/sessions/submit/" + sessionId;
    axios.post( URL_submitSession, {
            userId: studentId,
            answers: answers
        })
        .then(function (response) {
            if (response.data.status == "success") {
                alert("提交成功！");
                window.location.href = "home_student.html";
            }

                  
        }, function (err) {
            alert(err);
        })
}