import website from '@/const/website'
var text="";
website.panels.formPanle = {
    panelLoad: function () {
        $(".trans-record-title").click(function () {// select选择器
            if ($(this).hasClass("open")) {//select展开
                $(this).removeClass("open");
                $(this).parents(".trans-target-record-wrapper").find(".trans-record-detail").fadeOut(100);

            } else {
                $(this).addClass("open");
                $(this).parents(".trans-target-record-wrapper").find(".trans-record-detail").fadeIn(100);
            }
            return false;
        });
        $('.trans-target-setting-content').click(function () {//关闭select
            $(".trans-record-title").removeClass("open");
            $(".trans-record-detail").fadeOut(100);

        });
        //被选中的内容
        $(".trans-record-detail").find("input").click(function () {
            $(this).parents(".trans-target-record-wrapper").find(".trans-record-title span").html($(this).val());
        });
        // 单选开关
        $(".trans-profit-btn").click(function () {// select选择器
            if ($(this).hasClass("open")) {//select展开
                $(this).removeClass("open");
                $(this).find("input").val(0);
            } else {
                $(this).addClass("open");
                $(this).find("input").val(1);
            }
        })
        this.help();
        this.prop();
    },
    help: function () {// 帮助提示
        $.each($(".help"), function (v, k) {
          console.log(k)
            if ($(k).attr("help") != undefined) {
                text = "";
                text = "<div class=\"tip-container tip-layout-trans-event\" style=\"position: relative; left: 0; top: 0;\"><div style=\"position: relative;top:8px; left:-10px;\" class=\"tip-div tip-theme title-theme\"><div class=\"tip-arrow\" style=\"left: 10px;\"></div><div class=\"tip-wrap\">" + $(k).attr("help") + "</div></div></div>";
                $(k).html("")
                $(k).append(text)
            }
            $(".help").mouseover(function () {
                $(".help").find(".tip-container").hide();
                $(this).find(".tip-container").show();
            }).mouseout(function () {
                $(".help").find(".tip-container").hide();
            });
        })
    },
    prop: function () {//必填项
        $.each($(".trans-website-setting"), function (v, k) {
            if ($(k).attr("prop") != undefined) {
                $(k).find('.trans-website-error').html($(k).attr("prop"));
                $(k).find(".trans-target-website-title").prepend("<b class='l' style='color: red'>*&nbsp;</b>");
            }

        })
    },
    check: function () {//提交验证
        $.each($(".trans-website-setting"), function (v, k) {
            if ($(k).find("input").val() == "") {
                $(k).find('.trans-website-error').fadeIn(100);
                $(k).find('.trans-website-error').css({"display": "inline"});
                $(k).find("input").css("border", "1px solid #f35550");
            } else {
                $(k).find('.trans-website-error').fadeOut(100);
                $(k).find("input").css("border", "1px solid #d1d5d6");
            }
            $(k).keydown(function (eve) {
                if (eve.target.value != "") {
                    $(k).find('.trans-website-error').fadeOut(100);
                    $(k).find("input").css("border", "1px solid #d1d5d6");
                }
            });
        })
    },
    editData: function (row) {
        console.log(row)
        $("#host_ip").val(row.host_ip),//主机IP
            $("#host_name").val(row.host_name),//主机名
            $("#host_port").val(row.host_port),//端口号
            $("#host_username").val(row.host_username),//用户名
            $("#host_password").val(row.host_password),//用户密码
            $("#type").html(row.type),//监控类型
            $("#host_desc").html(row.host_desc),//主机描述

        // select的编辑值
        $(".trans-target-record-wrapper input").removeAttr("checked");
        $("#" + row.host_desc).attr("checked", "checked");
        $("#" + row.type).attr("checked", "checked");

        // 开关按钮
        if (row.monitor_status == "1") {
            $(".trans-profit-btn").addClass("open");
            $("#monitor_status").val(1);
        }else{
            $("#monitor_status").val(0);
        }
    }
}



