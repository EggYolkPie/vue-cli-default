import website from '@/const/website'
import jq from '../panel/jquery.min.js'
var self=this;

export const DIC = {
    VAILD: [{
        label: '真',
        value: true,
        color: 'green'
    }, {
        label: '假',
        value: false,
        color: 'red'
    }],
    SEX: [{
        label: '男',
        value: 0,
        color: 'green'
    }, {
        label: '女',
        value: 1,
        color: 'red'
    }],
    POSTIONDATA: [{
        label: '左对齐',
        value: 'left'
    }, {
        label: '居中',
        value: 'center'
    }, {
        label: '右对齐',
        value: 'right'
    }],
  TIME: [{
    label: 'yyyy-mm-dd',
    value: 'yyyy-mm-dd'
  }, {
    label: 'yyyymmdd',
    value: 'yyyymmdd'
  }, {
    label: 'yymmdd',
    value: 'yymmdd'
  },{
    label: 'yyyy/mm/dd',
    value: 'yyyy/mm/dd'
  },{
    label: 'yyyymmddhh',
    value: 'yyyymmddhh'
  },{
    label: 'yyyymmddhhmi',
    value: 'yyyymmddhhmi'
  }],
  FILETIME: [{
    label: 'yyyymmdd',
    value: 'yyyymmdd'
  }, {
    label: 'yymmdd',
    value: 'yymmdd'
  },{
    label: 'yyyymmddhh',
    value: 'yyyymmddhh'
  },{
    label: 'yyyymmddhhmi',
    value: 'yyyymmddhhmi'
  }],
    TYPE: [{
            label: '一级1',
            value: 0,
            children: [{
                label: '一级1二级1',
                value: 2,
            }]
        }, {
            label: '一级2',
            value: 1,
            children: [{
                label: '一级2二级1',
                value: 2,
            }]
        }

    ],
    STATE: [{
        label: '有效',
        value: 1
    }, {
        label: '无效',
        value: 0
    }],
    GRADE: [
      {
            label: "mysql",
            value: "mysql",
        },
        {
            label: "oracle",
            value: "oracle",
        },
        {
            label: "db2",
            value: "db2",
        },
        {
            label: "sqlserver",
            value: "sqlserver",
        },
        {
            label: "dameng",
            value: "dameng",
        },
        {
            label: "sybase",
            value:  "sybase",
        },
    ],
  receiveFILE:"",
  receiveDB:"",
  GRADERECEIVE: [
    {
      label: "mysql",
      value: "mysql"
    },
    {
      label: "oracle",
      value: "oracle"
    }
  ],
  DBHOME: [
    {
      label: "mysql",
      value: 0
    },
    {
      label: "oracle",
      value: 1
    },
    {
      label: "db2",
      value: 2
    },
    {
      label: "sqlserver",
      value: 3
    },
    {
      label: "dameng",
      value: 4
    },
    {
      label: "sybase",
      value: 5
    },
  ],
    VAILDATA: [{
            label: "是",
            value: true,
            color: 'green'
        },
        {
            label: "否",
            value: false,
            color: 'red',
        }
    ],
  FILEDATA: [{
    label: "是",
    value: true,
    color: 'green'
  },
    {
      label: "否",
      value: false,
      color: 'red',
    }
  ],
  DBVAILDATA: [{
    label: "是",
    value: true,
    color: 'green'
  },
    {
      label: "否",
      value: false,
      color: 'red',
    }
  ],
    CRUDTYPE: [{
            label: "选择框",
            value: 'select'
        },
        {
            label: "文本框",
            value: 'text'
        },
        {
            label: "多行文本框",
            value: 'textarea'
        },
        {
            label: "单选框",
            value: 'radio'
        },
        {
            label: "多选框",
            value: 'checkbox'
        },
        {
            label: "日期框",
            value: 'date'
        }
    ],
    DATALIST: [{
        label: 'SEX',
        value: 'SEX',
    }, {
        label: 'STATE',
        value: 'STATE',
    }, {
        label: 'GRADE',
        value: 'GRADE',
    }]
}

