import {
  DIC
} from '@/const/dic'

export default {
  dicData: DIC,
  submitText: '完成',
  column: [
    {
      label: "名称",
      prop: "dbSourceName",
      rules: [{
        required: true,
        message: "请输入数据源名称",
        trigger: "blur"
      }],
    },
    {
      label: "IP",
      prop: "hostName",
      rules: [{
        required: true,
        message: "请输入数据源IP",
        trigger: "blur"
      }],
    },
    {
      label: "端口",
      prop: "serverPort",
      rules: [{
        required: true,
        message: "请输入数据源端口",
        trigger: "blur"
      }],
    },
    {
      label: "用户名",
      prop: "userName",
      rules: [{
        required: true,
        message: "请输入数据源用户名",
        trigger: "blur"
      }],
    },
    {
      label: "密码",
      prop: "passwd",
      rules: [{
        required: true,
        message: "请输入数据源密码",
        trigger: "blur"
      }],
    },
    {
      label: "数据库",
      prop: "instance",
      rules: [{
        required: true,
        message: "请输入数据库名称",
        trigger: "blur"
      }],
    },
    {
      label: "类型",
      prop: "type",
      type: "select",
      dicData: 'GRADE',
      rules: [{
        required: true,
        message: "请选择数据库类型",
        trigger: "blur"
      }]
    },
    {
      label: "存储位置",
      prop: "type",
      type: "select",
      dicData: 'DBHOME',
      rules: [{
        required: true,
        message: "请选择存储位置(数据库)",
        trigger: "blur"
      }]
    }
  ]
};
