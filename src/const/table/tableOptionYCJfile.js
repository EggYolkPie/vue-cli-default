import {
  DIC
} from '@/const/dic'

export default {
  maxHeight: 400,
  index: true,
  border: true,
  expand: false,
  stripe: false,
  selection: false,
  menuWidth: 300,
  menuAlign: 'center',
  editBtn: false,
  addBtn:false,
  delBtn:false,
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
    label: "文件列表",
    prop: "fileName",
    sortable: true,
      type:"text",
    addDisabled: false,
    search: false,
    formsolt: false,
      formatter: (row, result) => {
        var span;
        if(row.isExsit=="true") {
          span = '<span style="color: red">' + result + '<i class="el-icon-success" style="color: #67C23A"></i></span>'
        }else{
          span=result;
        }
        return span;
      }
  }
  ]
};
