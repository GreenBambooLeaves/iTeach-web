/*
function btn_onclick_join() {//加入问卷
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
                    questions = response.data.questions;
                    var session_name = response.data.name;
                    var session_remark = response.data.remark;
                    var time = response.data.time;
                    var sessionlength = questions.length;
                    for (let i = 0; i < sessionlength; i++) {
                        question_Id[i] = questions[i]._id;
                        question_content[i] = questions[i].content;
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
                            for (let j = 1; i < questions[i].option.length; j++) {
                                question_option[i] = question_option[i] + "," + questions[i].option[j];
                            }
                        }
                    }
                    window.location.href = "solve_student.html";
                } else {
                    alert("问卷ID不存在，请重新输入！");
                }
            },
            function (err) {
                alert("问卷ID不存在，请重新输入！");
            })
}
*/