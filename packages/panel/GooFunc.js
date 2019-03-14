//悬停文字效果
setTimeout(function () {
  $(".GooFlow_head .GooFlow_head_btn").mouseover(function () {
    $(".el-tooltip__popper").remove();
    $(this).append('<div role="tooltip"  id="el-tooltip-6154" aria-hidden="false" class="el-tooltip__popper is-dark" style="transform-origin: center top 0px; position: relative; left: -10px; top: 36px; z-index: 2073;width: 100%;text-align: center;margin-top: 20px" x-placement="bottom">'+$(this).find("i").data("tip")+'<div x-arrow="" class="popper__arrow" style="left: 20px;"></div></div>')
  }).mouseleave(function () {
    $(".el-tooltip__popper").remove();
  });
  $(".el-tooltip__popper").mouseover(function () {
    $(".el-tooltip__popper").remove();
  }).mouseleave(function () {
    $(".el-tooltip__popper").remove();
  });
},100)


function addCrossDomain() {//添加参数
  alert(0)
  state.website.panels.inum++;
  $(".visit-page-add").append('<p class="pdemon pdemon-' + inum + '"><label for="domain-type-' + inum + '">参数字段:</label><input id="domain-type-' + inum + '" type="text" class="text block-input" value="" placeholder="参数字段"><label for="domain-text-' + inum + '">参数名称:</label><input id="domain-text-' + inum + '" type="text" class="text block-input" value="" placeholder="参数名称"></p>');
}
