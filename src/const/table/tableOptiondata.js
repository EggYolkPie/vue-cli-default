import {
    DIC
} from '@/const/dic'
export default {
    maxHeight: 400,
    index: true,
    border: true,
    expand: true,
    stripe: false,
    selection: true,
    menuWidth: 300,
    menuAlign: 'center',
    editBtn: false,
    align: 'center',
    searchSize: 'small',
    // defaultSort: {
    //   prop: 'name',
    //   order: 'descending'
    // },
    dicData: DIC,
    column: [
      {
            label: "用户名",
            prop: "username",
            width: 120,
            sortable: true,
            search: true,
            solt: true,
            showCloumn: false,
            placeholder: '自定义输入placeholder',
            rules: [{
                required: true,
                message: "请输入用户名",
                trigger: "blur"
            }]
        },
        {
            label: "姓名",
            prop: "name",
            sortable: true,
            addDisabled: false,
            formsolt: true,
        },
        {
            label: "选择",
            prop: "select",
            type: 'select',
            valueDefault: true,
            hide: true,
            dicData: 'VAILD',
        },
        {
            label: "数字",
            prop: "number",
            sortable: true,
            valueDefault: 3,
            addVisdiplay: false,
            editDisabled: true,
            type: 'number',
            hide: true,
        },
        {
            label: "类型",
            prop: "type",
            type: "cascader",
            dicData: 'TYPE',
            hide: true,
        },
        {
            label: "时间",
            prop: "time",
            type: "time",
            hide: true,
        },
        {
            label: "开关",
            prop: "switch",
            type: "switch",
            dicData: 'TYPE',
            hide: true,
        },
        {
            width: 100,
            label: "select多选",
            prop: "moreselect",
            type: "select",
            multiple: true,
            dicData: 'SEX',
        },
        {
            label: "日期时间",
            prop: "datetime",
            type: "datetime",
            hide: true,
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            format: 'yyyy-MM-dd hh:mm:ss',
        },
        {
            label: "权限",
            prop: "grade",
            type: "radio",
            dicData: 'VAILDATA',
            search: true,
            valueDefault: true,
            formatter: (row, result) => {
                return result;
            }
        },
        {
            label: "密码",
            prop: "password",
            type: "password",
            hide: true
        },
        {
            width: 100,
            label: "多选",
            prop: "checkbox",
            type: "checkbox",
            valueDefault: [0],
            dicData: 'SEX',
            hide: true,
        },
        {
            label: "地址",
            prop: "address",
            width: "300",
            sortable: true,
            type: 'textarea',
            maxRow: 4,
            minRow: 4,
            span: 24,
            disabled: true,
            addDisabled: true,
            overHidden: true
        },
    ]
};
