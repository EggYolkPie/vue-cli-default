<template>
  <div class="sidebar-container" :class="{'is-active':isCollapse}">
    <logo :isCollapse="isCollapse"></logo>
    <el-menu v-show="website.panels.show" unique-opened :default-active="nowTagValue" class="el-menu-vertical-demo"
             mode="vertical" :show-timeout="200" background-color="#00142a" text-color="hsla(0,0%,100%,.65)"
             active-text-color="#409eff" :collapse="isCollapse">
      <sidebar-item :menu="menu" :isCollapse="isCollapse"></sidebar-item>
    </el-menu>
    <div class="treemenu" v-show="!website.panels.show">
      <div class="title " style="margin-top: 10px;margin-left: 10px">
        <button class="btn btn-blue" @click="addHoverDom()">增加</button>
        <button class="btn btn-green" @click="editDom()">编辑</button>
        <button class="btn btn-danger" @click="removeHoverDom()">删除</button>
        <span id="event-monitor-operation" class="operation close icon-font"></span>
      </div>
      <ul id="treeDemo" class="ztree"></ul>
    </div>
  </div>
</template>

<script>
  import MENU from '@/mock/menu'
  import {mapGetters,mapState} from 'vuex'
  import SidebarItem from './sidebarItem'
  import logo from './logo'
  import website from '@/const/website'
  import { resolveUrlPath, setUrlPath } from '@/util/util'
  export default {
    name: 'sidebar',
    components: {SidebarItem, logo},
    data() {
      return {
        website: website,
        onCheckTreeMenu:""


      }
    },
    created() {

    },
    computed: {
      ...mapGetters(['menu', 'tag', 'isCollapse']),
      ...mapState({
        userInfo: state => state.user.userInfo,
      }),
      nowTagValue: function () {
        return setUrlPath(this.$route)
      }
    },
    mounted() {
      this.$store.dispatch('GetMenu');

      var self = this;
      console.log(self.userInfo.menu,"0000")
      setTimeout(function () {
        var setting = {
          view: {
            addDiyDom: null,
            // addHoverDom: addHoverDom,
            // removeHoverDom: removeHoverDom,
            selectedMulti: false
          },
          check: {
            enable: false
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          edit: {
            enable: true,
            editNameSelectAll: true,
            showRemoveBtn: false,
            showRenameBtn: false,
            drag: {
              prev: true,
              inner: true,
              next: true,
              isMove: true,
              isCopy: true
            },
          },
          callback: {
            beforeEditName: function (treeId, treeNode) {

            },
            beforeRename: function zTreeBeforeRename(treeId, treeNode, newName, isCancel) {


            },
            beforeRemove: function zTreeBeforeRename(treeId, treeNode, newName, isCancel) {


            },
            onRename: function zTreeOnRename(event, treeId, treeNode, isCancel) {

            },
            onMouseUp: self.zTreeOnClick,//选中事件
            onClick: function (e, treeId, treeNode) {


            }
          }

        }
        $.fn.zTree.init($("#treeDemo"), setting, self.userInfo.menu);
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        treeObj.expandAll(true);

      }, 1)

    },
    methods: {
      zTreeOnClick(event, treeId, treeNode) {

        console.log(treeNode.tId,"选中")
        var self=this;
        self.website.panels.checkTreeNode=treeNode;
        if ($("#" + treeNode.tId + "_ico").hasClass("ico_docu")) {//如果选择的是数据源
          var receiveMenuSelect=treeNode.tId;
          self.website.panels.receiveNode=treeNode;
          localStorage.setItem("receiveNode",JSON.stringify(treeNode));
          localStorage.setItem("receiveMenuSelect",receiveMenuSelect);
          self.$router.push({
            path:  resolveUrlPath('/dev/index', treeNode.name),
            query: {
              sku: '/dev/index?name='+treeNode.name,
            }
          });

        }
      },
      removeHoverDom(treeId, treeNode) {//删除节点方法
        var self = this;
        treeNode = this.website.panels.checkTreeNode;
        console.log(treeNode,"move")
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = treeObj.getSelectedNodes();
        if (treeNode) {
          if (nodes[0].id == "jcf") {
            self.$message.error("根目录不可删除");

          } else {
            if (nodes[0].children == undefined) {
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                var var_data = {id: nodes[0].id, iconSkin: nodes[0].iconSkin};
                $.ajax({
                  type: "post",
                  url: self.website.panels.urls + "/org/del",
                  data: var_data,
                  dataType: "json",
                  success: function (mess) {
                    if (mess.result == "success") {
                      self.website.panels.checkTreeNode = "";
                      self.$message({
                        type: 'success',
                        message: "删除成功!"
                      });

                    } else {
                      self.$message.error("网络异常，请稍后再试");
                    }
                  }
                });
                for (var i = 0, l = nodes.length; i < l; i++) {
                  treeObj.removeNode(nodes[i]);
                }
                ;
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            }else{
              self.$message.error("当前目录下有子目录，禁止删除!");
            }
          }
        } else {
          self.$message({
            type: 'info',
            message: '请先选择删除的目录'
          });
        }
      },
      editDom(treeId, treeNode) {//修改节点方法
        var self = this;

        treeNode = this.website.panels.checkTreeNode;
        console.log(treeNode,"edit")
        if (treeNode) {
          //页面提示层
          var zTree = $.fn.zTree.getZTreeObj("treeDemo");
          self.$prompt('修改结构名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({value}) => {
            console.log(value)
            var var_data = {id: treeNode.id, name: value};

            $.ajax({
              type: "post",
              url: self.website.panels.urls + "/org/edit",
              data: var_data,
              dataType:"json",
              success: function (mess) {
                console.log(mess)
                if (mess.result == "success") {
                  self.$message({
                    type: 'success',
                    message: "编辑成功"

                  });

                } else {
                  self.$message.error("网络异常，请稍后再试");
                  return false;
                }
              }
            });
            treeNode.name = value;
            zTree.updateNode(treeNode);
          }).catch(() => {
            self.$message({
              type: 'info',
              message: '取消输入'
            });
          });

          setTimeout(function () {
            $(".el-input__inner").val(treeNode.name)
          }, 10)

        } else {
          self.$message({
            type: 'info',
            message: '请先选择编辑的目录'
          });

        }
      },
      addHoverDom(treeId, treeNode) {//新增节点
        var self = this;
        treeNode = self.website.panels.checkTreeNode;
        var id ;
        // 获取新节点的ID
        $.ajax({
          type: "post",
          url: self.website.panels.urls + "/org/orgId",
          data: "",
          dataType:"json",
          async: false,
          success: function (mess) {
            if (mess.result == "success") {
              id = mess.id;
            } else {
              self.$message.error("网络异常，请稍后再试");
            }
          }
        });

        if (treeNode != "") {
          var sObj = $("#" + treeNode.tId + "_span");
          //页面提示层
          if ($("#" + treeNode.tId + "_ico").hasClass("ico_docu")) {
            self.$message({
              type: 'info',
              message: '数据源下不可添加'
            });

          } else {
            layer.tab({
              area: ['400px', '200px'],
              tab: [{
                title: '目录',
                content: '<input class="layui-layer-input-ps ps-1" type="text"/>'
              }, {
                title: '数据源',
                content: '<input class="layui-layer-input-ps ps-2" type="text"/>'
              }],
              btn: ["保存", "取消"],
              yes: function (value, index, elem) {
                var var_data;

                if ($("#" + treeNode.tId + "_ico").hasClass("ico_docu")) {
                  layer.msg("数据源下不可添加，请选择目录层");
                } else {
                  if ($(".ps-1").val() != "") {
                    if ($(".layui-layer-tabnow").html() == "目录") {
                      // alert("目录")
                      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                      zTree.addNodes(treeNode, {
                        id:id,
                        name: $(".ps-1").val(),
                        iconSkin: "ico_close "
                      });
                      var_data = {
                        id:id,
                        pId: treeNode.id,
                        name: $(".ps-1").val(),
                        iconSkin: "ico_close ",
                        open: false,
                        checked: false
                      };
                    }
                    ;
                    layer.close(value);
                    $.ajax({
                      type: "post",
                      url: self.website.panels.urls + "/org/add",
                      data: var_data,
                      dataType:"json",
                      success: function (mess) {
                        if (mess.result == "success") {
                          self.$message({
                            type: 'success',
                            message:"新增成功"
                          });
                        } else {
                          self.$message.error("网络异常，请稍后再试");
                        }
                      }
                    });
                  }
                  ;
                  if ($(".ps-2").val() != "") {
                    if ($(".layui-layer-tabnow").html() == "数据源") {
                      // alert("数据源")
                      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                      zTree.addNodes(treeNode, {
                        id:id,
                        name: $(".ps-2").val(),
                        iconSkin: "ico_docu "
                      });
                      var_data = {
                        id:id,
                        pId: treeNode.id,
                        name: $(".ps-2").val(),
                        iconSkin: "ico_docu ",
                        open: false,
                        checked: false
                      };
                      $.ajax({
                        type: "post",
                        url:self.website.panels.urls + "/org/add",
                        data: var_data,
                        dataType:"json",
                        success: function (mess) {
                          if (mess.result == "success") {
                            self.$message({
                              type: 'success',
                              message: "新增成功"
                            });
                          } else {
                            self.$message.error("网络异常，请稍后再试");
                          }
                        }
                      });
                    }
                    ;
                    layer.close(value);
                  }
                  console.log(var_data);


                }
              }
            });
          }

        } else {
          self.$message({
            type: 'info',
            message: '请先选择增加的目录'
          });

        }

      }
    }
  }
</script>

<style src="../../../assets/css/bootstrapStyle.css"></style>
<style>
  .layui-layer-input-ps {
    display: block;
    width: 230px;
    height: 36px;
    margin: 0 auto;
    line-height: 30px;
    padding-left: 10px;
    border: 1px solid #e6e6e6;
    color: #333;
    margin-top: 40px;
  }
</style>

