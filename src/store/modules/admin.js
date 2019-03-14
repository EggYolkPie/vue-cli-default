import { getUserData, getRoleData } from '@/api/admin'
import website from '@/const/website';
const user = {
    state: {

    },
    actions: {
        GetUserData({ commit, state, dispatch }, page) {
            /*return new Promise((resolve, reject) => {
                getUserData(page).then(res => {
                    const data = res.data;
                    resolve(data);
                })
            })*/
          return new Promise((resolve, reject) => {
            var self=this;
            $.ajax({
              type: 'post',
              url: website.panels.urls + '/user/list',
              data: {},
              dataType:'json',
              success: function (res) {
                if(res.result=="success"){
                  console.log(res.data,"users")
                  const data = res.data;
                  resolve(data);
                }else{
                  Message({
                    type: 'error',
                    message: ''
                  });
                }
              },
              error:function (res) {

              }
            });
          })
        },
        GetRoleData({ commit, state, dispatch }, page) {
            return new Promise((resolve, reject) => {
                getRoleData(page).then(res => {
                    const data = res.data;
                    resolve(data);
                })
            })
        },

    },
    mutations: {

    }

}
export default user
