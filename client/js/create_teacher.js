var question_title = "";
var question_remark = "";
var question_classification = new Array();
var question_content = new Array();
var question_option = new Array();
var question_answer = new Array();

$(document).ready(function (e) {
    //编辑
    $(".bianji").live("click", function () {
        //编辑的时候禁止其他操作   
        $(this).siblings().hide();
        //$(this).parent(".kzqy_czbut").parent(".movie_box").unbind("hover"); 
        var dxtm = $(".dxuan").html();
        var duoxtm = $(".duoxuan").html();
        var tktm = $(".tktm").html();
        //接受编辑内容的容器
        var dx_rq = $(this).parent(".kzqy_czbut").parent(".movie_box").find(".dx_box");
        var title = dx_rq.attr("data-t");
        //alert(title);
        //题目选项的个数
        var timlrxm = $(this).parent(".kzqy_czbut").parent(".movie_box").children(".wjdc_list").children("li").length;

        //单选题目
        if (title == 0) {
            dx_rq.show().html(dxtm);
            //模具题目选项的个数
            var bjxm_length = dx_rq.find(".title_itram").children(".kzjxx_iteam").length;
            //添加选项题目
            for (var i_tmxx = bjxm_length; i_tmxx < timlrxm - 1; i_tmxx++) {
                dx_rq.find(".title_itram").append("<div class='kzjxx_iteam'>" + dxtxx_html + "</div>");
            }
            //赋值文本框 
            //题目标题
            var texte_bt_val = $(this).parent(".kzqy_czbut").parent(".movie_box").find(".wjdc_list").children("li").eq(0).find(".tm_btitlt").children(".btwenzi").text();

            dx_rq.find(".btwen_text").val(texte_bt_val);
            //遍历题目项目的文字
            var bjjs = 0;
            $(this).parent(".kzqy_czbut").parent(".movie_box").find(".wjdc_list").children("li").each(function () {
                //可选框框
                var ktksfcz = $(this).find("input").hasClass("wenb_input");
                if (ktksfcz) {
                    var jsxz_kk = $(this).index();
                    dx_rq.find(".title_itram").children(".kzjxx_iteam").eq(jsxz_kk - 1).find("label").remove();
                }
                //题目选项
                var texte_val = $(this).find("span").text();
                dx_rq.find(".title_itram").children(".kzjxx_iteam").eq(bjjs - 1).find(".input_wenbk").val(texte_val);
                bjjs++

            });
        }
        //多选题目  
        if (title == 1) {
            dx_rq.show().html(duoxtm);
            //模具题目选项的个数
            var bjxm_length = dx_rq.find(".title_itram").children(".kzjxx_iteam").length;
            var dxtxx_html = dx_rq.find(".title_itram").children(".kzjxx_iteam").html();
            //添加选项题目
            for (var i_tmxx = bjxm_length; i_tmxx < timlrxm - 1; i_tmxx++) {
                dx_rq.find(".title_itram").append("<div class='kzjxx_iteam'>" + dxtxx_html + "</div>");
                //alert(i_tmxx);
            }
            //赋值文本框 
            //题目标题
            var texte_bt_val = $(this).parent(".kzqy_czbut").parent(".movie_box").find(".wjdc_list").children("li").eq(0).find(".tm_btitlt").children(".btwenzi").text();
            dx_rq.find(".btwen_text").val(texte_bt_val);
            //遍历题目项目的文字
            var bjjs = 0;
            $(this).parent(".kzqy_czbut").parent(".movie_box").find(".wjdc_list").children("li").each(function () {
                //可选框框
                var ktksfcz = $(this).find("input").hasClass("wenb_input");
                if (ktksfcz) {
                    var jsxz_kk = $(this).index();
                    dx_rq.find(".title_itram").children(".kzjxx_iteam").eq(jsxz_kk - 1).find("label").remove();
                }
                //题目选项
                var texte_val = $(this).find("span").text();
                dx_rq.find(".title_itram").children(".kzjxx_iteam").eq(bjjs - 1).find(".input_wenbk").val(texte_val);
                bjjs++
            });
        }
        //填空题目
        if (title == 2) {
            dx_rq.show().html(tktm);
            //赋值文本框 
            //题目标题
            var texte_bt_val = $(this).parent(".kzqy_czbut").parent(".movie_box").find(".wjdc_list").children("li").eq(0).find(".tm_btitlt").children(".btwenzi").text();
            dx_rq.find(".btwen_text").val(texte_bt_val);

        }
    });

    //增加选项  
    $(".zjxx").live("click", function () {
        var zjxx_html = $(this).prev(".title_itram").children(".kzjxx_iteam").html();
        $(this).prev(".title_itram").append("<div class='kzjxx_iteam'>" + zjxx_html + "</div>");
    });

    //删除一行 
    $(".del_xm").live("click", function () {
        //获取编辑题目的个数
        var zuxxs_num = $(this).parent(".kzjxx_iteam").parent(".title_itram").children(".kzjxx_iteam").length;
        if (zuxxs_num > 1) {
            $(this).parent(".kzjxx_iteam").remove();
        } else {
            alert("选项不能为空");
        }
    });
    //取消编辑
    $(".dx_box .qxbj_but").live("click", function () {
        $(this).parent(".bjqxwc_box").parent(".dx_box").empty().hide();
        $(".movie_box").css({
            "border": "1px solid #fff"
        });
        $(".kzqy_czbut").remove();
        //   
    });
    // body...
    //完成编辑（编辑）
    $(".swcbj_but").live("click", function () {
        var jcxxxx = $(this).parent(".bjqxwc_box").parent(".dx_box"); //编辑题目区
        var questionType = jcxxxx.attr("data-t"); //获取题目类型
        //alert(questionType);

        switch (questionType) {
            case "0": //单选
                var bjtm_xm_length = jcxxxx.find(".title_itram").children(".kzjxx_iteam").length; //编辑选项的 选项个数
                var xmtit_length = jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").length - 1; //题目选择的个数

                //赋值文本框 
                //题目标题
                var texte_bt_val_bj = jcxxxx.find(".btwen_text").val(); //获取问题题目

                window.question_content.push(texte_bt_val_bj);

                jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(0).find(".tm_btitlt").children(".btwenzi").text(texte_bt_val_bj); //将修改过的问题题目展示

                //删除选项
                for (var toljs = xmtit_length; toljs > 0; toljs--) {
                    jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(toljs).remove();
                }
                //遍历题目项目的文字
                var bjjs_bj = 0;

                var option = "";
                var answer = "";
                jcxxxx.children(".title_itram").children(".kzjxx_iteam").each(function () {
                    //题目选项
                    var texte_val_bj = $(this).find(".input_wenbk").val(); //获取填写信息

                    option += texte_val_bj + ",";

                    var inputType = 'radio';
                    jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(bjjs_bj + 1).find("span").text(texte_val_bj);

                    var li = '<li><label><input name="a" type="' + inputType + '" value=""><span>' + texte_val_bj + '</span></label></li>';
                    jcxxxx.parent(".movie_box").children(".wjdc_list").append(li);

                    bjjs_bj++;

                    var kxtk_yf = $(this).find(".fxk").is(':checked');

                    if (kxtk_yf) {
                        var jsxz = $(this).index();
                        jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(jsxz + 1).find("span").after("(正确答案)");
                        answer += texte_val_bj + ",";
                    }
                });

                option = option.substring(0, option.length - 1);
                answer = answer.substring(0, answer.length - 1);
                window.question_option.push(option);
                window.question_answer.push(answer);

                break;
            case "1": //多选	
                //编辑题目选项的个数
                var bjtm_xm_length = jcxxxx.find(".title_itram").children(".kzjxx_iteam").length; //编辑选项的 选项个数
                var xmtit_length = jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").length - 1; //题目选择的个数

                //赋值文本框 
                //题目标题
                var texte_bt_val_bj = jcxxxx.find(".btwen_text").val(); //获取问题题目

                window.question_content.push(texte_bt_val_bj);

                jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(0).find(".tm_btitlt").children(".btwenzi").text(texte_bt_val_bj); //将修改过的问题题目展示

                //删除选项
                for (var toljs = xmtit_length; toljs > 0; toljs--) {
                    jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(toljs).remove();
                }
                //遍历题目项目的文字
                var bjjs_bj = 0;

                var option = "";
                var answer = "";
                jcxxxx.children(".title_itram").children(".kzjxx_iteam").each(function () {
                    //题目选项
                    var texte_val_bj = $(this).find(".input_wenbk").val(); //获取填写信息

                    option += texte_val_bj + ",";

                    var inputType = 'checkbox';
                    jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(bjjs_bj + 1).find("span").text(texte_val_bj);

                    var li = '<li><label><input name="a" type="' + inputType + '" value=""><span>' + texte_val_bj + '</span></label></li>';
                    jcxxxx.parent(".movie_box").children(".wjdc_list").append(li);

                    bjjs_bj++;

                    var kxtk_yf = $(this).find(".fxk").is(':checked');

                    if (kxtk_yf) {
                        var jsxz = $(this).index();
                        jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(jsxz + 1).find("span").after("(正确答案)");
                        answer += texte_val_bj + ",";
                    }
                });

                option = option.substring(0, option.length - 1);
                answer = answer.substring(0, answer.length - 1);
                window.question_option.push(option);
                window.question_answer.push(answer);

                break;
            case "2": //简答

                var texte_bt_val_bj = jcxxxx.find(".btwen_text").val(); //获取问题题目
                jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(0).find(".tm_btitlt").children(".btwenzi").text(texte_bt_val_bj); //将修改过的问题题目展示

                var answer = "";

                jcxxxx.children(".title_itram").children(".kzjxx_iteam").each(function () {
                    //题目选项
                    var texte_val_bj = $(this).find(".input_wenbk").val(); //获取填写信息
                    answer = texte_val_bj;

                    jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(1).find("span").text(texte_val_bj);

                    var li = '<li><label><div name="a"><span>' + texte_val_bj + '</span></label></li>';
                    jcxxxx.parent(".movie_box").children(".wjdc_list").append(li);
                });

                window.question_content.push(texte_bt_val_bj);
                window.question_option.push("NULL");
                window.question_answer.push(answer);

                break;
        }
        //清除     
        $(this).parent(".bjqxwc_box").parent(".dx_box").empty().hide();
    });


});

