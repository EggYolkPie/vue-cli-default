import website from '@/const/website';
import {
  DIC
} from '@/const/dic'

function divData(data) {
  var self = this;
  var data;
  $.ajax({
    type: 'post',
    url: website.panels.urls + '/role/list',
    data: {},
    async: false,
    dataType: 'json',
    success: function (res) {
      data = {GRADE: res.data};
    },
    error: function (res) {

    }
  });
  return data;
}

export const role = divData()
export const userOption = {
  border: true,
  index: true,
  height: 'auto',
  indexLabel: '序号',
  selection: false,
  dicData: role,
  editBtn: false,
  delBtn: false,
  addBtn: false,
  dic: ['GRADE', 'STATE'],
  formWidth: '60%',
  column: [{
    label: "用户名",
    prop: "name",
    width: "150",
    rules: [{
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    }]
  },
    {
      label: "角色",
      prop: "roleName",
      type: "radio",
      dicData: 'GRADE',
      valueDefault: role.GRADE[1].value,
    },
    /*{
        label: "创建时间",
        prop: "date",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
    },*/
    {
      label: "内容",
      prop: "ueditor",
      type: "ueditor",
      formHeight: 'auto',
      hide: true,
      span: 24,
    },
    {
      label: "状态",
      prop: "state",
      solt: true,
      type: "radio",
      dicData: DIC.STATE,  // 'STATE'
      valueDefault: 1,
    }
  ]
};
export const roleOption = {
  border: true,
  index: true,
  selection: false,
  calcHeight: 320,
  menuAlign: 'center',
  menuWidth: 300,
  column: [{
    label: "角色名称",
    prop: "name",
    width: "150",
    rules: [{
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    }]
  },
    {
      label: "创建时间",
      prop: "date",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      type: "date",
    }
  ]
};
