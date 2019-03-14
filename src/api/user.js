import request from '@/router/axios'
import { userInfo, tableData } from '@/mock/user'
import { menu, menuAll } from '@/mock/menu'
import { baseUrl } from '@/config/env'
import website from '@/const/website'
import {Notification, Message} from 'element-ui';
import {getToken, setToken, removeToken} from '@/util/auth'
export const loginByUsername = (username, password, code, redomStr) => {
  return new Promise((resolve, reject) => {
    var self=this;
    resolve({ data: new Date().getTime() });
    localStorage.setItem('user',username)
    localStorage.setItem('status',mess.user.state == '1' ? '有效' : '失效')
    // $.ajax({
    //   type: 'post',
    //   url: website.panels.urls + '/user/login',
    //   data: {loginName:username,password:password},
    //   dataType:'json',
    //   success: function (mess) {
    //     if(mess.result=="success"){
    //
    //     }else{
    //       Message({
    //         type: 'error',
    //         message: '账号或密码错误'
    //       });
    //     }
    //
    //   },
    //   error:function (mess) {
    //     Message({
    //       type: 'error',
    //       message: '登录失败'
    //     });
    //   }
    // });

  })
}

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        resolve({ data: userInfo });
    })
}
export const RefeshToken = () => {
    return new Promise((resolve, reject) => {
        resolve({ data: new Date().getTime() });
    })
}

export const getMenu = (parentId) => {
    return new Promise((resolve, reject) => {
        if (parentId != 1) parentId = 0;
        resolve({ data: menu[parentId] });
    })
}
export const getMenuAll = () => {
    return new Promise((resolve, reject) => {
        resolve({ data: menu[0] });
    })
}

export const getTableData = (page) => {
    return new Promise((resolve, reject) => {
        resolve({ data: tableData });
    })
}
export const logout = () => {
    return new Promise((resolve, reject) => {
        resolve();
    })
}