function btn_onclick_add_danxuan() {
    var movie_box = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
    var Grade = $(".yd_box").find(".movie_box").length + 1;

    var wjdc_list = '<ul class="wjdc_list"></ul>'; //问答 单选 多选

    wjdc_list = $(wjdc_list).append(' <li><div class="tm_btitlt"><i class="tmxh">' + Grade + '</i>. <i class="btwenzi"></i><span class="tip_wz">' + '</span></div></li>');

    movie_box = $(movie_box).append(wjdc_list);
    movie_box = $(movie_box).append('<div class="dx_box" data-t="' + 0 + '"></div>');

    $(movie_box).hover(function () {
        var html_cz = "<div class='kzqy_czbut'><a href='javascript:void(0)'  class='bianji'>编辑</a></div>"
        $(this).css({
            "border": "1px solid #228896"
        });
        $(this).children(".wjdc_list").after(html_cz);
    }, function () {
        $(this).css({
            "border": "1px solid #fff"
        });
        $(this).children(".kzqy_czbut").remove();
        //$(this).children(".dx_box").hide(); 
    });
    $(".yd_box").append(movie_box);

    window.question_classification.push("single_choice");
}

function btn_onclick_add_duoxuan() {
    var movie_box = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
    var Grade = $(".yd_box").find(".movie_box").length + 1;

    var wjdc_list = '<ul class="wjdc_list"></ul>'; //问答 单选 多选

    wjdc_list = $(wjdc_list).append(' <li><div class="tm_btitlt"><i class="tmxh">' + Grade + '</i>. <i class="btwenzi"></i><span class="tip_wz">' + '</span></div></li>');

    movie_box = $(movie_box).append(wjdc_list);
    movie_box = $(movie_box).append('<div class="dx_box" data-t="' + 1 + '"></div>');

    $(movie_box).hover(function () {
        var html_cz = "<div class='kzqy_czbut'><a href='javascript:void(0)'  class='bianji'>编辑</a></div>"
        $(this).css({
            "border": "1px solid #228896"
        });
        $(this).children(".wjdc_list").after(html_cz);
    }, function () {
        $(this).css({
            "border": "1px solid #fff"
        });
        $(this).children(".kzqy_czbut").remove();
        //$(this).children(".dx_box").hide(); 
    });
    $(".yd_box").append(movie_box);

    window.question_classification.push("multiple_choice");
}

