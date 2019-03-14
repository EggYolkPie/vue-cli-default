import {getToken, setToken, removeToken} from '@/util/auth'
import {setStore, getStore, removeStore} from '@/util/store'
import {validatenull} from '@/util/validate'
import {encryption} from '@/util/util'
import {loginByUsername, getUserInfo, getTableData, getMenu, logout, getMenuAll, RefeshToken} from '@/api/user'

const user = {
  state: {
    userInfo: {},
    permission: {},
    roles: [],
    menu: [],
    menuAll: [],
    token: getStore({name: 'token'}) || '',
    attrListX: [],
    attrListY: [],
    echartscoulms: [],
    chartsdash:true,
    echartsrows: [
      // { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 32 },
      //   { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 26 },
      //   { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 76 },
      //   { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 49 },
      //   { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 323 },
      //   { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 78 }
    ],

  },
  actions: {
    //根据用户名登录
    LoginByUsername({commit, state, dispatch}, userInfo) {
      const user = encryption({
        data: userInfo,
        type: 'Aes',
        key: 'avue',
        param: ['useranme', 'password']
      });
      return new Promise((resolve, reject) => {
        loginByUsername(user.username, user.password, userInfo.code, userInfo.redomStr).then(res => {
          const data = res.data;
          commit('SET_TOKEN', data);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          setToken(data);
          resolve();
        })
      })
    },
    //根据手机号登录
    LoginByPhone({commit, state, dispatch}, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.phone, userInfo.code).then(res => {
          const data = res.data;
          commit('SET_TOKEN', data);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          setToken(data);
          resolve();
        })
      })
    },
    GetTableData({commit, state, dispatch}, page) {
      return new Promise((resolve, reject) => {
        getTableData(page).then(res => {
          const data = res.data;
          resolve(data);
        })
      })
    },
    setEchartsRows({commit, state, dispatch}) {//设置图表数值
      var edate = ['1/1', '1/2', '1/3', '1/4', '1/5', '1/6'];
      var eusers = [1393, 3530, 2923, 1723, 3792, 4593];
      var eorders = [1093, 3230, 2623, 1423, 3492, 4293];
      var epercent = [132, 126, 176, 149, 323, 178];
      state.echartsrows = [
        {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 32},
        {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 26},
        {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 76},
        {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 49},
        {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 323},
        {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 78}
      ]

    },
    GetUserInfo({commit, state, dispatch}) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          const data = res.data;
          commit('SET_USERIFNO', data.userInfo);
          commit('SET_ROLES', data.roles);
          commit('SET_PERMISSION', data.permission)
          resolve(data);
        })
      })
    },
    //刷新token
    RefeshToken({commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', data);
          setToken(data);
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //注销session
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('DEL_ALL_TAG');
        commit('CLEAR_LOCK');
        removeToken()
        resolve()
      })
    },
    //获取系统菜单
    GetMenu({commit}, parentId) {
      parentId
      return new Promise(resolve => {
        getMenu(parentId).then((res) => {
          const data = res.data;
          commit('SET_MENU', data);
          resolve(data);
        })
      })
    },
    //获取全部菜单
    GetMenuAll({commit}) {
      return new Promise(resolve => {
        getMenuAll().then((res) => {
          const data = res.data;
          commit('SET_MENU_ALL', data);
          resolve(data);
        })
      })
    },

  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      setStore({name: 'token', content: state.token, type: 'session'})
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_MENU: (state, menu) => {
      const list = menu.filter(ele => {
        if (validatenull(ele.meta)) return true;
        if (validatenull(ele.meta.roles)) return true;
        if (ele.meta.roles.indexOf(state.roles[0]) != -1) {
          return true;
        } else {
          return false;
        }
      });
      state.menu = list;
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = {};
      permission.forEach(ele => {
        state.permission[ele] = true;
      });
    }
  }

}
export default user
