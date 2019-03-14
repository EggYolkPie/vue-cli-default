// 拖拽插件
var drag = false;
var attr;
Vue.directive('drag',//自定义指令                                      JS
  {
    bind: function (el, binding) {
      let oDiv = el;   //当前元素
      let self = this;  //上下文
      oDiv.onmousedown = function (e) {
        //鼠标按下，计算当前元素距离可视区的距离

        document.onmousemove=function(e){
          $('.drag-target-list').mouseover(function () {
            drag = true;
            if($(this).hasClass('attrX')){
              attr="x"
            };
            if($(this).hasClass('attrY')){
              attr="y"
            };
          }).mouseout(function () {
            drag = false;
            if($(this).hasClass('attrX')){
              attr="x"
            };
            if($(this).hasClass('attrY')){
              attr="y"
            };
          });
          if (drag == true) {
            binding.value({text:$(el).find('span').text(),type:attr})
            document.onmousemove = null;
            document.onmouseup = null;
          }

        }
        document.onmouseup = function (e) {

        };
      };
    }
  }
);
function mm(a)
{
  return /(\x0f[^\x0f]+)\x0f[\s\S]*\1/.test("\x0f"+a.join("\x0f\x0f") +"\x0f");
}