function btn_onclick_add_jianda() {
    var movie_box = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
    var Grade = $(".yd_box").find(".movie_box").length + 1;

    var wjdc_list = '<ul class="wjdc_list"></ul>'; //问答 单选 多选

    wjdc_list = $(wjdc_list).append(' <li><div class="tm_btitlt"><i class="tmxh">' + Grade + '</i>. <i class="btwenzi"></i><span class="tip_wz">' + '</span></div></li>');

    //wjdc_list = $(wjdc_list).append('<li>  <label> <textarea name="" cols="" rows="" class="input_wenbk btwen_text btwen_text_dx" placeholder="简答答案"></textarea></label> </li>');

    movie_box = $(movie_box).append(wjdc_list);
    movie_box = $(movie_box).append('<div class="dx_box" data-t="' + 2 + '"></div>');

    $(movie_box).hover(function () {
        var html_cz = "<div class='kzqy_czbut'><a href='javascript:void(0)'  class='bianji'>编辑</a></div>"
        $(this).css({
            "border": "1px solid #228896"
        });
        $(this).children(".wjdc_list").after(html_cz);
    }, function () {
        $(this).css({
            "border": "1px solid #fff"
        });
        $(this).children(".kzqy_czbut").remove();
        //$(this).children(".dx_box").hide(); 
    });
    $(".yd_box").append(movie_box);

    window.question_classification.push("answer");
}

