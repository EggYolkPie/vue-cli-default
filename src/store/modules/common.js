import {
  setStore,
  getStore,
  removeStore
} from '@/util/store'
import {
  validatenull
} from '@/util/validate'
import {
  getDic
} from '@/api/admin'
import {
  baseUrl
} from '@/config/env';
import website from '@/const/website'
var num=0;
const common = {

  state: {
    isCollapse: false,
    isFullScren: false,
    inum: 0,//自定义参数编号id
    newsId:true,//判断是否是新的数据流
    flag: true,//保存参数开关
    arrytype: {},//保存参数的对象
    jsonlength: 0,//对象的长度
    isLock: getStore({
      name: 'isLock'
    }) || false,
    theme: getStore({
      name: 'theme'
    }) || '#409EFF',
    lockPasswd: getStore({
      name: 'lockPasswd'
    }) || '',
    website:website,
  },
  actions: {
    //获取字典公用类
    GetDic({
             commit,
             state,
             dispatch
           }, dic) {
      return new Promise((resolve, reject) => {
        if (dic instanceof Array) {
          Promise.all(dic.map(ele => getDic(ele))).then(data => {
            let result = {};
            dic.forEach((ele, index) => {
              result[ele] = data[index].data;
            })
            resolve(result)
          })
        }
      })
    }
  },
  mutations: {
    SET_COLLAPSE: (state, action) => {
      state.isCollapse = !state.isCollapse;
    },
    SET_FULLSCREN: (state, action) => {
      state.isFullScren = !state.isFullScren;
    },
    SET_LOCK: (state, action) => {
      state.isLock = true;
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
    },
    SET_THEME: (state, color) => {
      state.theme = color;
      setStore({
        name: 'theme',
        content: state.theme,
      })
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd;
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session'
      })
    },
    SHOWTAG:(state)=>{//双击数据流事件
      $("#demo").on("dblclick",".showTag",function () {
        // debugger;
        console.log(state.website.panels.demo.exportData().nodes,123)
        state.website.panels.explorJson=state.website.panels.demo.exportData().nodes;
        var ele=$(this)[0];
        var showSelectRow=eval("("+'state.website.panels.demo.exportData().nodes.'+$(ele).attr('id')+")");
        if(showSelectRow.path==undefined){
          showSelectRow.path=""
        };
        var textjson="";
        state.website.panels.jsonlength=0;
        state.website.panels.arrytype={};
        if(showSelectRow.name==undefined){
          showSelectRow.name=""
        }
        if(state.website.panels.explorJson==undefined||JSON.stringify(state.website.panels.explorJson)== "{}" ){
          if($(ele).find("i").hasClass("typeBtn")) {//没有数据的情况
            layer.open({
              type: 1,
              area: ['450px', '340px'], //宽高
              btn:["保存","取消"],
              title:"配置参数",
              content: '<div class="visit-page-add" style="margin: 25px;margin-top: 0">\n' +
                '       <p><label for="pName">作业名称:</label><input id="pName" maxlength="24" type="text" class="text block-input" value="'+showSelectRow.name+'" placeholder="作业名称"><br><br><label for="path">文件路径:</label><input id="path" type="text" class="text block-input" value="'+showSelectRow.path+'" placeholder="文件路径"><button class="btn btn-green zdy" onclick="fileMessage()">上传</button><input onchange="fileOver(this)" style="display: none" id="fileInput" type="file"></p>  <p><button class="btn zdy btn-blue btn-large" onclick="addCrossDomain()">自定义</button></p>\n' +
                '     </div>',


              yes:function (index) {
                state.website.panels.inum=0;
                state.website.panels.flag=true;
                // 获取用户自定义参数
                var vstLth=$(".visit-page-add .pdemon").length;

                if($("#pName").val()==""){
                  layer.msg("参数不能为空");
                  state.website.panels.flag = false;
                };
                if($("#path").val()==""){
                  layer.msg("参数不能为空");
                  state.website.panels.flag = false;
                };
                for (var t = 1; t <= vstLth; t++) {
                  var inputtype = $(".visit-page-add .pdemon-" + t + "").find("#domain-type-" + t + "");
                  var inputtext = $(".visit-page-add .pdemon-" + t + "").find("#domain-text-" + t + "");
                  if (inputtype.val() == "" || inputtext.val() == "") {
                    layer.msg("参数不能为空");
                    state.website.panels.flag = false;
                  }else{
                    state.website.panels.arrytype[inputtype.val()]=inputtext.val();
                    console.log(state.website.panels.arrytype)
                  }
                }
                if (state.website.panels.flag == true) {
                  var id = $(ele).attr("id");
                  var objstr = "state.website.panels.demo.exportData().nodes." + id;
                  var obj = eval(objstr);
                  obj["flowJson"] = state.website.panels.arrytype;
                  obj["name2"]=$("#pName").val();localStorage.setItem("path",$("#path").val())
                  obj['path']=$("#path").val();
                  $(ele).find(".span").html($("#pName").val());
                  $(ele).click();$(".ico_save").click();
                  state.website.panels.newsId=true;
                  console.log(obj)
                  layer.close(index);
                }

              },
              btn2:function (index) {
                state.website.panels.inum=0;
                layer.close(index);
                $(ele).click();
                state.website.panels.newsId=true;
              }
            });

          }
        }else{

          for(var key in state.website.panels.explorJson){

            state.website.panels.jsonlength++;
            var addJson="state.website.panels.explorJson."+key;

            if($(ele).attr("id")==key&&eval(addJson).flowJson!=undefined){//如果数据流有自定义参数


              for(var key2 in eval(addJson).flowJson){
                state.website.panels.inum++;
                textjson+='<p class="pdemon pdemon-'+state.website.panels.inum+'"><label for="domain-type-'+state.website.panels.inum+'">参数字段:</label><input id="domain-type-'+state.website.panels.inum+'" type="text" class="text block-input" value="'+key2+'" placeholder="参数字段"><label for="domain-text-'+state.website.panels.inum+'">参  数  值:</label><input id="domain-text-'+state.website.panels.inum+'" type="text" class="text block-input" value="'+eval(addJson).flowJson[key2]+'" placeholder="参  数  值"></p>';

              }
              if($(ele).find("i").hasClass("typeBtn")) {
                layer.open({
                  type: 1,
                  area: ['450px', '340px'], //宽高
                  btn:["保存","取消"],
                  title:"配置参数",
                  content: ' <div class="visit-page-add" style="margin: 25px;margin-top: 0">\n' +
                    '     <p><label for="pName">作业名称:</label><input id="pName" maxlength="24" type="text" class="text block-input" value="'+showSelectRow.name+'" placeholder="作业名称"><label for="path">文件路径:</label><input id="path" type="text" class="text block-input" value="'+showSelectRow.path+'" placeholder="文件路径"><button class="btn btn-green zdy" onclick="fileMessage()">上传</button><input onchange="fileOver(this)" style="display: none" id="fileInput" type="file"></p>     <p><button class="btn btn-blue zdy btn-large" onclick="addCrossDomain()">自定义</button></p>\n'+textjson +'  </div>',


                  yes:function (index) {
                    state.website.panels.inum=0;
                    state.website.panels.flag=true;
                    // 获取用户自定义参数
                    var vstLth=$(".visit-page-add .pdemon").length;

                    if($("#pName").val()==""){
                      layer.msg("参数不能为空");
                      state.website.panels.flag = false;
                    };
                    if($("#path").val()==""){
                      layer.msg("参数不能为空");
                      state.website.panels.flag = false;
                    };

                    for (var t = 1; t <= vstLth; t++) {
                      var inputtype = $(".visit-page-add .pdemon-" + t + "").find("#domain-type-" + t + "");
                      var inputtext = $(".visit-page-add .pdemon-" + t + "").find("#domain-text-" + t + "");
                      if (inputtype.val() == "" || inputtext.val() == "") {
                        layer.msg("参数不能为空");
                        state.website.panels.flag = false;
                      }else{
                        state.website.panels.arrytype[inputtype.val()]=inputtext.val();
                      }
                    }
                    if (state.website.panels.flag == true) {
                      var id = $(ele).attr("id");
                      var objstr = "state.website.panels.demo.exportData().nodes." + id;
                      var obj = eval(objstr);
                      obj["flowJson"] = state.website.panels.arrytype;
                      obj["name2"]=$("#pName").val();localStorage.setItem("path",$("#path").val())
                      obj['path']=$("#path").val();
                      $(ele).find(".span").html($("#pName").val())
                      $(ele).click();$(".ico_save").click();
                      console.log(obj)
                      state.website.panels.newsId=true;
                      layer.close(index);
                    }

                  },
                  btn2:function (index) {
                    state.website.panels.inum=0;
                    layer.close(index);
                    $(ele).click();
                    state.website.panels.newsId=true;
                  }
                });

              }


            }

            if($(ele).attr("id")==key&&eval(addJson).flowJson==undefined){//如果数据流没有自定义参数


              if($(ele).find("i").hasClass("typeBtn")) {
                layer.open({
                  type: 1,
                  area: ['450px', '340px'], //宽高
                  btn:["保存","取消"],
                  title:"配置参数",
                  content: ' <div class="visit-page-add" style="margin: 25px;margin-top: 0">\n' +
                    '      <p><label for="pName">作业名称:</label><input id="pName" maxlength="24" type="text" class="text block-input" value="'+showSelectRow.name+'" placeholder="作业名称"><label for="path">文件路径:</label><input id="path" type="text" class="text block-input" value="'+showSelectRow.path+'" placeholder="文件路径"><button class="btn btn-green zdy" onclick="fileMessage()">上传</button><input onchange="fileOver(this)" style="display: none" id="fileInput" type="file"></p>  <p><button class="btn zdy btn-blue btn-large" onclick="addCrossDomain()">添加</button></p>\n' +
                    '    </div>',


                  yes:function (index) {
                    state.website.panels.inum=0;
                    state.website.panels.flag=true;
                    // 获取用户自定义参数
                    var vstLth=$(".visit-page-add .pdemon").length;
                    if($("#pName").val()==""){
                      layer.msg("参数不能为空");
                      state.website.panels.flag = false;
                    };
                    if($("#path").val()==""){
                      layer.msg("参数不能为空");
                      state.website.panels.flag = false;
                    };

                    for (var t = 1; t <= vstLth; t++) {
                      var inputtype = $(".visit-page-add .pdemon-" + t + "").find("#domain-type-" + t + "");
                      var inputtext = $(".visit-page-add .pdemon-" + t + "").find("#domain-text-" + t + "");
                      if (inputtype.val() == "" || inputtext.val() == "") {
                        layer.msg("参数不能为空");
                        state.website.panels.flag = false;
                      }else{
                        state.website.panels.arrytype[inputtype.val()]=inputtext.val();
                      }
                    }
                    if (state.website.panels.flag == true) {
                      var id = $(ele).attr("id");
                      var objstr = "state.website.panels.demo.exportData().nodes." + id;
                      var obj = eval(objstr);
                      obj["flowJson"] = state.website.panels.arrytype;
                      obj["name2"]=$("#pName").val();localStorage.setItem("path",$("#path").val())
                      obj['path']=$("#path").val();
                      $(ele).find(".span").html($("#pName").val())
                      $(ele).click();$(".ico_save").click();
                      layer.close(index);
                      state.website.panels.newsId=true;
                    }

                  },
                  btn2:function (index) {
                    state.website.panels.inum=0;
                    layer.close(index);
                    $(ele).click();
                    state.website.panels.newsId=true;
                  }
                });

              }
            }

          }

          for(var key2 in state.website.panels.explorJson){
            if($(ele).attr("id")==key2){
              state.website.panels.newsId=false;
            }
          }
          console.log($(".GooFlow_item").length,state.website.panels.jsonlength, 222)
          if($(".GooFlow_item").length>=state.website.panels.jsonlength&&state.website.panels.newsId==true){//如果数据流没有自定义参数
            console.log(state.website.panels.newsId,"k")
            if($(ele).find("i").hasClass("typeBtn")) {
              layer.open({
                type: 1,
                area: ['450px', '340px'], //宽高
                btn:["保存","取消"],
                title:"配置参数",
                content: ' <div class="visit-page-add" style="margin: 25px;margin-top: 0">\n' +
                  '       <p><label for="pName">作业名称:</label><input id="pName" maxlength="24" type="text" class="text block-input" value="'+showSelectRow.name+'" placeholder="作业名称"><label for="path">文件路径:</label><input id="path" type="text" class="text block-input" value="'+showSelectRow.path+'" placeholder="文件路径"><button class="btn btn-green zdy" onclick="fileMessage()">上传</button><input onchange="fileOver(this)" style="display: none" id="fileInput" type="file"></p> <p><button class="btn zdy btn-blue btn-large" onclick="addCrossDomain()">添加</button></p>\n' +
                  '    </div>',

                yes:function (index) {
                  state.website.panels.inum=0;
                  state.website.panels.flag=true;
                  // 获取用户自定义参数
                  var vstLth=$(".visit-page-add .pdemon").length;
                  if($("#pName").val()==""){
                    layer.msg("参数不能为空");
                    state.website.panels.flag = false;
                  };
                  if($("#path").val()==""){
                    layer.msg("参数不能为空");
                    state.website.panels.flag = false;
                  };


                  for (var t = 1; t <= vstLth; t++) {
                    var inputtype = $(".visit-page-add .pdemon-" + t + "").find("#domain-type-" + t + "");
                    var inputtext = $(".visit-page-add .pdemon-" + t + "").find("#domain-text-" + t + "");
                    if (inputtype.val() == "" || inputtext.val() == "") {
                      layer.msg("参数不能为空");
                      state.website.panels.flag = false;
                    }else{
                      state.website.panels.arrytype[inputtype.val()]=inputtext.val();
                    }
                  }
                  if (state.website.panels.flag == true) {
                    var id = $(ele).attr("id");
                    var objstr = "state.website.panels.demo.exportData().nodes." + id;
                    var obj = eval(objstr);
                    obj["flowJson"] = state.website.panels.arrytype;
                    obj["name2"]=$("#pName").val();localStorage.setItem("path",$("#path").val())
                    obj['path']=$("#path").val();
                    $(ele).find(".span").html($("#pName").val())
                    $(ele).click();
                    state.website.panels.newsId=true;
                    $(".ico_save").click();
                    layer.close(index);

                  }

                },
                btn2:function (index) {
                  state.website.panels.inum=0;
                  layer.close(index);
                  $(ele).click();
                  state.website.panels.newsId=true;
                }
              });
            }
          }
        }

      });

    },
    CLEAR_LOCK: (state, action) => {
      state.isLock = false;
      state.lockPasswd = '';
      removeStore({
        name: 'lockPasswd'
      });
      removeStore({
        name: 'isLock'
      });
    },
  }
}
export default common
