import {
  DIC
} from '@/const/dic'

export default {
  maxHeight: 400,
  index: true,
  border: true,
  expand: true,
  stripe: true,
  selection: false,
  menuWidth: 300,
  menuAlign: 'center',
  editBtn: false,
  addBtn:false,
  align: 'center',
  labelWidth: 150,
  searchSize: 'small',
  // defaultSort: {
  //   prop: 'name',
  //   order: 'descending'
  // },
  dic: ['VAILDATA', 'SEX', 'TYPE'],
  dicData: DIC,
  column: [
    {
    label: "存储位置名称",
    prop: "dbSourceName",
    sortable: true,
    addDisabled: false,
    search: true,
    formsolt: false,
    rules: [{
      required: true,
      message: "请输入存储位置名称",
      trigger: "blur"
    }]

  },
    {
      label: "IP",
      prop: "hostName",
      sortable: true,
      addDisabled: false,
      search: true,
      formsolt: false,
      rules: [{
        required: true,
        message: "请输入IP",
        trigger: "blur"
      }]
    },
    {
      label: "端口",
      prop: "serverPort",
      sortable: true,
      addDisabled: false,
      search: true,
      formsolt: false,
      rules: [{
        required: true,
        message: "请输入端口",
        trigger: "blur"
      }]
    },
    {
      label: "用户名",
      prop: "userName",
      sortable: true,
      addDisabled: false,
      search: true,
      formsolt: false,
      rules: [{
        required: true,
        message: "请输入用户名",
        trigger: "blur"
      }]
    },
    {
      label: "密码",
      prop: "passwd",
      sortable: true,
      addDisabled: false,
      search: true,
      formsolt: false,
      rules: [{
        required: true,
        message: "请输入密码",
        trigger: "blur"
      }]
    },
    {
      label: "接口类型",
      prop: "interfaceType",
      sortable: true,
      addDisabled: false,
      search: true,
      formsolt: false,
      editDisabled: true
    },
    {
      label: "存储路径",
      prop: "localPath",
      sortable: true,
      addDisabled: false,
      search: true,
      formsolt: false,
      editDisabled: false,
      rules: [{
        required: true,
        message: "请输入存储路径",
        trigger: "blur"
      }]

    },
    {
      label: "数据库名称",
      prop: "instance",
      sortable: true,
      addDisabled: false,
      search: true,
      formsolt: false,
      editDisabled: false,
      rules: [{
        required: true,
        message: "请输入数据库名称",
        trigger: "blur"
      }]
    },
    {
      label: "数据库类型",
      prop: "db",
      type:"select",
      sortable: true,
      addDisabled: false,
      editDisabled: false,
      search: true,
      dicData: 'GRADERECEIVE',
      formsolt: false,
      hide: true,
      rules: [{
        required: true,
        message: "请输入数据库类型",
        trigger: "blur"
      }]
    }
  ]
};
