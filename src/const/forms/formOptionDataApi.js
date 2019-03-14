import {
  DIC
} from '@/const/dic'
import website from '@/const/website'
export default {
  dicData: DIC,
  submitText: '完成',
  labelWidth: 150,
  column: [
    {
      label: "数据源名称",
      prop: "dbSourceName",

      rules: [{
        required: true,
        message: "请输入数据源名称",
        trigger: "blur"
      }],
    },
    // {
    //   label: "姓名",
    //   prop: "dbSourceName2",
    //   disabled: true,
    //   formsolt: true,
    // },
    {
      label: "数据源IP",
      prop: "hostName",
      rules: [{
        required: true,
        message: "请输入数据源IP",
        trigger: "blur"
      }],
    },
    {
      label: "数据源端口",
      prop: "serverPort",
      rules: [{
        required: true,
        message: "请输入数据源端口",
        trigger: "blur"
      }],
    },
    {
      label: "数据源用户名",
      prop: "userName",
      rules: [{
        required: true,
        message: "请输入数据源用户名",
        trigger: "blur"
      }],
    },
    {
      label: "数据源密码",
      prop: "passwd",
      rules: [{
        required: true,
        message: "请输入数据源密码",
        trigger: "blur"
      }],
    }
  ]
};