function btn_onclick_create_questionnaire() {
    var question_amount = $(".yd_box").find(".movie_box").length;

    window.question_title = $("input[id='create_teacher_title']").val();
    window.question_remark = $("input[id='create_teacher_remark']").val();

    var i = new Number;
    var sendpacket = new Array();
    for (i = 0; i < question_amount; i++) { //题目数据
        if (question_classification[i] == "single_choice") {
            var questionpack = {
                content: question_content[i],
                option: question_option[i],
                answer: question_answer[i],
                classification: "one-choice",
                number: i + 1
            }
        } else if (question_classification[i] == "multiple_choice") {
            var questionpack = {
                content: question_content[i],
                option: question_option[i].split(","),
                answer: question_answer[i].split(","),
                classification: "multi-choice",
                number: i + 1
            }

        } else if (question_classification[i] == "answer") {
            var questionpack = {
                content: question_content[i],
                option: question_option[i],
                answer: question_answer[i],
                classification: "filling",
                number: i + 1
            }
        }
        sendpacket[i] = questionpack;
    }
    var masterid, jsonid;
    //window.localStorage.setItem("id","qifei");
    jsonid = window.localStorage.getItem("teacherid"); //转码用户id

    masterid = JSON.parse(jsonid);

    var session = { //session打包
        name: question_title,
        remark: question_remark,
        masterId: masterid,
        time: 30
    }
    //alert(session.name);
    //axios.defaults.headers.common['Authorization'] = localStorage.getItem("usertoken"); //token头部
    let jsonusertoken = localStorage.getItem("teacherusertoken");
    let usertoken = JSON.parse(jsonusertoken);
    axios.defaults.headers.common['Authorization'] = usertoken;
    axios.post("http://localhost:52433/api/sessions/add", {
            session: session,
            questions: sendpacket
        })
        //{key:email,key2:name})
        .then(function (response) {
            //    window.location.href=login_teacher.html;
            var loginerr = "问题上传成功";
            window.location.href = "home_teacher.html";
            alert(loginerr);
        }, function (err) {
            var loginerr = "问题上传失败";
            alert(loginerr);
        })
}